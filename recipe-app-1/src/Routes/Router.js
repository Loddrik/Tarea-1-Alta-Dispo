import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from "../Screens/Home";
import Login from "../Screens/Login";
import SignUp from "../Screens/SignUp";

export const Router = () => {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate replace to="/home" />}></Route>
                    <Route path='/home' element={<Home />} />
                    <Route path='/SignIn' element={<Login />} />
                    <Route path='/SignUp' element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}