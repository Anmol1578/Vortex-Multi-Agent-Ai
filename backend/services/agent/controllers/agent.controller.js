// 24 AUGUST

// import axios from "axios";
// import { graph } from "../graph/graph.js";
// import { addMessage } from "../config/memory.js";
// import { deductCredits } from "../utils/deductCredits.js";

// export const agent = async (req, res) => {
//   try {
//     const {
//       prompt,
//       conversationId,
//       agent: agentType,
//     } = req.body;

//     // Added by Gateway proxyWithHeader()
//     const userId = req.headers["x-user-id"];

//     if (!prompt || !conversationId || !userId) {
//       return res.status(400).json({
//         message: "prompt, conversationId and userId are required",
//       });
//     }

//     if (!agentType) {
//       return res.status(400).json({
//         message: "agent is required",
//       });
//     }

//     /*
//      * 1. Deduct credits BEFORE running the agent.
//      */
//     let creditResult;

//     try {
//       creditResult = await deductCredits(userId, agentType);
//     } catch (error) {
//       console.error(
//         "[agent controller] credit deduction failed:",
//         error.response?.data || error.message,
//       );

//       if (error.response) {
//         return res.status(error.response.status).json({
//           message:
//             error.response.data?.message ||
//             "Unable to deduct credits",

//           credits: error.response.data?.credits,

//           requiredCredits:
//             error.response.data?.requiredCredits,
//         });
//       }

//       return res.status(500).json({
//         message: "Unable to connect to Auth Service",
//       });
//     }

//     /*
//      * 2. Save user message to memory.
//      */
//     await addMessage(
//       conversationId,
//       "user",
//       prompt,
//     );

//     /*
//      * 3. Execute LangGraph.
//      *
//      * userId is now part of the graph state.
//      */
//     const result = await graph.invoke({
//       prompt,
//       conversationId,
//       agent: agentType,
//       userId,
//     });

//     const response = result?.aiResponse;

//     if (!response) {
//       console.error(
//         "[agent controller] agent returned no aiResponse",
//         {
//           agentType,
//           routedAgent: result?.agent,
//           conversationId,
//           userId,
//         },
//       );

//       return res.status(500).json({
//         message: "agent produced no response",
//       });
//     }

//     const images = result?.images ?? [];
//     const artifacts = result?.artifacts ?? [];

//     /*
//      * 4. Save assistant response to memory.
//      */
//     await addMessage(
//       conversationId,
//       "assistant",
//       response,
//     );

//     /*
//      * 5. Save user message to Chat Service.
//      */
//     await axios.post(
//       `${process.env.CHAT_SERVICE_URL}/save-message`,
//       {
//         conversationId,
//         role: "user",
//         content: prompt,
//       },
//     );

//     /*
//      * 6. Save assistant message to Chat Service.
//      */
//     await axios.post(
//       `${process.env.CHAT_SERVICE_URL}/save-message`,
//       {
//         conversationId,
//         role: "assistant",
//         content: response,
//         images,
//         artifacts,
//       },
//     );

//     /*
//      * 7. Return response + updated credits.
//      */
//     return res.status(200).json({
//       content: response,
//       agent: result?.agent,
//       images,
//       artifacts,
//       credits: creditResult?.credits,
//       deductedCredits: creditResult?.deductedCredits,
//     });

//   } catch (error) {
//     console.error("[agent controller]", error);

//     return res.status(500).json({
//       message: "agent error",
//     });
//   }
// };

// import axios from "axios";
// import { graph } from "../graph/graph.js";
// import { addMessage } from "../config/memory.js";

// export const agent = async (req, res) => {
//   try {
//     const { prompt, conversationId, agent: agentType } = req.body;

//     // Added by Gateway proxyWithHeader()
//     const userId = req.headers["x-user-id"];

//     if (!prompt || !conversationId || !userId) {
//       return res.status(400).json({
//         message: "prompt, conversationId and userId are required",
//       });
//     }

//     if (!agentType) {
//       return res.status(400).json({
//         message: "agent is required",
//       });
//     }

//     /*
//      * 2. Save user message to memory.
//      */
//     await addMessage(conversationId, "user", prompt);

//     /*
//      * 3. Execute LangGraph.
//      *
//      * userId is now part of the graph state.
//      */
//     const result = await graph.invoke({
//       prompt,
//       conversationId,
//       agent: agentType,
//       userId,
//     });

//     const response = result?.aiResponse;

//     if (!response) {
//       console.error("[agent controller] agent returned no aiResponse", {
//         agentType,
//         routedAgent: result?.agent,
//         conversationId,
//         userId,
//       });

//       return res.status(500).json({
//         message: "agent produced no response",
//       });
//     }

//     const images = result?.images ?? [];
//     const artifacts = result?.artifacts ?? [];

//     /*
//      * 4. Save assistant response to memory.
//      */
//     await addMessage(conversationId, "assistant", response);

//     /*
//      * 5. Save user message to Chat Service.
//      */
//     await axios.post(`${process.env.CHAT_SERVICE_URL}/save-message`, {
//       conversationId,
//       role: "user",
//       content: prompt,
//     });

//     /*
//      * 6. Save assistant message to Chat Service.
//      */
//     await axios.post(`${process.env.CHAT_SERVICE_URL}/save-message`, {
//       conversationId,
//       role: "assistant",
//       content: response,
//       images,
//       artifacts,
//     });

//     /*
//      * 7. Return response + updated credits.
//      */
//     return res.status(200).json({
//       content: response,
//       agent: result?.agent,
//       images,
//       artifacts,
//       credits: result?.credits,
//       deductedCredits: result?.deductedCredits,
//     });
//   } catch (error) {
//     console.error("[agent controller]", error);

//     return res.status(500).json({
//       message: "agent error",
//     });
//   }
// };

// import axios from "axios";
// import { graph } from "../graph/graph.js";
// import { addMessage } from "../config/memory.js";

// export const agent = async (req, res) => {
//   const { prompt, conversationId, agent: agentType } = req.body;

//   const userId = req.headers["x-user-id"];

//   try {
//     if (!prompt || !conversationId || !userId) {
//       return res.status(400).json({
//         success: false,
//         code: "INVALID_REQUEST",
//         message: "prompt, conversationId and userId are required",
//       });
//     }

//     if (!agentType) {
//       return res.status(400).json({
//         success: false,
//         code: "AGENT_REQUIRED",
//         message: "agent is required",
//       });
//     }

//      /*
//      * Save user message to memory.
//      */
//     await addMessage(conversationId, "user", prompt);

//     /*
//      * Execute LangGraph.
//      */
//     const result = await graph.invoke({
//       prompt,
//       conversationId,
//       agent: agentType,
//       userId,
//     });

//     const response = result?.aiResponse;

//     if (!response) {
//       console.error("[agent controller] agent returned no aiResponse", {
//         agentType,
//         routedAgent: result?.agent,
//         conversationId,
//         userId,
//       });

//       return res.status(500).json({
//         success: false,
//         code: "NO_AGENT_RESPONSE",
//         message: "Agent produced no response.",
//       });
//     }

//     const images = result?.images ?? [];
//     const artifacts = result?.artifacts ?? [];

//     /*
//      * Save assistant response to memory.
//      */
//     await addMessage(conversationId, "assistant", response);

//     /*
//      * Save user message to Chat Service.
//      */
//     await axios.post(`${process.env.CHAT_SERVICE_URL}/save-message`, {
//       conversationId,
//       role: "user",
//       content: prompt,
//     });

//     /*
//      * Save assistant message to Chat Service.
//      */
//     await axios.post(`${process.env.CHAT_SERVICE_URL}/save-message`, {
//       conversationId,
//       role: "assistant",
//       content: response,
//       images,
//       artifacts,
//     });

//     /*
//      * Return response + credits.
//      */
//     return res.status(200).json({
//       success: true,
//       content: response,
//       agent: result?.agent,
//       images,
//       artifacts,
//       credits: result?.credits,
//       deductedCredits: result?.deductedCredits,
//     });

//   } catch (error) {
//     console.error("[agent controller]", error);

//     /*
//      * ------------------------------------------------------------
//      * INSUFFICIENT CREDITS
//      * ------------------------------------------------------------
//      */
//     if (error.code === "INSUFFICIENT_CREDITS") {
//       return res.status(402).json({
//         success: false,
//         code: "INSUFFICIENT_CREDITS",
//         message: "You don't have enough credits to use this agent.",
//         credits: error.credits,
//         requiredCredits: error.requiredCredits,
//         agent: agentType,
//       });
//     }

//     /*
//      * ------------------------------------------------------------
//      * OTHER AGENT ERRORS
//      * ------------------------------------------------------------
//      */
//     return res.status(500).json({
//       success: false,
//       code: "AGENT_ERROR",
//       message: "The agent is temporarily unavailable.",
//     });
//   }
// };

import axios from "axios";
import { graph } from "../graph/graph.js";
import { addMessage } from "../config/memory.js";
import { checkAgentLimit } from "../config/agentLimit.js";

export const agent = async (req, res, next) => {
  const { prompt, conversationId, agent: agentType } = req.body;
  const file = req.file;
  const userId = req.headers["x-user-id"];

  try {
    if (!prompt || !conversationId || !userId) {
      return res.status(400).json({
        success: false,
        code: "INVALID_REQUEST",
        message: "prompt, conversationId and userId are required",
      });
    }

    if (!agentType) {
      return res.status(400).json({
        success: false,
        code: "AGENT_REQUIRED",
        message: "agent is required",
      });
    }

    await checkAgentLimit(userId, agentType);

    await addMessage(conversationId, "user", prompt);

    const result = await graph.invoke({
      prompt,
      conversationId,
      agent: agentType,
      userId,
      file,
    });

    const response = result?.aiResponse;

    if (!response) {
      console.error("[agent controller] agent returned no aiResponse", {
        agentType,
        routedAgent: result?.agent,
        conversationId,
        userId,
      });

      return res.status(500).json({
        success: false,
        code: "NO_AGENT_RESPONSE",
        message: "Agent produced no response.",
      });
    }

    const images = result?.images ?? [];
    const artifacts = result?.artifacts ?? [];

    await addMessage(conversationId, "assistant", response);

    /*
     * Persist to Chat Service — best effort. A failure here must
     * NOT turn a successful, already-billed agent response into
     * an error for the user, so it's isolated in its own try/catch
     * rather than sharing the outer one.
     */
    try {
      await axios.post(`${process.env.CHAT_SERVICE_URL}/save-message`, {
        conversationId,
        role: "user",
        content: prompt,
      });

      await axios.post(`${process.env.CHAT_SERVICE_URL}/save-message`, {
        conversationId,
        role: "assistant",
        content: response,
        images,
        artifacts,
      });
    } catch (chatServiceError) {
      console.error("[agent controller] chat service save failed:", {
        conversationId,
        error: chatServiceError.message,
      });
      // TODO: push to a retry queue instead of silently dropping
    }

    return res.status(200).json({
      success: true,
      content: response,
      agent: result?.agent,
      images,
      artifacts,
      // credits: result?.credits,
      // deductedCredits: result?.deductedCredits,
      credits: result?.creditDeduction?.credits,
      deductedCredits: result?.creditDeduction?.deductedCredits,
    });
  } catch (error) {
    console.error("[agent controller]", error);

    if (error.status) {
      return res.status(error.status).json(error.data);
    }

    if (error.code === "INSUFFICIENT_CREDITS") {
      return res.status(402).json({
        success: false,
        code: "INSUFFICIENT_CREDITS",
        message: "You don't have enough credits to use this agent.",
        credits: error.credits,
        requiredCredits: error.requiredCredits,
        agent: agentType,
      });
    }

    return next(error);
  }
};
