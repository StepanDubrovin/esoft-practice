import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface AuthModal {
  isOpen: boolean;
  onClose: () => void;
}

const AuthForm: React.FC<AuthModal> = ({ isOpen, onClose }) => {
  const [isSignUp, setSignUp] = useState(true);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      sx={{
        boxShadow: "none",
        borderRadius: 2, 
      }}
    >
      <DialogContent
        sx={{
          position: "relative",
          p: 3,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <DialogTitle sx={{ p: 0 }}>
          {isSignUp ? (
            <SignUpForm onSwitch={() => setSignUp(false)} onClose={onClose} />
          ) : (
            <LoginForm onSwitch={() => setSignUp(true)} onClose={onClose} />
          )}
        </DialogTitle>
      </DialogContent>
    </Dialog>
  );
};

export default AuthForm;
