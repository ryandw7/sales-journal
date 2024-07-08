import React from "react";
import {
    Route,
    BrowserRouter,
    Routes
  } from "react-router-dom";
  import Login from './pages/Login';
  import Home from "./pages/Home";
  import Register from "./pages/Register";
export default function App (){
    return (
<<<<<<< HEAD
        <h1>TESTY</h1>
=======
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
        </BrowserRouter>
>>>>>>> ba7189b (add boiler plate for client, install dependencies)
    )
}