import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ListingsPage from "./pages/ListingPage";


const routes = [
    { path: '', element: <ListingsPage/>},

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