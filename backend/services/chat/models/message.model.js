// import mongoose from "mongoose";

// const fileSchema = new mongoose.Schema(
//   {
//     path: { type: String, required: true },
//     language: { type: String, default: "text" },
//     content: { type: String, required: true },
//   },
//   { _id: false },
// );

// const artifactSchema = new mongoose.Schema(
//   {
//     id: Number,
//     type: { type: String, default: "project" }, // "project", "snippet", etc.
//     title: { type: String, default: "Code Artifact" },
//     description: { type: String, default: "" },
//     files: { type: [fileSchema], default: [] },
//     dependencies: { type: [String], default: [] },
//     commands: { type: [String], default: [] },
//     notes: { type: [String], default: [] },
//   },
//   { _id: false },
// );

// const messageSchema = new mongoose.Schema(
//   {
//     conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
//     role: { type: String, enum: ["user", "assistant"] },
//     content: String,
//     images: {
//   type: [
//     {
//       url: {
//         type: String,
//         required: true,
//       },
//       description: {
//         type: String,
//         default: "",
//       },
//     },
//   ],
//   default: [],
// },
//     artifacts: [artifactSchema],
//   },
//   { timestamps: true },
// );

// const Message = mongoose.model("Message", messageSchema);
// export default Message;



import mongoose from "mongoose";

// ============================================================
// FILE SCHEMA
// ============================================================

const fileSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      default: "",
    },

    language: {
      type: String,
      default: "text",
    },

    content: {
      type: String,
      default: "",
    },

    // S3 URL
    url: {
      type: String,
      default: "",
    },
  },
  { _id: false },
);
// ============================================================
// ARTIFACT SCHEMA
// ============================================================

const artifactSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      default: "project",
    },

    title: {
      type: String,
      default: "Code Artifact",
    },

    description: {
      type: String,
      default: "",
    },

    files: {
      type: [fileSchema],
      default: [],
    },

    dependencies: {
      type: [String],
      default: [],
    },

    commands: {
      type: [String],
      default: [],
    },

    notes: {
      type: [String],
      default: [],
    },
  },
  {
    _id: false,
  },
);

// ============================================================
// MESSAGE SCHEMA
// ============================================================

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },

    role: {
      type: String,
      enum: ["user", "assistant"],
    },

    content: {
      type: String,
      default: "",
    },

    // ========================================================
    // IMAGES
    // ========================================================

    images: {
      type: [
        {
          url: {
            type: String,
            required: true,
          },

          description: {
            type: String,
            default: "",
          },
        },
      ],

      default: [],
    },

    // ========================================================
    // ARTIFACTS
    // ========================================================

    artifacts: {
      type: [artifactSchema],
      default: [],
    },
  },

  {
    timestamps: true,
  },
);

// ============================================================
// MODEL
// ============================================================

const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;
