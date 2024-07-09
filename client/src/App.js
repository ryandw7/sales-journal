import React from "react";
import {
    Route,
    BrowserRouter,
    Routes
  } from "react-router-dom";
  import Login from './pages/Login';
  import Home from "./pages/Home";
  import Register from "./pages/Register.js";
export default function App (){
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
        </BrowserRouter>
    )
}