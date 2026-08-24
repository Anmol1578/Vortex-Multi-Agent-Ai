// import axios from "axios";
// import { graph } from "../graph/graph.js";
// import { addMessage } from "../config/memory.js";

// export const agent = async (req, res) => {
//   try {
//     const { prompt, conversationId, agent: agentType } = req.body;

//     if (!prompt || !conversationId) {
//       return res
//         .status(400)
//         .json({ message: "prompt and conversationId are required" });
//     }

//     // Persist the user message to the memory store FIRST so the graph
//     // has access to it as context when it runs.
//     await addMessage(conversationId, "user", prompt);

//     const result = await graph.invoke({
//       prompt,
//       conversationId,
//       agent: agentType,
//     });

//     const response = result?.aiResponse;

//     if (!response) {
//       console.error("[agent controller] agent returned no aiResponse", {
//         agentType,
//         routedAgent: result?.agent,
//         conversationId,
//       });
//       return res.status(500).json({ message: "agent produced no response" });
//     }

//     const images = result?.images ?? [];

//     // Persist the assistant reply to memory.
//     await addMessage(conversationId, "assistant", response);

//     // Single source of truth for durable chat history (DB via chat service).
//     // Save both messages here instead of duplicating writes across two stores.
//     await axios.post(`${process.env.CHAT_SERVICE_URL}/save-message`, {
//       conversationId,
//       role: "user",
//       content: prompt,
//     });

//     await axios.post(`${process.env.CHAT_SERVICE_URL}/save-message`, {
//       conversationId,
//       role: "assistant",
//       content: response,
//       images, artifacts:result?.artifacts
//     });

//     return res.status(200).json({
//       content: response,
//       agent: result?.agent,
//       images,
//         artifacts: result?.artifacts ?? [],
//     });
//   } catch (error) {
//     console.error("[agent controller]", error);
//     return res.status(500).json({ message: "agent error" });
//   }
// };

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


import axios from "axios";
import { graph } from "../graph/graph.js";
import { addMessage } from "../config/memory.js";

export const agent = async (req, res) => {
  const { prompt, conversationId, agent: agentType } = req.body;

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


     /*
     * Save user message to memory.
     */
    await addMessage(conversationId, "user", prompt);


    /*
     * Execute LangGraph.
     */
    const result = await graph.invoke({
      prompt,
      conversationId,
      agent: agentType,
      userId,
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

    /*
     * Save assistant response to memory.
     */
    await addMessage(conversationId, "assistant", response);

    /*
     * Save user message to Chat Service.
     */
    await axios.post(`${process.env.CHAT_SERVICE_URL}/save-message`, {
      conversationId,
      role: "user",
      content: prompt,
    });

    /*
     * Save assistant message to Chat Service.
     */
    await axios.post(`${process.env.CHAT_SERVICE_URL}/save-message`, {
      conversationId,
      role: "assistant",
      content: response,
      images,
      artifacts,
    });

    /*
     * Return response + credits.
     */
    return res.status(200).json({
      success: true,
      content: response,
      agent: result?.agent,
      images,
      artifacts,
      credits: result?.credits,
      deductedCredits: result?.deductedCredits,
    });

  } catch (error) {
    console.error("[agent controller]", error);

    /*
     * ------------------------------------------------------------
     * INSUFFICIENT CREDITS
     * ------------------------------------------------------------
     */
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

    /*
     * ------------------------------------------------------------
     * OTHER AGENT ERRORS
     * ------------------------------------------------------------
     */
    return res.status(500).json({
      success: false,
      code: "AGENT_ERROR",
      message: "The agent is temporarily unavailable.",
    });
  }
};
