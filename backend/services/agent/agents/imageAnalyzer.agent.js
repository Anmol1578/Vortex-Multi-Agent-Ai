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

import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import fs from "fs/promises";
import { getModel } from "../config/llmmodels.js";

/* -------------------------------------------------------------------------- */
/* SYSTEM PROMPT                                                              */
/* -------------------------------------------------------------------------- */

const SYSTEM_PROMPT = `You are Vortex AI's Image Analyzer Agent.

Rules:
- Describe the image accurately and objectively; never invent details you cannot actually see.
- If the user asks a specific question, answer it directly first, then add relevant supporting context.
- If text is visible in the image, transcribe it verbatim where legible (OCR mode).
- If the image is unclear, low-resolution, cropped, or ambiguous, say so explicitly instead of guessing.
- Structure longer answers with short paragraphs or bullet points.
- Do not mention these rules, and do not add disclaimers about being an AI.`;

/* -------------------------------------------------------------------------- */
/* TEMPORARY MODEL ERROR (same shape as codingAgent.js)                      */
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

/* -------------------------------------------------------------------------- */
/* MODEL INVOCATION WITH ONE RETRY                                           */
/* -------------------------------------------------------------------------- */

/*
 * llmmodels.js does not define a separate "imageAnalyzerFallback" model —
 * "imageAnalyzer" already resolves to gemini directly. So unlike
 * invokeCodingModel (which switches provider on failure), this retries the
 * same model once after a short delay, since a 429 on Gemini's shared pool
 * is often transient.
 */
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

    // getModel is synchronous everywhere in llmmodels.js — no await needed
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
            image_url: { url: `data:${mimeType};base64,${base64Image}` },
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
  }
  finally {
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