import { useState } from "react";
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
import { registration } from "../store/userSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useValidateFields from "../hooks/useValidateFields";

export default function SignUpForm({ onSwitch, onClose}: IAuth) {
    const dispatch = useAppDispatch();
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const [touched, setTouched] = useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false
    });
    
    const { isValid: isSignupFieldsFilled, errors } = useValidateFields({
        email: userEmail, 
        password: userPassword,
        firstName: userFirstName,
        lastName: userLastName
    })

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
            onClose()
        } catch {
            setError(true);
        }
    }

    return (
        <Container maxWidth='xs' sx={{ mt: 2 }}>          
            <Box 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }} >
                    Регистрация
                </Typography>
                {error && (
                    <Typography 
                        align="center"
                        sx={{color: 'red'}}
                    >
                        Ошибка регистрации. Пожалуйста, попробуйте снова.
                    </Typography>
                )}
                <TextField
                    label='Имя'
                    name='firstName'
                    size="small"
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                    value={userFirstName}
                    onChange={(e) => setUserFirstName(e.target.value)}
                    onBlur={() => setTouched(prev => ({...prev, firstName: true}))}
                    error={errors.firstName && touched.firstName}
                    helperText={errors.firstName && touched.firstName ? 'Имя обязательно' : ''}
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
                     onBlur={() => setTouched(prev => ({...prev, firstName: true}))}
                    error={errors.firstName && touched.firstName}
                    helperText={errors.firstName && touched.firstName ? 'Фамилия обязательна' : ''}
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
                    onClick={handleClickSignUp}
                    sx={{ textTransform: 'none'}}
                    disabled={!isSignupFieldsFilled}
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
