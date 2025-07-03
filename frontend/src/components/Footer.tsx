import {
    Box,
    Container,
    Typography,
    IconButton,
    Stack,
    Link
} from '@mui/material';
import React from 'react';
import TelegramIcon from '@mui/icons-material/Telegram';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = React.memo(() => {
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
                    <Typography variant="body2" sx={{ color: '#ffffff' }} align="center">
                        © 2025 Listings
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
});

export default Footer;
