// import {getModel} from "../config/llmmodels.js"
// export const pdfAgent = async (params) =>{
//     try {
//        const llm = await getModel("pdf")

//        const prompt = `
//         You are an expert PDF content generation agent.

// Your job is to create professional, well-structured content that will
// later be converted into a PDF document.

// Requirements:
// - Understand the user's request carefully.
// - Create a professional document structure.
// - Use clear headings and subheadings.
// - Keep the content logically organized.
// - Use Markdown formatting where appropriate.
// - Do not include unnecessary explanations outside the document.
// - Do not generate HTML.
// - Do not generate JavaScript or programming code unless the user explicitly asks for it.
// - Make the document suitable for printing and PDF export.

// Return ONLY valid JSON in this exact structure:

// {
//   "title": "Document title",
//   "subtitle": "Optional subtitle",
//   "sections": [
//     {
//       "heading": "Section heading",
//       "content": "Section content"
//     }
//   ]
// }

// Generate 4-8 sections.

// Each section should have 3-6 concise bullet points.

// Topic:

// ${state.prompt}
// `

// const res = await llm.invoke(prompt)
// console.log(JSON.parse(res.content))

//     } catch (error) {
//         console.log(error)
//     }
// }




import { getModel } from "../config/llmmodels.js";
import { generatePdf } from "../utils/generatePdf.js";
import { uploadToS3 } from "../utils/uploadToS3.js";
import { getFromS3 } from "../utils/getFromS3.js";

const VALID_BLOCK_TYPES = ["heading", "paragraph", "bullets", "numbered"];


const buildPrompt = (topic) => `
You are an expert document-writing agent that produces clean, professional
documents — the way a well-written report or memo reads, not a slide deck.

Rules:
- Use short paragraphs to explain and give context.
- Use "bullets" or "numbered" blocks only where a list genuinely helps
  (enumerations, steps, comparisons) — do not force everything into bullets.
- 3-6 headings total. Each heading is followed by 1-3 content blocks.
- Keep each paragraph to 2-4 sentences.
- Keep each list item to one concise line.
- Do not generate HTML, markdown syntax (**, #, etc.), or code unless the
  topic explicitly asks for code.
- The whole document should read naturally as roughly 1-2 printed pages —
  do not pad it with filler sections just to add length.

Return ONLY valid JSON, no markdown fences, no commentary, in this exact shape:

{
  "title": "Document title",
  "subtitle": "Optional one-line subtitle",
  "blocks": [
    { "type": "heading", "text": "Section heading" },
    { "type": "paragraph", "text": "A short paragraph of prose." },
    { "type": "bullets", "items": ["Point one", "Point two"] },
    { "type": "numbered", "items": ["Step one", "Step two"] }
  ]
}

Topic:
${topic}
`;

// ============================================================
// PARSE + VALIDATE LLM OUTPUT
// ============================================================

const stripFences = (raw) =>
  raw
    .toString()
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

const validatePdfData = (parsed) => {
  if (!parsed || typeof parsed !== "object") {
    throw new Error("PDF data is not an object");
  }
  if (!Array.isArray(parsed.blocks) || parsed.blocks.length === 0) {
    throw new Error("PDF data has no blocks");
  }

  const cleanBlocks = parsed.blocks.filter((b) => {
    if (!b || !VALID_BLOCK_TYPES.includes(b.type)) return false;
    if (b.type === "bullets" || b.type === "numbered") {
      return Array.isArray(b.items) && b.items.length > 0;
    }
    return typeof b.text === "string" && b.text.trim().length > 0;
  });

  if (cleanBlocks.length === 0) {
    throw new Error("PDF data has no valid blocks after cleaning");
  }

  return {
    title: (parsed.title || "Untitled Document").toString().trim(),
    subtitle: parsed.subtitle ? parsed.subtitle.toString().trim() : "",
    blocks: cleanBlocks,
  };
};

const generatePdfData = async (llm, topic, attempt = 1) => {
  const res = await llm.invoke(buildPrompt(topic));
  const raw = stripFences(res?.content ?? res?.text ?? "");

  if (!raw) throw new Error("PDF agent received empty response from LLM");

  try {
    return validatePdfData(JSON.parse(raw));
  } catch (err) {
    if (attempt >= 2) {
      throw new Error(`PDF content generation failed: ${err.message}`);
    }
    console.warn(
      `[pdfAgent] Malformed JSON on attempt ${attempt}, retrying:`,
      err.message,
    );
    return generatePdfData(llm, topic, attempt + 1);
  }
};

// ============================================================
// AGENT
// ============================================================

export const pdfAgent = async (params) => {
  try {
    const llm = await getModel("pdf");

    const pdfData = await generatePdfData(llm, params.prompt);
    console.log("[pdfAgent] PDF data generated:", pdfData.title);

    const pdfBuffer = await generatePdf(pdfData);
    if (!pdfBuffer || pdfBuffer.length === 0) {
      throw new Error("PDF agent generated an empty PDF buffer");
    }
    console.log(`[pdfAgent] PDF generated: ${pdfBuffer.length} bytes`);

    const safeTitle = (pdfData.title || "vortexai-document")
      .replace(/[^a-zA-Z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase();
    const filename = `${safeTitle}-${Date.now()}.pdf`;

    await uploadToS3(filename, pdfBuffer, "application/pdf");
    console.log("[pdfAgent] PDF uploaded to S3:", filename);

    const EXPIRY_SECONDS = 24 * 60;
    const downloadUrl = await getFromS3(filename, EXPIRY_SECONDS);
    if (!downloadUrl) throw new Error("PDF agent failed to get S3 URL");

    return {
      ...params,
      agent: "pdf",
      artifacts: [], // PDF is delivered as a link, not an artifact
      images: [],
      aiResponse: `## PDF Generated\n\n**${pdfData.title}**\n\n[📄 Open / Download PDF](${downloadUrl})`,
      pdfData,
      pdfUrl: downloadUrl,
      pdfFilename: filename,
    };
  } catch (error) {
    console.error("[pdfAgent] Error:", error);

    return {
      ...params,
      agent: "pdf",
      aiResponse: "Failed to generate PDF. Please try again.",
      artifacts: [],
      images: [],
      pdfData: null,
      pdfUrl: null,
      pdfFilename: null,
      error: error.message,
    };
  }
};
