import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, googleProvider } from "../utils/firebase";
import api from "../utils/axios";


function App() {
  const handleLogin = async (token) => {
    try {
      const data = await api.post("/auth/login", { token });
      console.log("Login response:", data);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };



  const googleLogin = async () => {
    try {
      const data = await signInWithPopup(auth, googleProvider);

      const token = await data.user.getIdToken();
      console.log("Token:", token);
      await handleLogin(token);

      console.log("Google login successful:", data);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={googleLogin}
      >
        Continue with google
      </button>
    </div>
  );
}

export default App;
