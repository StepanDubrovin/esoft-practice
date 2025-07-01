import { Box, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/userSlice";
import { useAppDispatch } from "../hooks/hooks";
import { motion } from 'framer-motion';

const AccountMenu = () => {
    const MotionBox = motion(Box);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());

        navigate('/');
    };

    return (
        <MotionBox
            position='absolute'
            top='100%'
            left='0'
            bgcolor='#fff'
            border='1px solid black'
            zIndex='10'
            p={2}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
        >
            <Link
                display='block'
                onClick={() => navigate('/profile')}
                p={2}
            >
                Мой аккаунт
            </Link>
            <Link
                display="block"
                onClick={handleLogout}
                p={2}
            >
                Выход
            </Link>
        </MotionBox>
    );
};

export default AccountMenu;