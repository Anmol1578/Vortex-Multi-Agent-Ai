import axios from "axios";
import { graph } from "../graph/graph.js";
import { addMessage } from "../config/memory.js";

export const agent = async (req, res) => {
  try {
    const { prompt, conversationId, agent: agentType } = req.body;

    if (!prompt || !conversationId) {
      return res
        .status(400)
        .json({ message: "prompt and conversationId are required" });
    }

    await axios.post(`${process.env.CHAT_SERVICE_URL}/save-message`, {
      conversationId,
      role: "user",
      content: prompt,
    });

    const result = await graph.invoke({
      prompt,
      conversationId,
      agent: agentType,
    });

    const response = result.aiResponse;

    if (!response) {
      console.error("[agent controller] agent returned no aiResponse", {
        agentType,
        routedAgent: result.agent,
        conversationId,
      });
      return res.status(500).json({ message: "agent produced no response" });
    }

    await addMessage(conversationId, "user", prompt);

    await addMessage(conversationId, "assistant", response);

    await axios.post(`${process.env.CHAT_SERVICE_URL}/save-message`, {
      conversationId,
      role: "assistant",
      content: response,
    });

    return res.status(200).json({
      content: response,
      agent: result.agent,
    });
  } catch (error) {
    console.error("[agent controller]", error);
    return res.status(500).json({ message: "agent error" });
  }
};
