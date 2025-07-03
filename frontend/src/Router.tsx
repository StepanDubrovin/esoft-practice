import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ListingsPage from "./pages/ListingPage";


const LazyNoMatchPage = React.lazy(
    () => import('./pages/NoMatchPage')
)

const LazyProfilePage = React.lazy(
    () => import('./pages/ProfilePage')
)

const LazyUserListingPage = React.lazy(
    () => import('./pages/UserListingPage')
)

const routes = [
    { path: '', element: <ListingsPage/>},
    { path: '*', element: <LazyNoMatchPage /> },
    { path: 'profile', element: <LazyProfilePage /> },
    { path: 'userListings', element: <LazyUserListingPage /> },
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