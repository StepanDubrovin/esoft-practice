import { useState } from "react";
import { Box, Typography, Button, Avatar } from "@mui/material";
import { useAppSelector } from "../hooks/hooks";
import EditUserModal from "./EditUser";

const UserProfile = () => {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const [editOpen, setEditOpen] = useState(false);

  const handleOpen = () => setEditOpen(true);
  const handleClose = () => setEditOpen(false);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        p: 4,
        width: '100%',
        maxWidth: 700,
      }}
    >
      <Avatar sx={{ width: '200px', height: '200px', fontSize: 60 }}>
        {currentUser?.firstName?.[0]}
      </Avatar>
      <Box>
        <Typography variant="h4" gutterBottom>
          Мой профиль
        </Typography>

        <Typography variant="h6"><strong>Имя: </strong>{currentUser?.firstName}</Typography>
        <Typography variant="h6"><strong>Фамилия: </strong>{currentUser?.lastName}</Typography>
        <Typography variant="h6"><strong>Email: </strong>{currentUser?.email}</Typography>

        <Button
          sx={{
            height: '40px',
            mt: '10px',
            backgroundColor: "#131313",
            textTransform: 'none',
            color: '#fff'
          }}
          onClick={handleOpen}
        >
          Редактировать
        </Button>
      </Box>

      <EditUserModal open={editOpen} onClose={handleClose} />
    </Box>
  );
};

export default UserProfile;
