// import React from "react";
// import api from "../../utils/axios";

// async function sendMessage(payload) {
//   try {
//     const { data } = await api.post("/api/agent/chat", payload);
//     return data;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }

// export default sendMessage;

import api from "../../utils/axios";

async function sendMessage(payload) {
  const { data } = await api.post("/api/agent/chat", payload);
  return data;
}

export default sendMessage;
