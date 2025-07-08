import {
    Box,
    Container,
    IconButton,
    Stack,
    Link,
    Button
} from '@mui/material';
import React from 'react';
import TelegramIcon from '@mui/icons-material/Telegram';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useNavigate } from 'react-router-dom';


const Footer = React.memo(() => {

    const navigate = useNavigate();
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                backgroundColor: '#131313'
            }}
        >
            <Container maxWidth="lg">
                <Stack direction="column" alignItems="center" spacing={1}>
                    <Stack direction="row" spacing={2}>
                        <Link href="https://github.com/StepanDubrovin" color="inherit">
                            <IconButton aria-label="GitHub" sx={{ color: '#ffffff' }}>
                                <GitHubIcon fontSize="medium" />
                            </IconButton>
                        </Link>
                        <Link href="https://t.me/Kulich_21" color="inherit">
                            <IconButton aria-label="Telegram" sx={{ color: '#ffffff' }}>
                                <TelegramIcon fontSize="medium" />
                            </IconButton>
                        </Link>
                    </Stack>
                    <Button sx={{
                        textTransform: 'none',
                        color: '#fff',
                        backgroundColor: 'inherit'
                        }}
                        onClick={() => navigate('/')}
                    >
                        Главная
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
});

export default Footer;
