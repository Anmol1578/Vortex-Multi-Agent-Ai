// import { ChatGroq } from "@langchain/groq";
// import { ChatGoogleGenerativeAI } from "@langchain/google-genai";


// const groq = new ChatGroq({
//   model: "openai/gpt-oss-120b",
//   temperature: 0,
// });

// const gemini = new ChatGoogleGenerativeAI({
//   model: "gemini-2.5-flash",
// });

// export const getModel = (agent) => {
//   switch (agent) {
//     case "chat":
//       return groq;
//     case "search":
//       return groq;
//     case "coding":
//       return gemini;
//     default:
//       return groq;
//   }
// };



import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { ChatGroq } from "@langchain/groq";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

if (!process.env.GROQ_API_KEY) {
  throw new Error("Missing GROQ_API_KEY");
}

if (!process.env.GOOGLE_API_KEY) {
  throw new Error("Missing GOOGLE_API_KEY");
}

const groq = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "openai/gpt-oss-120b",
  temperature: 0,
});

const gemini = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-2.5-flash",
});

export const getModel = (agent) => {
  switch (agent) {
    case "chat":
    case "search":
      return groq;
    case "coding":
      return gemini;
    default:
      return groq;
  }
};