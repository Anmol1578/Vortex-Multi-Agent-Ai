// day 24 july

// import { getModel } from "../config/llmmodels.js";

// export const codingAgent = async (state) => {
//   const intentLlm = await getModel("intent");
//   const llm = await getModel("coding");

//   const intentRes = await intentLlm.invoke(`
// You are an intent classifier.

// Return ONLY one of these values.

// CODE_GENERATION
// CODE_REVIEW
// CODE_EXPLANATION
// DEBUGGING
// OPTIMIZATION
// CONVERSION
// DOCUMENTATION

// User Request:
// ${state.prompt}
// `);

//   const intent = intentRes.content.trim();

//   if (intent === "CODE_GENERATION") {
//     const prompt = `
// You are an elite Senior Software Engineer.

// Your job is to generate COMPLETE production-ready code.

// The frontend already exists.

// Current UI:
// - Sidebar ✅
// - Chat Area ✅
// - Artifact Panel ✅

// Never explain how to build these.

// Assume users can instantly preview every generated file inside the Artifact area.

// ──────────────────────────────

// DEFAULT STACK

// Frontend
// - React 19
// - Vite
// - Tailwind CSS v4
// - JavaScript (unless TypeScript requested)
// - React Router
// - Axios
// - Zustand (preferred over Redux unless requested)
// - Framer Motion
// - HeroUI
// - Lucide Icons

// Backend
// - Node.js
// - Express
// - MongoDB
// - Mongoose
// - JWT Authentication
// - Socket.io
// - Redis (optional)
// - Multer
// - Cloudinary

// AI
// - LangGraph
// - LangChain
// - OpenAI Compatible APIs

// Testing
// - Vitest
// - React Testing Library

// Deployment
// - Docker
// - Nginx
// - GitHub Actions

// ──────────────────────────────

// RULES

// Always:

// • Write modern code.
// • Follow best practices.
// • Follow clean architecture.
// • Use reusable components.
// • Avoid duplicated code.
// • Use meaningful variable names.
// • Keep files organized.
// • Add comments only where necessary.
// • Make responsive UI.
// • Use accessibility best practices.
// • Use async/await.
// • Handle errors.
// • Include loading states when needed.
// • Include empty states.
// • Include validation.

// Never:

// • Return markdown.
// • Return \`\`\`.
// • Return explanations unless requested.
// • Return partial implementations.
// • Return pseudo code.
// • Return placeholders like "implement here".

// Always generate COMPLETE code.

// ──────────────────────────────

// WORKFLOW

// 1. Understand the request.
// 2. Decide required files.
// 3. Generate every required file.
// 4. Include dependencies.
// 5. Include commands if necessary.
// 6. Ensure imports are valid.
// 7. Ensure code compiles.

// ──────────────────────────────

// OUTPUT FORMAT

// Return ONLY valid JSON.

// The response MUST start with {

// Example:

// // {
// //   "intent":"CODE_GENERATION",
// //   "title":"Authentication System",
// //   "description":"JWT Authentication",
// //   "files":[
// //     {
// //       "path":"src/App.jsx",
// //       "language":"javascript",
// //       "content":"..."
// //     },
// //     {
// //       "path":"src/components/Login.jsx",
// //       "language":"javascript",
// //       "content":"..."
// //     }
// //   ],
// //   "dependencies":[
// //     "axios",
// //     "react-router-dom"
// //   ],
// //   "commands":[
// //     "npm install axios react-router-dom"
// //   ]
// // }

// {
//   "intent": "CODE_GENERATION",
//   "title": "Project Title",
//   "description": "Short description",
//   "files": [
//     {
//       "path": "src/App.jsx",
//       "language": "javascript",
//       "content": "..."
//     }
//   ],
//   "dependencies": [],
//   "commands": [],
//   "notes": []
// }

// Rules:

// - Start with {
// - End with }
// - No markdown
// - No explanations
// - No text outside JSON
// - JSON must always be parseable

// ──────────────────────────────

// User Request:

// ${state.prompt}
// `;

//     const result = await llm.invoke(prompt);

//     return {
//       intent,
//        aiResponse: result.content,
//     };
//   }

//   return {
//     intent,
//     response: "",
//   };
// };

import { getModel } from "../config/llmmodels.js";

const INTENTS = [
  "CODE_GENERATION",
  "CODE_REVIEW",
  "CODE_EXPLANATION",
  "DEBUGGING",
  "OPTIMIZATION",
  "CONVERSION",
  "DOCUMENTATION",
];

const SHARED_CONTEXT = `
You are an elite Senior Software Engineer working inside Vortex, a multi-agent AI coding platform.

The frontend already exists — Sidebar, Chat Area, and an Artifact Panel that renders generated files with live preview and copy/download. Never explain how to build these; assume they exist.

DEFAULT STACK
Frontend: React 19, Vite, Tailwind CSS v4, React Router, Axios, Zustand (preferred over Redux unless requested), Framer Motion, HeroUI, Lucide Icons.
Backend: Node.js, Express, MongoDB + Mongoose, JWT auth, Socket.io, Redis (optional), Multer, Cloudinary.
AI: LangGraph, LangChain, OpenAI-compatible APIs.
Testing: Vitest, React Testing Library.
Deployment: Docker, Nginx, GitHub Actions.
Use TypeScript only if the user explicitly asks for it.

RULES
Always: write complete, modern, working code (no "implement here" placeholders, no pseudocode, no partial files); use async/await; handle errors; include loading/empty/validation states where relevant; keep files organized and reusable; use accessible, responsive UI.
Never: return markdown fences, return explanations outside the JSON, return partial implementations.
`;

const OUTPUT_CONTRACT = `
Return ONLY valid JSON. The response MUST start with { and end with }. No markdown fences. No text outside the JSON. The JSON must always be parseable by JSON.parse.
`;

const buildPrompt = (intent, userPrompt, history = []) => {
  const context =
    history.length > 0
      ? `\nRelevant conversation history:\n${history
          .map((h) => `${h.role}: ${h.content}`)
          .join("\n")}\n`
      : "";

  const schemas = {
    CODE_GENERATION: `{
  "intent": "CODE_GENERATION",
  "message": "A detailed, chat-facing explanation written in Markdown. Structure it like this:\\n\\n1. Open with 1-2 sentences on what you built and why, in plain language.\\n2. A '**What's included**' section as a bullet list — one bullet per file or major piece, naming the file and its role (e.g. '- \`src/components/LoginForm.jsx\` — handles form state, validation, and calls the auth API').\\n3. A '**How it works**' section — 2-4 sentences walking through the logic/data flow, e.g. what happens on submit, how state moves between components, what the backend endpoint expects.\\n4. If relevant, a '**Notes**' section for setup steps, env vars needed, or things the user should know before running it.\\n\\nWrite for someone who will glance at this in a chat bubble before opening the artifact panel to see the actual code — give them enough to understand the shape of the solution without needing to open a single file.",
  "title": "Project or feature title",
  "description": "Short description",
  "files": [
    { "path": "src/App.jsx", "language": "javascript", "content": "full file contents" }
  ],
  "dependencies": [],
  "commands": [],
  "notes": []
}`,
    CODE_REVIEW: `{
  "intent": "CODE_REVIEW",
  "message": "Full review in Markdown. Structure it with a brief overall assessment first (1-2 sentences), then a '**Issues Found**' section listing each problem — reference specific lines or function names, explain why it's a problem, and give the concrete fix. Group by severity if there are many (Critical / Suggestions). End with anything done well, if notable."
}`,
    CODE_EXPLANATION: `{
  "intent": "CODE_EXPLANATION",
  "message": "Step-by-step Markdown explanation of what the code does. Walk through it roughly in execution order — what runs first, what triggers what, where data comes from and where it goes. Use short paragraphs or a numbered list, whichever fits the code's structure better. Assume the reader can code but has never seen this specific file."
}`,
    DEBUGGING: `{
  "intent": "DEBUGGING",
  "message": "Markdown explanation structured as: '**Root cause**' (what was actually broken and why, referencing the specific line/logic at fault), then '**Fix**' (what changed and why that resolves it), then '**How to verify**' if there's a clear way to confirm it's fixed (e.g. what to click, what output to expect).",
  "title": "Bug fix title",
  "description": "What was wrong and why",
  "files": [
    { "path": "src/App.jsx", "language": "javascript", "content": "corrected file contents" }
  ],
  "dependencies": [],
  "commands": [],
  "notes": []
}`,
    OPTIMIZATION: `{
  "intent": "OPTIMIZATION",
  "message": "Markdown explanation structured as: '**What was slow/inefficient**' (the specific bottleneck, with rough complexity or cost if relevant), then '**What changed**' as a bullet list of concrete optimizations, then '**Tradeoffs**' if any (e.g. more memory for less compute, added complexity for speed).",
  "title": "Optimization title",
  "description": "Tradeoffs made",
  "files": [
    { "path": "src/App.jsx", "language": "javascript", "content": "optimized file contents" }
  ],
  "dependencies": [],
  "commands": [],
  "notes": []
}`,
    CONVERSION: `{
  "intent": "CONVERSION",
  "message": "Markdown explanation covering what was converted from/to, then a '**Notes on the conversion**' section listing anything that didn't map 1:1 between the source and target (idioms, APIs, patterns) and how you handled each one.",
  "title": "Conversion title",
  "description": "Converted from X to Y",
  "files": [
    { "path": "src/App.jsx", "language": "javascript", "content": "converted file contents" }
  ],
  "dependencies": [],
  "commands": [],
  "notes": []
}`,
    DOCUMENTATION: `{
  "intent": "DOCUMENTATION",
  "message": "Brief Markdown summary (2-3 sentences) of what was documented and the convention used (JSDoc/docstrings/etc). The full documented code itself should be embedded as a fenced code block within this message so the user can see it inline."
}`,
  };

  return `
${SHARED_CONTEXT}

Task type: ${intent}
${OUTPUT_CONTRACT}

Output JSON schema for this intent:
${schemas[intent]}
${context}
User Request:
${userPrompt}
`;
};

// Strips accidental code fences and grabs the outermost {...} block,
// since models frequently ignore "no markdown" instructions.
function sanitizeJson(raw) {
  if (typeof raw !== "string") return null;
  let cleaned = raw.trim();
  cleaned = cleaned
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  const first = cleaned.indexOf("{");
  const last = cleaned.lastIndexOf("}");
  if (first === -1 || last === -1 || last < first) return null;
  cleaned = cleaned.slice(first, last + 1);

  try {
    JSON.parse(cleaned); // validate only
    return cleaned;
  } catch {
    return null;
  }
}

export const codingAgent = async (state) => {
  const intentLlm = getModel("intent");
  const llm = getModel("coding");

  const intentRes = await intentLlm.invoke(`
You are an intent classifier. Return ONLY one of these exact values, nothing else:

${INTENTS.join("\n")}

User Request:
${state.prompt}
`);

  const rawIntent = intentRes.content?.trim().toUpperCase();
  const intent = INTENTS.includes(rawIntent) ? rawIntent : "CODE_GENERATION";

  const prompt = buildPrompt(intent, state.prompt, state.history);
  const result = await llm.invoke(prompt);

  const clean = sanitizeJson(result.content);

  if (!clean) {
    // Model didn't return parseable JSON — fail gracefully instead of
    // saving broken content and 500ing.
    console.error("[codingAgent] non-JSON output from model", {
      intent,
      raw: result.content?.slice(0, 300),
    });
    return {
      aiResponse:
        result.content?.trim() ||
        "Something went wrong generating a response. Please try again.",
      routerMeta: {
        ...(state.routerMeta ?? {}),
        codingIntent: intent,
        parseError: true,
      },
    };
  }

  return {
    aiResponse: clean,
    routerMeta: {
      ...(state.routerMeta ?? {}),
      codingIntent: intent,
    },
  };
};
