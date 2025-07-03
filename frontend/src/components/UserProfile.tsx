import { Box, Typography, Paper,  Button  } from "@mui/material";
import { useAppSelector } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const handleMenu = () => {
      
      navigate('/');
    };

  return (
    <Box 
      sx={{ 
        mt: 4, 
        display: 'flex', 
        justifyContent: 'center' 
      }}
    >
      <Paper 
        sx={{ 
          p: 4, 
          width: '100%', 
          maxWidth: 400 
          }}
      >
        <Typography variant="h5" gutterBottom>
          Мой профиль
        </Typography>
        <Typography><strong>Имя:</strong> {currentUser.firstName}</Typography>
        <Typography><strong>Фамилия:</strong> {currentUser.lastName}</Typography>
        <Typography><strong>Email:</strong> {currentUser.email}</Typography>
      </Paper>
      <Button onClick={handleMenu}>
        /
      </Button>
    </Box>
  );
};

export default UserProfile;
