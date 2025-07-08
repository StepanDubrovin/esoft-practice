import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useState, useEffect } from "react";
import { updateUser, fetchCurrentUser } from "../store/userSlice";
import { IUpdateModal } from "../interfaces/IUpdateModal";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const EditUserModal: React.FC<IUpdateModal> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.user.currentUser);

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (currentUser) {
      setForm({
        id: currentUser.id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        password: "",
      });
    }
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      await dispatch(updateUser(form)).unwrap();
      await dispatch(fetchCurrentUser(form.id)).unwrap();
      onClose();
    } catch (err) {
      console.error("Ошибка при обновлении", err);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          width: 400,
        }}
      >
        <Typography align="center" variant="h6" mb="10px">
          Редактировать профиль
        </Typography>

        <TextField
          fullWidth
          label="Имя"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          sx={{ mb: 2 }}
          slotProps={{
            input: {
              sx: {
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
                "&.Mui-focused": {
                  color: "black",
                },
              },
            },
            inputLabel: {
              sx: {
                "&.Mui-focused": {
                  color: "black",
                },
              },
            },
          }}
        />

        <TextField
          fullWidth
          label="Фамилия"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          sx={{ mb: 2 }}
          slotProps={{
            input: {
              sx: {
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
                "&.Mui-focused": {
                  color: "black",
                },
              },
            },
            inputLabel: {
              sx: {
                "&.Mui-focused": {
                  color: "black",
                },
              },
            },
          }}
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          sx={{ mb: 2 }}
          slotProps={{
            input: {
              sx: {
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
                "&.Mui-focused": {
                  color: "black",
                },
              },
            },
            inputLabel: {
              sx: {
                "&.Mui-focused": {
                  color: "black",
                },
              },
            },
          }}
        />

        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          label="Новый пароль"
          name="password"
          value={form.password}
          onChange={handleChange}
          sx={{ mb: 2 }}
          slotProps={{
            input: {
              sx: {
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
                "&.Mui-focused": {
                  color: "black",
                },
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    aria-label="toggle password visibility"
                    size="small"
                  >
                    {showPassword ? (
                      <VisibilityOff fontSize="inherit" />
                    ) : (
                      <Visibility fontSize="inherit" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
            inputLabel: {
              sx: {
                "&.Mui-focused": {
                  color: "black",
                },
              },
            },
          }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          sx={{
              backgroundColor: "#131313",
              textTransform: 'none',
          }}
        >
          Сохранить
        </Button>
      </Box>
    </Modal>
  );
};

export default EditUserModal;
