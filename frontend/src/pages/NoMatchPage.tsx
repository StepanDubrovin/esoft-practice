import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";



const NoMatchPage = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography
                variant="h1"
            >
                404
            </Typography>
            <Typography
                variant="h3"
            >
                Страница не найдена
            </Typography>
            <Button
                variant="contained"
                sx={{
                    width: '220px',
                    height: '40px',
                    mt: '20px',
                    backgroundColor: "#131313",
                    textTransform: 'none',
                }}
                onClick={() => navigate('/')}
            >
                 Вернуться на главную
            </Button>
        </Box>
    )
}

export default NoMatchPage;