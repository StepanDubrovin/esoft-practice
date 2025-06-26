import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthorizationPage from "./pages/AuthorizationPage";
import Layout from "./components/Layout";


const routes = [
    { path: '', element: <AuthorizationPage/>}
];

export const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={route.element}
                    >

                    </Route>
                ))}
            </Route>
        </Routes>
    </BrowserRouter>
)