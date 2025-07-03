import { Box, Typography, Button } from "@mui/material";
import IAuthText from './../interfaces/IAuthText';
import AuthForm from "./ModalAuth";
import { useState } from "react";


const RequireAuth = ({text}: IAuthText) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose= () => setIsOpen(false);

    return (
        <Box textAlign="center">
            <Typography variant="h4">
                 Требуется авторизация
            </Typography>
            <Typography>
                 {text}
            </Typography>
            <Button 
                onClick={handleOpen}
                sx={{
                    width: '220px',
                    height: '40px',
                    mt: '20px',
                    backgroundColor: "#131313",
                    textTransform: 'none',
                    color: '#fff'
                }}
            >
                Войти / зарегистрироваться
            </Button>
            <AuthForm isOpen={isOpen} onClose={handleClose} />
        </Box>
    );
};

export default RequireAuth;