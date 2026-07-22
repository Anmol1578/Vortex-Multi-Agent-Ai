import { getModel } from "../config/llmmodels.js";

const VALID_AGENTS = ["chat", "search", "coding", "pdf", "ppt", "vision"];

const AGENT_DESCRIPTIONS = `
- chat
  Use for:
  - General conversation
  - Greetings
  - Explanations
  - Brainstorming
  - Writing emails, blogs, essays, captions
  - Translation
  - Summarization (of text the user pastes directly, not a file)
  - Any request that does not fit another agent

- search
  Use for:
  - Current events
  - Latest news
  - Weather
  - Sports scores
  - Stock prices
  - Internet research
  - Any request requiring web search or up-to-date information

- coding
  Use for:
  - Programming
  - Debugging
  - Code generation
  - Code explanation
  - APIs
  - Databases
  - DevOps
  - Software architecture
  - Technical interview questions

- pdf
  Use for:
  - Reading PDF documents
  - Summarizing PDFs
  - Extracting text from PDFs
  - Answering questions about uploaded PDFs

- ppt
  Use for:
  - Creating PowerPoint presentations
  - Editing presentations
  - Designing slide decks
  - Converting notes into presentation slides

- vision
  Use for:
  - Image generation
  - Image editing
  - Image analysis
  - OCR
  - Visual question answering
`;

// Few-shot examples to disambiguate agents that commonly get confused.
const FEW_SHOT_EXAMPLES = `
Examples:

Query: "Summarize the news about the Fed's rate decision"
Reasoning: current event -> needs up-to-date info
Answer: {"agent": "search", "fallback": "chat"}

Query: "Summarize this document" (attached file: application/pdf)
Reasoning: acting on an uploaded PDF -> pdf agent, not generic summarization
Answer: {"agent": "pdf", "fallback": "chat"}

Query: "Turn my notes into a 10-slide deck about Q3 results"
Reasoning: explicit request to create a presentation
Answer: {"agent": "ppt", "fallback": "chat"}

Query: "What's in this screenshot?" (attached file: image/png)
Reasoning: visual question answering on an image
Answer: {"agent": "vision", "fallback": "chat"}

Query: "Write a Python function to reverse a linked list"
Reasoning: code generation
Answer: {"agent": "coding", "fallback": "chat"}

Query: "What's the weather in Kanpur tomorrow?"
Reasoning: requires current/live data
Answer: {"agent": "search", "fallback": "chat"}

Query: "Explain how transformers work in machine learning"
Reasoning: conceptual explanation, no code/file/live-data needed
Answer: {"agent": "chat", "fallback": "search"}
`;

const buildPrompt = (state) => {
  const attachmentHint = state.attachments?.length
    ? `\nAttached files: ${state.attachments
        .map((a) => a.type || a.name || "unknown")
        .join(", ")}`
    : "";

  const historyHint = state.history?.length
    ? `\nRecent conversation context: ${state.history
        .slice(-3)
        .map((h) => `${h.role}: ${h.content}`)
        .join(" | ")}`
    : "";

  return `
You are an intelligent AI router for a multi-agent system.

Analyze the user's latest message and decide which specialized agent should handle it.

Available agents:
${AGENT_DESCRIPTIONS}

Tie-break rule: if a request could fit more than one agent, prefer the
agent tied to the artifact being acted on (an uploaded PDF, a requested
slide deck, an image) over the agent tied to the general topic.

${FEW_SHOT_EXAMPLES}

Respond with ONLY a JSON object, no markdown fences, no explanation, in
exactly this shape:
{"agent": "<one of: ${VALID_AGENTS.join(", ")}>", "fallback": "<one of: ${VALID_AGENTS.join(", ")}>"}

The "fallback" field is your second-best guess, used only if the primary
agent cannot process the request.

User Query:
${state.prompt}${attachmentHint}${historyHint}
`;
};

// Pulls a JSON object out of a response even if wrapped in prose or
// markdown fences.
const extractJson = (text) => {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : text;
  const match = candidate.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
};

const sanitizeAgent = (value) => (VALID_AGENTS.includes(value) ? value : null);

export const router = async (state) => {


if (state.agent && state.agent !== "auto") {
  const clean = sanitizeAgent(state.agent);
  if (clean) {
    return {
      ...state,
      agent: clean,
      agentFallback: clean,
      routerMeta: { source: "explicit", routedAt: new Date().toISOString() },
    };
  }
}
  const llm = getModel("router");
  const prompt = buildPrompt(state);

  let agent = "chat";
  let fallback = "chat";
  let source = "default";

  try {
    const response = await llm.invoke(prompt);
    const raw = response?.content ?? "";
    const parsed = extractJson(raw);

    if (parsed) {
      agent = sanitizeAgent(parsed.agent) ?? "chat";
      fallback = sanitizeAgent(parsed.fallback) ?? "chat";
      source = "llm";
    } else {
      // Model ignored JSON instructions — fall back to loose text matching.
      const lower = raw.trim().toLowerCase();
      agent = VALID_AGENTS.find((a) => lower.includes(a)) ?? "chat";
      source = "llm-loose-parse";
    }
  } catch (err) {
    console.error("[router] LLM call failed, defaulting to chat:", err);
    source = "error-default";
  }

  console.log(
    `[router] query="${state.prompt?.slice(0, 80)}" -> agent=${agent} fallback=${fallback} source=${source}`,
  );

  return {
    ...state,
    agent,
    agentFallback: fallback,
    routerMeta: {
      source,
      routedAt: new Date().toISOString(),
    },
  };
};








