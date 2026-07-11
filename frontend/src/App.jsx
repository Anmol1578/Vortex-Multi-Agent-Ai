// import React from "react";

// import LandingPage from "./pages/login";

// function App() {
//   return (
//     <>
//       <LandingPage />
//     </>
//   );
// }

// export default App;

import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/login";
import getCurrentUser from "./features/getCurrentUser";
import Dashboard from "./pages/Dashboard";
// import Dashboard from "./pages/dashboard"; // wherever navigate("/dashboard") should go

function App() {
  useEffect(()=>{
 const getUser = async()=>{
  await getCurrentUser()
 }
 getUser()
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
