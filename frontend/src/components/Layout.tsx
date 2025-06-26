import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const Layout = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            minHeight="100vh"
        >
            <Header />
            <Box component="main" flexGrow={1}>
                <Outlet />
            </Box>
            <Footer />
        </Box>
    );
};

export default Layout;
