import React from "react";
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import Home from "../Screens/Home";
import Login from "../Screens/Login";
import SignUp from "../Screens/SignUp";

export const Router = () => {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/home' element={<Home />} />
                    <Route path='/SignIn' element={<Login />} />
                    <Route path='/SignUp' element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}