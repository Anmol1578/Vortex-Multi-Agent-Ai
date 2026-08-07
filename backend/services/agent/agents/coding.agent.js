// 25 JULY -------------------------------------------------------------------------------------------------------------

// import { getModel } from "../config/llmmodels.js";

// const INTENTS = [
//   "CODE_GENERATION",
//   "CODE_REVIEW",
//   "CODE_EXPLANATION",
//   "DEBUGGING",
//   "OPTIMIZATION",
//   "CONVERSION",
//   "DOCUMENTATION",
// ];

// const SHARED_CONTEXT = `
// You are an elite Senior Software Engineer working inside Vortex, a multi-agent AI coding platform.

// The frontend already exists — Sidebar, Chat Area, and an Artifact Panel that renders generated files with live preview and copy/download. Never explain how to build these; assume they exist.

// DEFAULT STACK
// Frontend: React 19, Vite, Tailwind CSS v4, React Router, Axios, Zustand (preferred over Redux unless requested), Framer Motion, HeroUI, Lucide Icons.
// Backend: Node.js, Express, MongoDB + Mongoose, JWT auth, Socket.io, Redis (optional), Multer, Cloudinary.
// AI: LangGraph, LangChain, OpenAI-compatible APIs.
// Testing: Vitest, React Testing Library.
// Deployment: Docker, Nginx, GitHub Actions.
// Use TypeScript only if the user explicitly asks for it.

// RULES
// Always: write complete, modern, working code (no "implement here" placeholders, no pseudocode, no partial files); use async/await; handle errors; include loading/empty/validation states where relevant; keep files organized and reusable; use accessible, responsive UI.
// Never: return markdown fences, return explanations outside the JSON, return partial implementations.
// `;

// const OUTPUT_CONTRACT = `
// Return ONLY valid JSON. The response MUST start with { and end with }. No markdown fences. No text outside the JSON. The JSON must always be parseable by JSON.parse.
// `;

// const buildPrompt = (intent, userPrompt, history = []) => {
//   const context =
//     history.length > 0
//       ? `\nRelevant conversation history:\n${history
//           .map((h) => `${h.role}: ${h.content}`)
//           .join("\n")}\n`
//       : "";

//   const schemas = {
//     CODE_GENERATION: `{
//   "intent": "CODE_GENERATION",
//   "message": "A detailed, chat-facing explanation written in Markdown. Structure it like this:\\n\\n1. Open with 1-2 sentences on what you built and why, in plain language.\\n2. A '**What's included**' section as a bullet list — one bullet per file or major piece, naming the file and its role (e.g. '- \`src/components/LoginForm.jsx\` — handles form state, validation, and calls the auth API').\\n3. A '**How it works**' section — 2-4 sentences walking through the logic/data flow, e.g. what happens on submit, how state moves between components, what the backend endpoint expects.\\n4. If relevant, a '**Notes**' section for setup steps, env vars needed, or things the user should know before running it.\\n\\nWrite for someone who will glance at this in a chat bubble before opening the artifact panel to see the actual code — give them enough to understand the shape of the solution without needing to open a single file.",
//   "title": "Project or feature title",
//   "description": "Short description",
//   "files": [
//     { "path": "src/App.jsx", "language": "javascript", "content": "full file contents" }
//   ],
//   "dependencies": [],
//   "commands": [],
//   "notes": []
// }`,
//     CODE_REVIEW: `{
//   "intent": "CODE_REVIEW",
//   "message": "Full review in Markdown. Structure it with a brief overall assessment first (1-2 sentences), then a '**Issues Found**' section listing each problem — reference specific lines or function names, explain why it's a problem, and give the concrete fix. Group by severity if there are many (Critical / Suggestions). End with anything done well, if notable."
// }`,
//     CODE_EXPLANATION: `{
//   "intent": "CODE_EXPLANATION",
//   "message": "Step-by-step Markdown explanation of what the code does. Walk through it roughly in execution order — what runs first, what triggers what, where data comes from and where it goes. Use short paragraphs or a numbered list, whichever fits the code's structure better. Assume the reader can code but has never seen this specific file."
// }`,
//     DEBUGGING: `{
//   "intent": "DEBUGGING",
//   "message": "Markdown explanation structured as: '**Root cause**' (what was actually broken and why, referencing the specific line/logic at fault), then '**Fix**' (what changed and why that resolves it), then '**How to verify**' if there's a clear way to confirm it's fixed (e.g. what to click, what output to expect).",
//   "title": "Bug fix title",
//   "description": "What was wrong and why",
//   "files": [
//     { "path": "src/App.jsx", "language": "javascript", "content": "corrected file contents" }
//   ],
//   "dependencies": [],
//   "commands": [],
//   "notes": []
// }`,
//     OPTIMIZATION: `{
//   "intent": "OPTIMIZATION",
//   "message": "Markdown explanation structured as: '**What was slow/inefficient**' (the specific bottleneck, with rough complexity or cost if relevant), then '**What changed**' as a bullet list of concrete optimizations, then '**Tradeoffs**' if any (e.g. more memory for less compute, added complexity for speed).",
//   "title": "Optimization title",
//   "description": "Tradeoffs made",
//   "files": [
//     { "path": "src/App.jsx", "language": "javascript", "content": "optimized file contents" }
//   ],
//   "dependencies": [],
//   "commands": [],
//   "notes": []
// }`,
//     CONVERSION: `{
//   "intent": "CONVERSION",
//   "message": "Markdown explanation covering what was converted from/to, then a '**Notes on the conversion**' section listing anything that didn't map 1:1 between the source and target (idioms, APIs, patterns) and how you handled each one.",
//   "title": "Conversion title",
//   "description": "Converted from X to Y",
//   "files": [
//     { "path": "src/App.jsx", "language": "javascript", "content": "converted file contents" }
//   ],
//   "dependencies": [],
//   "commands": [],
//   "notes": []
// }`,
//     DOCUMENTATION: `{
//   "intent": "DOCUMENTATION",
//   "message": "Brief Markdown summary (2-3 sentences) of what was documented and the convention used (JSDoc/docstrings/etc). The full documented code itself should be embedded as a fenced code block within this message so the user can see it inline."
// }`,
//   };

//   return `
// ${SHARED_CONTEXT}

// Task type: ${intent}
// ${OUTPUT_CONTRACT}

// Output JSON schema for this intent:
// ${schemas[intent]}
// ${context}
// User Request:
// ${userPrompt}
// `;
// };

// // Strips accidental code fences and grabs the outermost {...} block,
// // since models frequently ignore "no markdown" instructions.
// function sanitizeJson(raw) {
//   if (typeof raw !== "string") return null;
//   let cleaned = raw.trim();
//   cleaned = cleaned
//     .replace(/^```(?:json)?\s*/i, "")
//     .replace(/```$/i, "")
//     .trim();

//   const first = cleaned.indexOf("{");
//   const last = cleaned.lastIndexOf("}");
//   if (first === -1 || last === -1 || last < first) return null;
//   cleaned = cleaned.slice(first, last + 1);

//   try {
//     JSON.parse(cleaned); // validate only
//     return cleaned;
//   } catch {
//     return null;
//   }
// }

// export const codingAgent = async (state) => {
//   const intentLlm = getModel("intent");
//   const llm = getModel("coding");

//   const intentRes = await intentLlm.invoke(`
// You are an intent classifier. Return ONLY one of these exact values, nothing else:

// ${INTENTS.join("\n")}

// User Request:
// ${state.prompt}
// `);

//   const rawIntent = intentRes.content?.trim().toUpperCase();
//   const intent = INTENTS.includes(rawIntent) ? rawIntent : "CODE_GENERATION";

//   const prompt = buildPrompt(intent, state.prompt, state.history);
//   const result = await llm.invoke(prompt);

//   const clean = sanitizeJson(result.content);

//   if (!clean) {
//     // Model didn't return parseable JSON — fail gracefully instead of
//     // saving broken content and 500ing.
//     console.error("[codingAgent] non-JSON output from model", {
//       intent,
//       raw: result.content?.slice(0, 300),
//     });
//     return {
//       aiResponse:
//         result.content?.trim() ||
//         "Something went wrong generating a response. Please try again.",
//       routerMeta: {
//         ...(state.routerMeta ?? {}),
//         codingIntent: intent,
//         parseError: true,
//       },
//     };
//   }

//   const parsed = JSON.parse(clean);
//   return {
//     aiResponse: parsed.message,
//     artifacts: [
//       {
//         id: Date.now(),
//         type: parsed.intent,
//         files: parsed.files.map((f) => ({
//           name: f.path,
//           content: f.content,
//         })),
//       },
//     ],
//     routerMeta: {
//       ...(state.routerMeta ?? {}),
//       codingIntent: intent,
//     },
//   };
// };




// AUGUST 7 

// import { getModel } from "../config/llmmodels.js";

// const INTENTS = [
//   "CODE_GENERATION",
//   "CODE_REVIEW",
//   "CODE_EXPLANATION",
//   "DEBUGGING",
//   "OPTIMIZATION",
//   "CONVERSION",
//   "DOCUMENTATION",
// ];

// const SHARED_CONTEXT = `
// You are an elite Senior Software Engineer working inside Vortex, a multi-agent AI coding platform.

// The frontend already exists — Sidebar, Chat Area, and an Artifact Panel that renders generated files with live preview and copy/download. Never explain how to build these; assume they exist. The Artifact Panel's live preview renders raw HTML/CSS/JS in an iframe — it does NOT compile JSX, TSX, or any bundled/transpiled framework code. Files that can't run directly in a browser will NOT show a preview.

// OUTPUT TYPE DECISION — DO THIS FIRST (applies to CODE_GENERATION, DEBUGGING, OPTIMIZATION, CONVERSION)
// Before picking a file format, decide what kind of artifact was actually requested:
//   A) UI / WEB — the request is for a webpage, website, landing page, web app, dashboard, form, frontend component, or any visual interface → follow "DEFAULT OUTPUT MODE" below.
//   B) GENERAL PROGRAM — the request is an algorithm, data structure, script, CLI tool, backend-only logic, competitive-programming/LeetCode-style problem, utility function, or explicitly names a language (C++, Python, Java, Go, Rust, C, Swift, Kotlin, SQL, Bash, etc.) with no UI implied → write the code directly in that language (or the single most idiomatic language for the task if the user didn't specify one — use the same judgment you normally would). Use one or more appropriately named/extensioned files (e.g. "main.cpp", "solution.py", "script.sh", "server.js" for a pure backend script). Do NOT wrap this in an index.html/style.css/script.js scaffold, do NOT invent a UI for something that isn't one, and do NOT force it into a browser-previewable shape — plain program files with no preview are correct and expected here.
// Default to the user's literal wording: naming a language, algorithm, or "program"/"script"/"function" implies (B); naming a page/site/app/UI/form implies (A). If genuinely ambiguous, prefer (B) — a runnable program is a safer default than an unwanted webpage.

// DEFAULT OUTPUT MODE — VANILLA HTML/CSS/JS (only when (A) UI/WEB applies)
// Unless the user explicitly names a framework (React, Vue, Next.js, etc.) or explicitly says they want a JSX/TSX/component-based structure, generate plain, previewable web code:
//   - "index.html" — semantic markup, links to the css/js files by relative path (e.g. <link rel="stylesheet" href="style.css">, <script src="script.js" defer></script>). Do NOT inline everything into one file unless the request is trivially small (a single snippet).
//   - "style.css" — modern CSS (flexbox/grid, custom properties, responsive), matching Vortex's glass-morphism light theme (bg white/70 + backdrop-blur, green accent #1E7A56, IBM Plex Mono for code/mono text, Space Grotesk for headings) when no other style is specified.
//   - "script.js" — vanilla JS (ES2020+, no build step, no imports from bundlers), handles all interactivity, DOM updates, form logic, fetch calls, etc.
// Use these exact filenames (index.html / style.css / script.js) so the Artifact Panel can reliably wire up the live preview. Multi-page output can add extra .html/.css/.js files, but there must always be an index.html entry point.

// WHEN TO USE REACT / OTHER FRAMEWORKS INSTEAD
// Only produce React (or another framework) when the user's request explicitly asks for it (mentions React, JSX, components, hooks, Vite, Next.js, a specific framework, or says something like "as a React component"). In that case:
//   - Frontend: React 19, Vite, Tailwind CSS v4, React Router, Axios, Zustand (preferred over Redux unless requested), Framer Motion, HeroUI, Lucide Icons.
//   - Note plainly in "notes" that this output won't render in the live preview iframe and needs to be run in a proper build environment.

// BACKEND / NON-UI CODE
// Node.js, Express, MongoDB + Mongoose, JWT auth, Socket.io, Redis (optional), Multer, Cloudinary.
// AI: LangGraph, LangChain, OpenAI-compatible APIs.
// Testing: Vitest, React Testing Library.
// Deployment: Docker, Nginx, GitHub Actions.
// Use TypeScript only if the user explicitly asks for it.

// IMAGES (only applies when the OUTPUT TYPE DECISION above resolves to (A) UI/WEB — general programs have no images)
// Use real, keyword-matched photographic images via LoremFlickr, which searches actual Flickr photos by keyword — zero setup, no API key. NEVER invent Unsplash URLs, photo IDs, or any other image host — those are hallucinated and will 404.
//   - Use this exact URL pattern: https://loremflickr.com/{width}/{height}/{keyword}
//   - {keyword} must be 1-3 words, comma-separated for multiple concepts, describing exactly what the photo should show (e.g. "bruschetta", "calamari,seafood", "cozy,coffee,shop" — URL-encode spaces as commas or omit them, never use literal spaces).
//   - Choose {width}/{height} to fit the layout (e.g. 1200/600 for a wide hero, 400/400 for a square avatar/thumbnail, 600/800 for a portrait card).
//   - Always set a meaningful "alt" attribute matching the keyword/subject.
//   - Add a unique lock={n} query param per image if you want the same photo (not a new random one) on repeat visits, e.g. https://loremflickr.com/400/400/bruschetta?lock=1 — otherwise the same keyword can return a different photo from Flickr's matching pool each time it's requested.
//   - For icons, logos, and small decorative graphics that need to match specific shapes/brand colors: still use inline SVG for those — LoremFlickr is for photographic content only (heroes, backgrounds, product/card thumbnails, avatars).
//   - Keep the overall look aligned with Vortex's theme (glass-morphism, green accent #1E7A56, soft gradients) via CSS treatment (rounded corners, subtle overlays, border) around the images.
// This gives real subject-matched photos with zero backend work, though results depend on Flickr's public photo pool for that keyword and occasionally return an approximate rather than exact match.

// RULES
// Always: write complete, modern, working code (no "implement here" placeholders, no pseudocode, no partial files); use async/await; handle errors; include loading/empty/validation states where relevant; keep files organized and reusable; use accessible, responsive UI.
// Never: return markdown fences, return explanations outside the JSON, return partial implementations.
// `;

// const OUTPUT_CONTRACT = `
// Return ONLY valid JSON. The response MUST start with { and end with }. No markdown fences. No text outside the JSON. The JSON must always be parseable by JSON.parse.
// `;

// const buildPrompt = (intent, userPrompt, history = []) => {
//   const context =
//     history.length > 0
//       ? `\nRelevant conversation history:\n${history
//           .map((h) => `${h.role}: ${h.content}`)
//           .join("\n")}\n`
//       : "";

//   const schemas = {
//     CODE_GENERATION: `{
//   "intent": "CODE_GENERATION",
//   "message": "A detailed, chat-facing explanation written in Markdown. Structure it like this:\\n\\n1. Open with 1-2 sentences on what you built and why, in plain language.\\n2. A '**What's included**' section as a bullet list — one bullet per file or major piece, naming the file and its role. For UI/web output that's things like '- \`index.html\` — page structure and layout', '- \`style.css\` — theme, layout, responsive rules', '- \`script.js\` — form validation and interactivity'. For a general program that's things like '- \`main.cpp\` — reads input, builds the graph, runs BFS' or '- \`solution.py\` — the core algorithm implementation'.\\n3. A '**How it works**' section — 2-4 sentences walking through the logic/data flow, e.g. what happens on submit, how state moves between components, what the backend endpoint expects.\\n4. If relevant, a '**Notes**' section for setup steps, env vars needed, or things the user should know before running it. If React/another framework was used instead of the HTML/CSS/JS default (because the user explicitly asked for it), state clearly here that it requires a build step and won't render in the live preview.",
//   "title": "Project or feature title",
//   "description": "Short description",
//   "files": [
//     { "path": "choose the appropriate filename/extension for what was requested — e.g. index.html + style.css + script.js for (A) UI/WEB, or main.cpp / solution.py / script.sh / server.js etc. for (B) GENERAL PROGRAM", "language": "match the actual language used", "content": "full file contents" }
//   ],
//   "dependencies": [],
//   "commands": [],
//   "notes": []
// }`,
//     CODE_REVIEW: `{
//   "intent": "CODE_REVIEW",
//   "message": "Full review in Markdown. Structure it with a brief overall assessment first (1-2 sentences), then a '**Issues Found**' section listing each problem — reference specific lines or function names, explain why it's a problem, and give the concrete fix. Group by severity if there are many (Critical / Suggestions). End with anything done well, if notable."
// }`,
//     CODE_EXPLANATION: `{
//   "intent": "CODE_EXPLANATION",
//   "message": "Step-by-step Markdown explanation of what the code does. Walk through it roughly in execution order — what runs first, what triggers what, where data comes from and where it goes. Use short paragraphs or a numbered list, whichever fits the code's structure better. Assume the reader can code but has never seen this specific file."
// }`,
//     DEBUGGING: `{
//   "intent": "DEBUGGING",
//   "message": "Markdown explanation structured as: '**Root cause**' (what was actually broken and why, referencing the specific line/logic at fault), then '**Fix**' (what changed and why that resolves it), then '**How to verify**' if there's a clear way to confirm it's fixed (e.g. what to click, what output to expect).",
//   "title": "Bug fix title",
//   "description": "What was wrong and why",
//   "files": [
//     { "path": "match the original/appropriate filename and language for what was actually being fixed", "language": "match the actual language used", "content": "corrected file contents" }
//   ],
//   "dependencies": [],
//   "commands": [],
//   "notes": []
// }`,
//     OPTIMIZATION: `{
//   "intent": "OPTIMIZATION",
//   "message": "Markdown explanation structured as: '**What was slow/inefficient**' (the specific bottleneck, with rough complexity or cost if relevant), then '**What changed**' as a bullet list of concrete optimizations, then '**Tradeoffs**' if any (e.g. more memory for less compute, added complexity for speed).",
//   "title": "Optimization title",
//   "description": "Tradeoffs made",
//   "files": [
//     { "path": "match the original/appropriate filename and language for what was actually being optimized", "language": "match the actual language used", "content": "optimized file contents" }
//   ],
//   "dependencies": [],
//   "commands": [],
//   "notes": []
// }`,
//     CONVERSION: `{
//   "intent": "CONVERSION",
//   "message": "Markdown explanation covering what was converted from/to, then a '**Notes on the conversion**' section listing anything that didn't map 1:1 between the source and target (idioms, APIs, patterns) and how you handled each one.",
//   "title": "Conversion title",
//   "description": "Converted from X to Y",
//   "files": [
//     { "path": "match the target language's appropriate filename/extension", "language": "match the target language", "content": "converted file contents" }
//   ],
//   "dependencies": [],
//   "commands": [],
//   "notes": []
// }`,
//     DOCUMENTATION: `{
//   "intent": "DOCUMENTATION",
//   "message": "Brief Markdown summary (2-3 sentences) of what was documented and the convention used (JSDoc/docstrings/etc). The full documented code itself should be embedded as a fenced code block within this message so the user can see it inline."
// }`,
//   };

//   return `
// ${SHARED_CONTEXT}

// Task type: ${intent}
// ${OUTPUT_CONTRACT}

// Output JSON schema for this intent:
// ${schemas[intent]}
// ${context}
// User Request:
// ${userPrompt}
// `;
// };

// // Strips accidental code fences and grabs the outermost {...} block,
// // since models frequently ignore "no markdown" instructions.
// function sanitizeJson(raw) {
//   if (typeof raw !== "string") return null;
//   let cleaned = raw.trim();
//   cleaned = cleaned
//     .replace(/^```(?:json)?\s*/i, "")
//     .replace(/```$/i, "")
//     .trim();

//   const first = cleaned.indexOf("{");
//   const last = cleaned.lastIndexOf("}");
//   if (first === -1 || last === -1 || last < first) return null;
//   cleaned = cleaned.slice(first, last + 1);

//   try {
//     JSON.parse(cleaned); // validate only
//     return cleaned;
//   } catch {
//     return null;
//   }
// }

// export const codingAgent = async (state) => {
//   const intentLlm = getModel("intent");
//   const llm = getModel("coding");

//   const intentRes = await intentLlm.invoke(`
// You are an intent classifier. Return ONLY one of these exact values, nothing else:

// ${INTENTS.join("\n")}

// User Request:
// ${state.prompt}
// `);

//   const rawIntent = intentRes.content?.trim().toUpperCase();
//   const intent = INTENTS.includes(rawIntent) ? rawIntent : "CODE_GENERATION";

//   const prompt = buildPrompt(intent, state.prompt, state.history);
//   const result = await llm.invoke(prompt);

//   const clean = sanitizeJson(result.content);

//   if (!clean) {
//     // Model didn't return parseable JSON — fail gracefully instead of
//     // saving broken content and 500ing.
//     console.error("[codingAgent] non-JSON output from model", {
//       intent,
//       raw: result.content?.slice(0, 300),
//     });
//     return {
//       aiResponse:
//         result.content?.trim() ||
//         "Something went wrong generating a response. Please try again.",
//       routerMeta: {
//         ...(state.routerMeta ?? {}),
//         codingIntent: intent,
//         parseError: true,
//       },
//     };
//   }

//   const parsed = JSON.parse(clean);
//   return {
//     aiResponse: parsed.message,
//     artifacts: [
//       {
//         id: Date.now(),
//         type: parsed.intent,
//         files: parsed.files.map((f) => ({
//           name: f.path,
//           content: f.content,
//         })),
//       },
//     ],
//     routerMeta: {
//       ...(state.routerMeta ?? {}),
//       codingIntent: intent,
//     },
//   };
// };






// 25 july

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

The frontend already exists — Sidebar, Chat Area, and an Artifact Panel that renders generated files with live preview and copy/download. Never explain how to build these; assume they exist. The Artifact Panel's live preview renders raw HTML/CSS/JS in an iframe — it does NOT compile JSX, TSX, or any bundled/transpiled framework code. Files that can't run directly in a browser will NOT show a preview.

DEFAULT OUTPUT MODE — VANILLA HTML/CSS/JS (for CODE_GENERATION and any task producing UI code)
Unless the user explicitly names a framework (React, Vue, Next.js, etc.) or explicitly says they want a JSX/TSX/component-based structure, ALWAYS generate plain, previewable web code:
  - "index.html" — semantic markup, links to the css/js files by relative path (e.g. <link rel="stylesheet" href="style.css">, <script src="script.js" defer></script>). Do NOT inline everything into one file unless the request is trivially small (a single snippet).
  - "style.css" — modern CSS (flexbox/grid, custom properties, responsive), matching Vortex's glass-morphism light theme (bg white/70 + backdrop-blur, green accent #1E7A56, IBM Plex Mono for code/mono text, Space Grotesk for headings) when no other style is specified.
  - "script.js" — vanilla JS (ES2020+, no build step, no imports from bundlers), handles all interactivity, DOM updates, form logic, fetch calls, etc.
Use these exact filenames (index.html / style.css / script.js) so the Artifact Panel can reliably wire up the live preview. Multi-page output can add extra .html/.css/.js files, but there must always be an index.html entry point.

WHEN TO USE REACT / OTHER FRAMEWORKS INSTEAD
Only produce React (or another framework) when the user's request explicitly asks for it (mentions React, JSX, components, hooks, Vite, Next.js, a specific framework, or says something like "as a React component"). In that case:
  - Frontend: React 19, Vite, Tailwind CSS v4, React Router, Axios, Zustand (preferred over Redux unless requested), Framer Motion, HeroUI, Lucide Icons.
  - Note plainly in "notes" that this output won't render in the live preview iframe and needs to be run in a proper build environment.

BACKEND / NON-UI CODE
Node.js, Express, MongoDB + Mongoose, JWT auth, Socket.io, Redis (optional), Multer, Cloudinary.
AI: LangGraph, LangChain, OpenAI-compatible APIs.
Testing: Vitest, React Testing Library.
Deployment: Docker, Nginx, GitHub Actions.
Use TypeScript only if the user explicitly asks for it.

IMAGES

Always use real Unsplash images.

Never use placeholder.

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
  "message": "A detailed, chat-facing explanation written in Markdown. Structure it like this:\\n\\n1. Open with 1-2 sentences on what you built and why, in plain language.\\n2. A '**What's included**' section as a bullet list — one bullet per file or major piece, naming the file and its role (e.g. '- \`index.html\` — page structure and layout', '- \`style.css\` — theme, layout, responsive rules', '- \`script.js\` — form validation and interactivity').\\n3. A '**How it works**' section — 2-4 sentences walking through the logic/data flow, e.g. what happens on submit, how state moves between components, what the backend endpoint expects.\\n4. If relevant, a '**Notes**' section for setup steps, env vars needed, or things the user should know before running it. If React/another framework was used instead of the HTML/CSS/JS default (because the user explicitly asked for it), state clearly here that it requires a build step and won't render in the live preview.",
  "title": "Project or feature title",
  "description": "Short description",
  "files": [
    { "path": "index.html", "language": "html", "content": "full file contents" },
    { "path": "style.css", "language": "css", "content": "full file contents" },
    { "path": "script.js", "language": "javascript", "content": "full file contents" }
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
    { "path": "index.html", "language": "html", "content": "corrected file contents" }
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
    { "path": "index.html", "language": "html", "content": "optimized file contents" }
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
    { "path": "index.html", "language": "html", "content": "converted file contents" }
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

  const parsed = JSON.parse(clean);
  return {
    aiResponse: parsed.message,
    artifacts: [
      {
        id: Date.now(),
        type: parsed.intent,
        files: parsed.files.map((f) => ({
          name: f.path,
          content: f.content,
        })),
      },
    ],
    routerMeta: {
      ...(state.routerMeta ?? {}),
      codingIntent: intent,
    },
  };
};



