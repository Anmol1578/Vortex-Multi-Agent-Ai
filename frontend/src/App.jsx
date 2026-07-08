import { signInWithPopup } from 'firebase/auth';
import React from 'react'
import { auth, googleProvider } from '../utils/firebase';

function App() {

  const handleGoogleSignIn = async () => {
    try {
      const data = await signInWithPopup(auth, googleProvider );
      const user = data.user;
      console.log("User signed in:", user);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleGoogleSignIn}>
        Continue with google
      </button>
    </div>
  )
}

export default App