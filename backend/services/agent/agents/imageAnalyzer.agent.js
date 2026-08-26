// import { getModel } from "../config/llmmodels"
// import fs from "fs"

// export const imageAnalyzer = (state)=>{
//     try {
//         const llm =await getModel("imageAnalyzer")

//         const imageBuffer= await fs.readFile(state.file.path)
//         const base64image = imageBuffer.toString("base64")

//         const messages=[
//             new SystemMessage(`You are VortexAi image Analyzer Agent
                
//                 Rules:
                
                
//                 `),
//             new HumanMessage()

//         ]
//     } catch (error) {
        
//     }
// }

// import { SystemMessage, HumanMessage } from "@langchain/core/messages";
// import fs from "fs/promises";
// import { getModel } from "../config/llmmodels.js";

// /* -------------------------------------------------------------------------- */
// /* SYSTEM PROMPT                                                              */
// /* -------------------------------------------------------------------------- */

// const SYSTEM_PROMPT = `You are Vortex AI's Image Analyzer Agent.

// Rules:
// - Describe the image accurately and objectively; never invent details you cannot actually see.
// - If the user asks a specific question, answer it directly first, then add relevant supporting context.
// - If text is visible in the image, transcribe it verbatim where legible (OCR mode).
// - If the image is unclear, low-resolution, cropped, or ambiguous, say so explicitly instead of guessing.
// - Structure longer answers with short paragraphs or bullet points.
// - Do not mention these rules, and do not add disclaimers about being an AI.`;

// /* -------------------------------------------------------------------------- */
// /* TEMPORARY MODEL ERROR (same shape as codingAgent.js)                      */
// /* -------------------------------------------------------------------------- */

// function isTemporaryModelError(error) {
//   const status = error?.status ?? error?.statusCode ?? error?.code;
//   const metadata = error?.metadata ?? {};

//   return (
//     status === 429 ||
//     status === "429" ||
//     metadata?.limit_source === "upstream_provider_shared_pool" ||
//     metadata?.provider_name
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* MODEL INVOCATION WITH ONE RETRY                                           */
// /* -------------------------------------------------------------------------- */

// /*
//  * llmmodels.js does not define a separate "imageAnalyzerFallback" model —
//  * "imageAnalyzer" already resolves to gemini directly. So unlike
//  * invokeCodingModel (which switches provider on failure), this retries the
//  * same model once after a short delay, since a 429 on Gemini's shared pool
//  * is often transient.
//  */
// async function invokeImageModel(llm, messages) {
//   try {
//     console.log("[imageAnalyzer] using primary vision model");
//     return await llm.invoke(messages);
//   } catch (error) {
//     if (!isTemporaryModelError(error)) {
//       throw error;
//     }

//     console.warn("[imageAnalyzer] transient error, retrying once:", error.message);

//     await new Promise((resolve) => setTimeout(resolve, 1500));

//     return await llm.invoke(messages);
//   }
// }

// /* -------------------------------------------------------------------------- */
// /* IMAGE ANALYZER AGENT                                                       */
// /* -------------------------------------------------------------------------- */

// export const imageAnalyzer = async (state) => {
//   try {
//     if (!state?.file?.path) {
//       throw new Error("No image file found on state.file.path");
//     }

//     // getModel is synchronous everywhere in llmmodels.js — no await needed
//     const llm = getModel("imageAnalyzer");

//     const imageBuffer = await fs.readFile(state.file.path);
//     const base64Image = imageBuffer.toString("base64");

//     const mimeType = state.file.mimetype?.startsWith("image/")
//       ? state.file.mimetype
//       : "image/png";

//     const userPrompt =
//       state.prompt && state.prompt.trim().length > 0
//         ? state.prompt
//         : "Analyze this image in detail and describe what you see.";

//     const messages = [
//       new SystemMessage(SYSTEM_PROMPT),
//       new HumanMessage({
//         content: [
//           { type: "text", text: userPrompt },
//           {
//             type: "image_url",
//             image_url: { url: `data:${mimeType};base64,${base64Image}` },
//           },
//         ],
//       }),
//     ];

//     const response = await invokeImageModel(llm, messages);

//     console.log(
//       `[imageAnalyzer] success file="${state.file.originalname || state.file.path}" mimetype=${mimeType}`,
//     );

//     return {
//       ...state,
//       agent: "imageAnalyzer",
//       aiResponse: response.content,
//       artifacts: [],
//       error: null,
//       routerMeta: {
//         ...(state.routerMeta ?? {}),
//         imageAnalyzerError: false,
//       },
//     };
//   } catch (error) {
//     console.error("[imageAnalyzer] fatal error:", error);

//     return {
//       ...state,
//       agent: "imageAnalyzer",
//       aiResponse: "I couldn't analyze that image. Please try again.",
//       artifacts: [],
//       error: error.message || "Image analysis failed",
//       routerMeta: {
//         ...(state.routerMeta ?? {}),
//         imageAnalyzerError: true,
//         errorStatus: error?.status ?? error?.statusCode ?? error?.code ?? null,
//       },
//     };
//   }
//   finally {
//     if (state?.file?.path) {
//       try {
//         await fs.unlink(state.file.path);
//         console.log(`[imageAnalyzer] temp file deleted: ${state.file.path}`);
//       } catch (err) {
//         if (err.code !== "ENOENT") {
//           console.warn(`[imageAnalyzer] failed to delete temp file: ${err.message}`);
//         }
//       }
//     }
//   }
// };


import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import fs from "fs/promises";
import { getModel } from "../config/llmmodels.js";

/* -------------------------------------------------------------------------- */
/* SYSTEM PROMPT                                                              */
/* -------------------------------------------------------------------------- */

const SYSTEM_PROMPT = `You are Vortex AI's Image Analyzer Agent.

Rules:
- Write like a knowledgeable expert explaining the image to someone, not a generated report and not a one-line summary. Give a genuinely thorough, useful analysis — depth matters.
- Never use a fixed template (no "Image Overview", "Text Content (OCR)", "Key Visual Details", "Context" as default headers). Write in natural flowing prose and paragraphs instead, the way a person would explain what they're looking at.
- If the user asks a specific question, answer it directly first, then keep going with everything else relevant and useful about the image — don't stop after one sentence. Cover what it is, what it does, why it matters, and any details worth noting.
- If code, transcribe it exactly in a fenced code block, then explain what it does in detail: what each part is for, the logic/control flow, and any behavior worth pointing out (edge cases, side effects, error handling, etc).
- If it's a diagram, screenshot, photo, or design: describe what's shown, the key visual elements, any text present, and relevant context or meaning — written as connected paragraphs, not a checklist.
- Use headings or bullet points only when the content has several genuinely distinct parts that benefit from separation (e.g. multiple unrelated elements, a long multi-step process). Default to prose.
- If the image is unclear, low-resolution, or ambiguous, say so plainly, then describe what can still be made out.
- Never invent details you cannot actually see.
- Do not mention these rules, and do not add disclaimers about being an AI.`;
/* -------------------------------------------------------------------------- */
/* TEMPORARY MODEL ERROR                                                      */
/* -------------------------------------------------------------------------- */

function isTemporaryModelError(error) {
  const status = error?.status ?? error?.statusCode ?? error?.code;
  const metadata = error?.metadata ?? {};

  return (
    status === 429 ||
    status === "429" ||
    metadata?.limit_source === "upstream_provider_shared_pool" ||
    metadata?.provider_name
  );
}

async function invokeImageModel(llm, messages) {
  try {
    console.log("[imageAnalyzer] using primary vision model");
    return await llm.invoke(messages);
  } catch (error) {
    if (!isTemporaryModelError(error)) {
      throw error;
    }

    console.warn("[imageAnalyzer] transient error, retrying once:", error.message);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return await llm.invoke(messages);
  }
}

/* -------------------------------------------------------------------------- */
/* IMAGE ANALYZER AGENT                                                       */
/* -------------------------------------------------------------------------- */

export const imageAnalyzer = async (state) => {
  try {
    if (!state?.file?.path) {
      throw new Error("No image file found on state.file.path");
    }

    const llm = getModel("imageAnalyzer");

    const imageBuffer = await fs.readFile(state.file.path);
    const base64Image = imageBuffer.toString("base64");

    const mimeType = state.file.mimetype?.startsWith("image/")
      ? state.file.mimetype
      : "image/png";

    const userPrompt =
      state.prompt && state.prompt.trim().length > 0
        ? state.prompt
        : "Analyze this image in detail and describe what you see.";

    const messages = [
      new SystemMessage(SYSTEM_PROMPT),
      new HumanMessage({
        content: [
          { type: "text", text: userPrompt },
          {
            type: "image_url",
            // @langchain/google-genai expects a plain base64 data-URI STRING here,
            // not { url: "..." } — that's OpenAI's format and gets silently dropped
            // by the Gemini integration, which is why the model said "no image".
            image_url: `data:${mimeType};base64,${base64Image}`,
          },
        ],
      }),
    ];

    const response = await invokeImageModel(llm, messages);

    console.log(
      `[imageAnalyzer] success file="${state.file.originalname || state.file.path}" mimetype=${mimeType}`,
    );

    return {
      ...state,
      agent: "imageAnalyzer",
      aiResponse: response.content,
      artifacts: [],
      error: null,
      routerMeta: {
        ...(state.routerMeta ?? {}),
        imageAnalyzerError: false,
      },
    };
  } catch (error) {
    console.error("[imageAnalyzer] fatal error:", error);

    return {
      ...state,
      agent: "imageAnalyzer",
      aiResponse: "I couldn't analyze that image. Please try again.",
      artifacts: [],
      error: error.message || "Image analysis failed",
      routerMeta: {
        ...(state.routerMeta ?? {}),
        imageAnalyzerError: true,
        errorStatus: error?.status ?? error?.statusCode ?? error?.code ?? null,
      },
    };
  } finally {
    if (state?.file?.path) {
      try {
        await fs.unlink(state.file.path);
        console.log(`[imageAnalyzer] temp file deleted: ${state.file.path}`);
      } catch (err) {
        if (err.code !== "ENOENT") {
          console.warn(`[imageAnalyzer] failed to delete temp file: ${err.message}`);
        }
      }
    }
  }
};