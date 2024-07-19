import React from "react";
import {
    Route,
    BrowserRouter,
    Routes
  } from "react-router-dom";
  import Login from '../pages/login/Login.js';
  import Home from "../pages/Home.js";
  import Register from "../pages/register/Register.js";
  import Test from '../components/Test.js'
export default function App (){
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
        </BrowserRouter>
    )
}