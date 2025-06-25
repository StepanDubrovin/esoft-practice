import React, { useState } from "react";
import { TextField, Button, Link, Container, Box, Typography } from "@mui/material";
import { IAuth } from "../../interfaces/IAuth";
import { useAppDispatch } from "../../hooks/hooks";
import { registration } from "../../store/userSlice";

export default function SignUpForm({ onSwitch }: IAuth) {
    const dispatch = useAppDispatch();
    const [error, setError] = useState(false);

    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    
    const handleClickSignUp = async () => {
        try {
            await dispatch(
                registration({
                    firstName: userFirstName,
                    lastName: userLastName,
                    email: userEmail,
                    password: userPassword,
                })
            ).unwrap();

            setUserFirstName('');
            setUserLastName('');
            setUserEmail('');
            setUserPassword('');
            setError(false);
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
                    Регистрация
                </Typography>
                <TextField
                    label='Имя'
                    name='firstName'
                    size="small"
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                    value={userFirstName}
                    onChange={(e) => setUserFirstName(e.target.value)}
                />
                <TextField
                    label='Фамилия'
                    name='lastName'
                    size="small"
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                    value={userLastName}
                    onChange={(e) => setUserLastName(e.target.value)}
                />
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
                    onClick={handleClickSignUp}
                    sx={{ textTransform: 'none'}}
                >
                    Зарегистрироваться
                </Button>
                <Link component="button" onClick={onSwitch} sx={{ mt: 2 }} variant="body2">
                    Уже есть аккаунт? Войти
                </Link>
            </Box>
        </Container>
    );
}
