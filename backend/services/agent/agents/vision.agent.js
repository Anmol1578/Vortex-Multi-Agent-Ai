// import { getModel } from "../config/llmmodels.js"
// import axios from "axios"

// export const visionAgent = async (state) =>{
//     const llm = await getModel("image")
//     const res = await llm.invoke(`
// You are an elite AI image prompt engineer.

// Convert the user request into a highly detailed image generation prompt.

// Requirements:
// - Cinematic lighting
// - Professional composition
// - Ultra realistic
// - High detail
// - Beautiful color palette
// - Sharp focus
// - 8K quality
// - Photorealistic
// - Depth of field
// - Professional photography
// - Stunning visuals

// Return only the image prompt.

// User Request:
// ${state.prompt}
// `)

// const prompt=res.content.trim()

// const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`

// const imageRes = await axios.get(imageUrl,{responseType:"arraybuffer"})

// const buffer = Buffer.from(imageRes.data)
// const filename = `image-${Date.now()}.png`

// await uploadToS3(filename , buffer , "image/png")

// const downloadUrl = await getFromS3(filename,24*60*60)

// return {
//     ...state,
//     aiResponse:
// }

// }

// import { getModel } from "../config/llmModels.js";
// import axios from "axios";
// import { getFromS3 } from "../utils/getFromS3.js";
// import { uploadToS3 } from "../utils/uploadToS3.js";

// export const visionAgent = async (state) => {
//   try {
//     const llm = await getModel("image");

//     const res = await llm.invoke(`
// You are an elite AI image prompt engineer.

// Convert the user request into a highly detailed image generation prompt.

// Requirements:
// - Cinematic lighting
// - Professional composition
// - Ultra realistic
// - High detail
// - Beautiful color palette
// - Sharp focus
// - 8K quality
// - Photorealistic
// - Depth of field
// - Professional photography
// - Stunning visuals

// Return only the image prompt.

// User Request:
// ${state.prompt}
// `);

//     const prompt = (res?.content ?? res?.text ?? "").toString().trim();

//     if (!prompt) {
//       throw new Error("visionAgent: LLM returned an empty image prompt");
//     }

//     console.log("[visionAgent] generated prompt:", prompt);

//     const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

//     console.log("[visionAgent] fetching image from pollinations:", imageUrl);

//     const imageRes = await axios.get(imageUrl, { responseType: "arraybuffer" });
//     const buffer = Buffer.from(imageRes.data);

//     if (!buffer || buffer.length === 0) {
//       throw new Error("visionAgent: received an empty image buffer from pollinations");
//     }

//     console.log(`[visionAgent] received image buffer: ${buffer.length} bytes`);

//     const filename = `image-${Date.now()}.png`;

//     console.log(`[visionAgent] uploading "${filename}" to S3`);

//     await uploadToS3(filename, buffer, "image/png");

//     const EXPIRY_SECONDS = 10 * 60; // link expires in 10 minutes
//     const downloadUrl = await getFromS3(filename, EXPIRY_SECONDS);

//     console.log("[visionAgent] upload complete, signed URL:", downloadUrl);

//     // IMPORTANT: content must stay a plain string — the Message schema
//     // casts `content` to String, so nesting an object here (like the
//     // previous `aiResponse: {...}` shape) fails Mongoose validation.
//  return {
//   ...state,
//   aiResponse: `I've generated your image based on the following prompt:\n\n"${prompt}"\n\nThe download link below is valid for the next 10 minutes — please save the image before it expires.`,
//   agent: "vision",
//   images: [{ url: downloadUrl, description: prompt }],
// };
//   } catch (error) {
//     console.error("[visionAgent] failed:", error);

//   return {
//     ...state,
//     aiResponse: "Failed to generate image. Please try again.",
//     agent: "vision",
//     images: [],
//   };
//   }
// };

import { getModel } from "../config/llmModels.js";
import axios from "axios";
import { getFromS3 } from "../utils/getFromS3.js";
import { uploadToS3 } from "../utils/uploadToS3.js";

export const visionAgent = async (state) => {
  try {
    const llm = await getModel("image");

    const res = await llm.invoke(`
You are an elite AI image prompt engineer.

Convert the user request into a highly detailed image generation prompt.

Requirements:
- Cinematic lighting
- Professional composition
- Ultra realistic
- High detail
- Beautiful color palette
- Sharp focus
- 8K quality
- Photorealistic
- Depth of field
- Professional photography
- Stunning visuals

Return only the image prompt.

User Request:
${state.prompt}
`);

    const prompt = (res?.content ?? res?.text ?? "").toString().trim();

    if (!prompt) {
      throw new Error("visionAgent: LLM returned an empty image prompt");
    }

    console.log("[visionAgent] generated prompt:", prompt);

    // const params = new URLSearchParams({
    //   width: "1024",
    //   height: "1024",
    //   model: "flux",
    //   nologo: "true",
    //   enhance: "true",
    // });

    const params = new URLSearchParams({
      width: "1536",
      height: "1536",
      model: "flux",
      nologo: "true",
      enhance: "true",
    });

    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?${params.toString()}`;

    console.log("[visionAgent] fetching image from pollinations:", imageUrl);

    const imageRes = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const buffer = Buffer.from(imageRes.data);

    if (!buffer || buffer.length === 0) {
      throw new Error(
        "visionAgent: received an empty image buffer from pollinations",
      );
    }

    console.log(`[visionAgent] received image buffer: ${buffer.length} bytes`);

    const filename = `image-${Date.now()}.png`;

    console.log(`[visionAgent] uploading "${filename}" to S3`);

    await uploadToS3(filename, buffer, "image/png");

    const EXPIRY_SECONDS = 10 * 60;
    const downloadUrl = await getFromS3(filename, EXPIRY_SECONDS);

    console.log("[visionAgent] upload complete, signed URL:", downloadUrl);

    return {
      ...state,
      aiResponse: "Here's your generated image:",
      agent: "vision",
      images: [{ url: downloadUrl, description: "" }],
    };
  } catch (error) {
    console.error("[visionAgent] failed:", error);

    return {
      ...state,
      aiResponse: "Failed to generate image. Please try again.",
      agent: "vision",
      images: [],
    };
  }
};
