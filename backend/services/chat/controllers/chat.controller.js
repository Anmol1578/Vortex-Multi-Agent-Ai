import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const createConversation = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];

    console.log("Creating conversation for:", userId);

    const conversation = await Conversation.create({
      userId,
    });

    console.log("Created:", conversation);

    return res.status(200).json(conversation);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getConversations = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    console.log("userId", userId);
    const conversations = await Conversation.find({
      userId: userId,
    }).sort({ updatedAt: -1 });
    return res.status(200).json(conversations);
  } catch (error) {
    return res.status(500).json({ message: `get conversation error ${error}` });
  }
};

export const updateConversation = async (req, res) => {
  try {
    const { id, title } = req.body;
    const conversation = await Conversation.findByIdAndUpdate(id, {
      title,
    });
    return res.status(200).json(conversation);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `update conversation error ${error}` });
  }
};

// export const saveMessage = async (req, res) => {
//   try {
//     const { conversationId, role, content , images, artifacts } = req.body;
//     const message = await Message.create({
//       conversationId,
//       content,
//       role,
//       images,
//       artifacts
//     });
//     return res.status(200).json(message);
//   } catch (error) {
//     return res.status(500).json({ message: `save message  error ${error}` });
//   }
// };

export const saveMessage = async (req, res) => {
  try {
    const {
      conversationId,
      role,
      content,
      images = [],
      artifacts = [],
    } = req.body;

    // Normalize artifacts so old and new formats both work
    const normalizedArtifacts = artifacts.map((artifact) => ({
      id: artifact.id,
      type: artifact.type || "project",
      title: artifact.title || "Code Artifact",
      description: artifact.description || "",
      dependencies: artifact.dependencies || [],
      commands: artifact.commands || [],
      notes: artifact.notes || [],

      files: (artifact.files || []).map((file) => ({
        // Support both `path` and old `name`
        path: file.path || file.name,

        // Guess language if missing
        language:
          file.language ||
          (() => {
            const filename = file.path || file.name || "";
            const ext = filename.split(".").pop()?.toLowerCase();

            const map = {
              js: "javascript",
              jsx: "jsx",
              ts: "typescript",
              tsx: "tsx",
              py: "python",
              html: "markup",
              css: "css",
              json: "json",
              md: "markdown",
              sh: "bash",
            };

            return map[ext] || "text";
          })(),

        content: file.content || "",
      })),
    }));

    const message = await Message.create({
      conversationId,
      role,
      content,
      images,
      artifacts: normalizedArtifacts,
    });

    await Conversation.findByIdAndUpdate(conversationId, {
      updatedAt: new Date(),
    });

    return res.status(200).json(message);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: `save message error: ${error.message}`,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    }).sort({ createdAt: 1 });
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: `get messages  error ${error}` });
  }
};
