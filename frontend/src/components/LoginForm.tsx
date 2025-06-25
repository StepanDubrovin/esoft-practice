import React from "react";
import { TextField, Button, Link, Container, Box, Typography } from "@mui/material";
import { IAuth } from "../interfaces/IAuth";
import { useAppDispatch } from "../hooks/hooks";
import { login } from "../store/userSlice";
import { useState } from "react";

export default function LoginForm ({ onSwitch } : IAuth) {
    const dispatch = useAppDispatch();
    const [error, setError] = useState(false);

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const handleClickLogin = async () => {
        try {
            await dispatch(
                login({
                    email: userEmail,
                    password: userPassword
                })
            ).unwrap();

            setUserEmail('');
            setUserPassword('');
            setError(false)
        } catch {
            setError(true);
        }
    }

    return (
        <Container maxWidth='xs' sx={{ mt: 2 }}>
            <Box 
                component='form'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }} >
                    Войти
                </Typography>
                <TextField
                    label='Email'
                    name='email'
                    type="email"
                    size="small"
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                />
                <TextField
                    label='Пароль'
                    name='password'
                    type="password"
                    size="small"
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                />
                <Button 
                    variant="outlined" 
                    type="submit" 
                    fullWidth
                    onClick={handleClickLogin}
                    sx={{ textTransform: 'none'}}
                >
                    Войти
                </Button>
                <Link component="button" onClick={onSwitch} sx={{ mt: 2 }} variant="body2">
                     Новый пользователь? Регистрация
                </Link>
            </Box>
        </Container>
    );
}
