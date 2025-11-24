// import React, { useEffect } from "react";
import './global.css';
import  SignIn  from "./Athu/Signin/Form.tsx";
import SignUp  from "./Athu/Signup/Form.tsx";
// import Card from "./Cards/Online/Person/card.tsx";
import { Routes, Route, BrowserRouter } from "react-router-dom"; 

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './Store/Slices/UserSlice.ts';
import type { AppDispatch, RootState } from './Store/Store';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUser(1));
  }, [dispatch]);

  const { user, loading, error } = useSelector((state: RootState) => state.User);

  if (loading) return <div>Loading...</div>; // need to create a loading component

  if (!error && user) {  
    console.log('User Data:', user);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn/>} />
        <Route path = "/signup" element = {<SignUp/>} />
        {/* <Route path = "online" element = {<Card children = {}> </Card>}      /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App ;
