import React from "react";
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import Home from "../Screens/Home";

export const Router = () => {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}