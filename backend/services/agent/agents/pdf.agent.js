// import { getModel } from "../config/llmmodels.js";
// import { generatePdf } from "../utils/generatePdf.js";
// import { uploadToS3 } from "../utils/uploadToS3.js";
// import { getFromS3 } from "../utils/getFromS3.js";

// const VALID_BLOCK_TYPES = ["heading", "paragraph", "bullets", "numbered"];


// const buildPrompt = (topic) => `
// You are an expert document-writing agent that produces clean, professional
// documents — the way a well-written report or memo reads, not a slide deck.

// Rules:
// - Use short paragraphs to explain and give context.
// - Use "bullets" or "numbered" blocks only where a list genuinely helps
//   (enumerations, steps, comparisons) — do not force everything into bullets.
// - 3-6 headings total. Each heading is followed by 1-3 content blocks.
// - Keep each paragraph to 2-4 sentences.
// - Keep each list item to one concise line.
// - Do not generate HTML, markdown syntax (**, #, etc.), or code unless the
//   topic explicitly asks for code.
// - The whole document should read naturally as roughly 1-2 printed pages —
//   do not pad it with filler sections just to add length.

// Return ONLY valid JSON, no markdown fences, no commentary, in this exact shape:

// {
//   "title": "Document title",
//   "subtitle": "Optional one-line subtitle",
//   "blocks": [
//     { "type": "heading", "text": "Section heading" },
//     { "type": "paragraph", "text": "A short paragraph of prose." },
//     { "type": "bullets", "items": ["Point one", "Point two"] },
//     { "type": "numbered", "items": ["Step one", "Step two"] }
//   ]
// }

// Topic:
// ${topic}
// `;

// // ============================================================
// // PARSE + VALIDATE LLM OUTPUT
// // ============================================================

// const stripFences = (raw) =>
//   raw
//     .toString()
//     .trim()
//     .replace(/^```json\s*/i, "")
//     .replace(/^```\s*/i, "")
//     .replace(/\s*```$/i, "")
//     .trim();

// const validatePdfData = (parsed) => {
//   if (!parsed || typeof parsed !== "object") {
//     throw new Error("PDF data is not an object");
//   }
//   if (!Array.isArray(parsed.blocks) || parsed.blocks.length === 0) {
//     throw new Error("PDF data has no blocks");
//   }

//   const cleanBlocks = parsed.blocks.filter((b) => {
//     if (!b || !VALID_BLOCK_TYPES.includes(b.type)) return false;
//     if (b.type === "bullets" || b.type === "numbered") {
//       return Array.isArray(b.items) && b.items.length > 0;
//     }
//     return typeof b.text === "string" && b.text.trim().length > 0;
//   });

//   if (cleanBlocks.length === 0) {
//     throw new Error("PDF data has no valid blocks after cleaning");
//   }

//   return {
//     title: (parsed.title || "Untitled Document").toString().trim(),
//     subtitle: parsed.subtitle ? parsed.subtitle.toString().trim() : "",
//     blocks: cleanBlocks,
//   };
// };

// const generatePdfData = async (llm, topic, attempt = 1) => {
//   const res = await llm.invoke(buildPrompt(topic));
//   const raw = stripFences(res?.content ?? res?.text ?? "");

//   if (!raw) throw new Error("PDF agent received empty response from LLM");

//   try {
//     return validatePdfData(JSON.parse(raw));
//   } catch (err) {
//     if (attempt >= 2) {
//       throw new Error(`PDF content generation failed: ${err.message}`);
//     }
//     console.warn(
//       `[pdfAgent] Malformed JSON on attempt ${attempt}, retrying:`,
//       err.message,
//     );
//     return generatePdfData(llm, topic, attempt + 1);
//   }
// };

// // ============================================================
// // AGENT
// // ============================================================

// export const pdfAgent = async (params) => {
//   try {
//     const llm = await getModel("pdf");

//     const pdfData = await generatePdfData(llm, params.prompt);
//     console.log("[pdfAgent] PDF data generated:", pdfData.title);

//     const pdfBuffer = await generatePdf(pdfData);
//     if (!pdfBuffer || pdfBuffer.length === 0) {
//       throw new Error("PDF agent generated an empty PDF buffer");
//     }
//     console.log(`[pdfAgent] PDF generated: ${pdfBuffer.length} bytes`);

//     const safeTitle = (pdfData.title || "vortexai-document")
//       .replace(/[^a-zA-Z0-9\s-]/g, "")
//       .trim()
//       .replace(/\s+/g, "-")
//       .toLowerCase();
//     const filename = `${safeTitle}-${Date.now()}.pdf`;

//     await uploadToS3(filename, pdfBuffer, "application/pdf");
//     console.log("[pdfAgent] PDF uploaded to S3:", filename);

//     const EXPIRY_SECONDS = 24 * 60;
//     const downloadUrl = await getFromS3(filename, EXPIRY_SECONDS);
//     if (!downloadUrl) throw new Error("PDF agent failed to get S3 URL");

//     return {
//       ...params,
//       agent: "pdf",
//       artifacts: [], // PDF is delivered as a link, not an artifact
//       images: [],
//       aiResponse: `## PDF Generated\n\n**${pdfData.title}**\n\n[📄 Open / Download PDF](${downloadUrl})`,
//       pdfData,
//       pdfUrl: downloadUrl,
//       pdfFilename: filename,
//     };
//   } catch (error) {
//     console.error("[pdfAgent] Error:", error);

//     return {
//       ...params,
//       agent: "pdf",
//       aiResponse: "Failed to generate PDF. Please try again.",
//       artifacts: [],
//       images: [],
//       pdfData: null,
//       pdfUrl: null,
//       pdfFilename: null,
//       error: error.message,
//     };
//   }
// };



import { getModel } from "../config/llmmodels.js";
import { generatePdf } from "../utils/generatePdf.js";
import { uploadToS3 } from "../utils/uploadToS3.js";
import { getFromS3 } from "../utils/getFromS3.js";

const VALID_TYPES = ["heading", "paragraph", "bullets", "numbered"];
const MAX_PAGES = 12;
const WORDS_PER_PAGE = 300;

const detectPages = (topic) => {
  const t = topic.toLowerCase();

  const n = t.match(/\b(\d{1,2})\s*(?:printed\s*)?pages?\b/);
  if (n) return Math.min(Math.max(+n[1], 1), MAX_PAGES);

  const nums = {
    one: 1, two: 2, three: 3, four: 4,
    five: 5, six: 6, seven: 7, eight: 8,
    nine: 9, ten: 10, eleven: 11, twelve: 12,
  };

  const word = t.match(
    /\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\s*pages?\b/
  );

  if (word) return nums[word[1]];

  if (/\b(very detailed|extensive|exhaustive|full report|deep dive)\b/.test(t))
    return MAX_PAGES;

  if (/\b(detailed|in-depth|thorough|comprehensive|expand|longer)\b/.test(t))
    return 5;

  return 1;
};

const detectType = (topic) => {
  const t = topic.toLowerCase();

  if (/\broadmap|timeline|milestone|phase|quarter\b/.test(t))
    return "roadmap";

  if (/\bplan|strategy|action items?\b/.test(t))
    return "plan";

  if (/\bguide|how-to|tutorial|steps?|walkthrough\b/.test(t))
    return "guide";

  if (/\bbrief|executive summary|overview\b/.test(t))
    return "brief";

  if (/\breport|analysis|findings|research|study\b/.test(t))
    return "report";

  return "general";
};

const buildPrompt = (topic) => {
  const pages = detectPages(topic);
  const type = detectType(topic);
  const words = pages * WORDS_PER_PAGE;

  return `Create a ${type} about the topic below.

Length: ~${words} words, ${pages} page${pages > 1 ? "s" : ""}.
Use concise, specific, useful content. Avoid filler and repetition.
Use headings, paragraphs, bullets or numbered steps where appropriate.
Return ONLY valid JSON.

{
"title":"...",
"subtitle":"...",
"blocks":[
{"type":"heading","text":"..."},
{"type":"paragraph","text":"..."},
{"type":"bullets","items":["..."]},
{"type":"numbered","items":["..."]}
]}

Topic:
${topic}`;
};

const stripFences = (raw) =>
  raw
    .toString()
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

const validate = (data) => {
  if (!data || typeof data !== "object")
    throw new Error("Invalid PDF data");

  if (!Array.isArray(data.blocks) || !data.blocks.length)
    throw new Error("No PDF blocks");

  const blocks = data.blocks.filter((b) => {
    if (!b || !VALID_TYPES.includes(b.type)) return false;

    if (b.type === "bullets" || b.type === "numbered")
      return Array.isArray(b.items) && b.items.length;

    return typeof b.text === "string" && b.text.trim();
  });

  if (!blocks.length)
    throw new Error("No valid PDF blocks");

  return {
    title: String(data.title || "Untitled Document").trim(),
    subtitle: String(data.subtitle || "").trim(),
    blocks,
  };
};

const generatePdfData = async (llm, topic) => {
  const res = await llm.invoke(buildPrompt(topic));
  const raw = stripFences(res?.content ?? res?.text ?? "");

  if (!raw) throw new Error("Empty LLM response");

  try {
    return validate(JSON.parse(raw));
  } catch {
    // One short retry only if JSON is malformed.
    const retry = await llm.invoke(
      `Return ONLY valid JSON for this topic. Use the required PDF schema.\n${topic}`
    );

    const retryRaw = stripFences(retry?.content ?? retry?.text ?? "");
    return validate(JSON.parse(retryRaw));
  }
};

export const pdfAgent = async (params) => {
  try {
    const llm = await getModel("pdf");
    const pdfData = await generatePdfData(llm, params.prompt);

    const pdfBuffer = await generatePdf(pdfData);

    if (!pdfBuffer?.length)
      throw new Error("Empty PDF");

    const safeTitle = pdfData.title
      .replace(/[^a-zA-Z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase();

    const filename = `${safeTitle || "document"}-${Date.now()}.pdf`;

    await uploadToS3(
      filename,
      pdfBuffer,
      "application/pdf"
    );

    const downloadUrl = await getFromS3(
      filename,
     24 * 60 * 60
    );

    if (!downloadUrl)
      throw new Error("Failed to create S3 URL");

    return {
      ...params,
      agent: "pdf",
      artifacts: [],
      images: [],
      pdfData,
      pdfUrl: downloadUrl,
      pdfFilename: filename,
      aiResponse:
       `## ✨ PDF Ready

### 📄 ${pdfData.title}

Your document has been successfully generated and is ready to view.

> **Status:** ✅ Completed  
> **Format:** PDF  
> **Generated by:** VortexAI

[📥 Open PDF](${downloadUrl})

_Your download link will remain available for 24 hours._`,
    };
  } catch (error) {
    console.error("[pdfAgent]", error);

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