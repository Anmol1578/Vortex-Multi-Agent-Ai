// import mongoose from "mongoose";

// // const fileSchema = new mongoose.Schema(
// //   {
// //     path: String,
// //     language: String,
// //     content: String,
// //   },
// //   {
// //     _id: false,
// //   }
// // );

// const fileSchema = new mongoose.Schema(
//   {
//     path: {
//       type: String,
//       required: true,
//     },
//     language: {
//       type: String,
//       default: "text",
//     },
//     content: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     _id: false,
//   }
// );

// // const artifactSchema = new mongoose.Schema(
// //   {
// //     id: Number,
// //     type: String,

// //     title: String,
// //     description: String,

// //     files: [fileSchema],

// //     dependencies: [String],
// //     commands: [String],
// //     notes: [String],
// //   },
// //   {
// //     _id: false,
// //   }
// // );


// const artifactSchema = new mongoose.Schema(
//   {
//     id: Number,

//     // Optional: "project", "snippet", etc.
//     type: {
//       type: String,
//       default: "project",
//     },

//     title: {
//       type: String,
//       default: "Code Artifact",
//     },

//     description: {
//       type: String,
//       default: "",
//     },

//     files: {
//       type: [fileSchema],
//       default: [],
//     },

//     dependencies: {
//       type: [String],
//       default: [],
//     },

//     commands: {
//       type: [String],
//       default: [],
//     },

//     notes: {
//       type: [String],
//       default: [],
//     },
//   },
//   {
//     _id: false,
//   }
// );

// const messageSchema = new mongoose.Schema(
//   {
//     conversationId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Conversation",
//     },
//     role: {
//       type: String,
//       enum: ["user", "assistant"],
//     },
//     content: String,
//     images: [String],
//     artifacts:[artifactSchema]
//   },
//   {
//     timestamps: true,
//   },
// );

// const Message = mongoose.model("Message", messageSchema);
// export default Message;



import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    path: { type: String, required: true },
    language: { type: String, default: "text" },
    content: { type: String, required: true },
  },
  { _id: false },
);

const artifactSchema = new mongoose.Schema(
  {
    id: Number,
    type: { type: String, default: "project" }, // "project", "snippet", etc.
    title: { type: String, default: "Code Artifact" },
    description: { type: String, default: "" },
    files: { type: [fileSchema], default: [] },
    dependencies: { type: [String], default: [] },
    commands: { type: [String], default: [] },
    notes: { type: [String], default: [] },
  },
  { _id: false },
);

const messageSchema = new mongoose.Schema(
  {
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
    role: { type: String, enum: ["user", "assistant"] },
    content: String,
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
    artifacts: [artifactSchema],
  },
  { timestamps: true },
);

const Message = mongoose.model("Message", messageSchema);
export default Message;