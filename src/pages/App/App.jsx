import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import userService from "../../utils/userService";
import HomePage from "../HomePage/HomePage";
// import { Helmet } from 'react-helmet'


function App() {
  const [user, setUser] = useState(userService.getUser()); // getUser decodes our JWT token, into a javascript object
  // this object corresponds to the jwt payload which is defined in the server signup or login function that looks like
  // this  const token = createJWT(user); // where user was the document we created from mongo
  

  function handleSignUp() {
    setUser(userService.getUser());
    // userService.createHistory(user.id);
  }



  function handleLogin() {
    setUser(userService.getUser()); // getting the user from localstorage decoding the jwt
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
  }


  useEffect(() => {
    document.title = "PlayerCount Tracker"
}, []);




  if (user) {
    
    return (
      <Routes>
        <Route path="/" element={<HomePage user={user} handleLogout={handleLogout} />} />
        <Route
          path="/login"
          element={<LoginPage handleLogin={handleLogin} />}
        />
        <Route
          path="/signup"
          element={<SignupPage handleSignUp={handleSignUp} />}
        />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage handleLogin={handleLogin} />}
      />
      <Route
        path="/signup"
        element={<SignupPage handleSignUp={handleSignUp} />}
      />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
