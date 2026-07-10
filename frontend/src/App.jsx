import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, googleProvider } from "../utils/firebase";
import api from "../utils/axios";
import LandingPage from "./pages/login";

function App() {
  return (
    <>
      <LandingPage />
    </>
  );
}

export default App;
