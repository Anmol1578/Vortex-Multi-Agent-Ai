import { getModel } from "../config/llmmodels.js";

export const chatAgent = async (state) => {
  const llm = await getModel("chat");
  const systemPrompt = "You are VortexAI, a specialized intelligence AI assistant.";

  const response = await llm.invoke([
    { role: "system", content: systemPrompt },
    { role: "user", content: state.prompt },
  ]);

  return {
    ...state,
    aiResponse: response.content,
  };
};