import { 
    TextField, 
    Button, 
    Link, 
    Container, 
    Box, 
    Typography, 
    IconButton, 
    InputAdornment } 
from "@mui/material";
import { IAuth } from "../interfaces/IAuth";
import { useAppDispatch } from "../hooks/hooks";
import { login } from "../store/userSlice";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useValidateFields from "../hooks/useValidateFields";

export default function LoginForm ({ onSwitch, onClose } : IAuth) {
    const dispatch = useAppDispatch();
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const [touched, setTouched] = useState({
        email: false,
        password: false
    });

    const { isValid: isLoginFieldsFilled, errors } = useValidateFields({
        email: userEmail, 
        password: userPassword,
    })

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
            onClose()
        } catch {
            setError(true);
        }
    }

    return (
        <Container sx={{ mt: 2 }}>
            <Box 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }} >
                    Войти
                </Typography>
                {error && (
                        <Typography 
                            align="center"
                            sx={{color: 'red'}}
                        >
                            Ошибка логина. Пожалуйста, попробуйте снова.
                        </Typography>
                )}
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
                    onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                    error={errors.email && touched.email}
                    helperText={errors.email && touched.email ? 'Неверный email' : ''}
                    
                />
                <TextField
                    label='Пароль'
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    size="small"
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                    error={errors.password && touched.password}
                    helperText={errors.password && touched.password ? 'Пароль должен быть не менее 8 символов' : ''}
                    slotProps={{
                        input: {
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge='end'
                                    aria-label='toggle password visibility'
                                    size="small"
                                >
                                    {showPassword ? (
                                        <VisibilityOff fontSize="inherit"/> 
                                    ) : ( 
                                        <Visibility fontSize="inherit"/> 
                                    )}
                                </IconButton>
                            </InputAdornment>
                        )
                        }
                    }}
                />
                <Button 
                    variant="outlined" 
                    fullWidth
                    onClick={handleClickLogin}
                    sx={{ textTransform: 'none'}}
                    disabled={!isLoginFieldsFilled}
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
