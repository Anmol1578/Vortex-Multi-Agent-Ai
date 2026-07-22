// import axios from "axios";

// export const getMessages = async (conversationId) => {
//   try {
//     const { data } = await axios.get(
//       `${process.env.CHAT_SERVICE_URL}/get-messages/${conversationId}`,
//     );

//     return data;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };

import axios from "axios";

export const getMessages = async (conversationId) => {
  try {
    const { data } = await axios.get(
      `${process.env.CHAT_SERVICE_URL}/get-messages/${conversationId}`,
    );

    // Defensive: always return an array shape, since callers (e.g. chat.agent.js's
    // history.forEach) assume this succeeded and never null-check the result.
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("[getMessages] failed to fetch history:", error?.response?.data ?? error.message);
    return []; // empty history is safe to continue with — null is not
  }
};
