
import React from "react";
import './global.css';
import  SignIn  from "./Athu/Signin/Form.tsx";
import { Routes, Route, BrowserRouter } from "react-router-dom"; 


function App() {
  return (
    <BrowserRouter>
    
    <Routes>

      <Route path="/" element={<SignIn/>} />
      
    </Routes>
    
    </BrowserRouter>
  );
}

export default App ;
