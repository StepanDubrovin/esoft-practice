import React from "react";
import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { Container, Paper, Box } from "@mui/material";


const AuthForm: React.FC = () => {
    const [isSignUp, setSignUp] = useState(true);

    return (
      <Container maxWidth='xs' sx={{ mt: 8}}>
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: 2,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box>
            {isSignUp ? (
              <SignUpForm onSwitch={() => setSignUp(false)}/>
            ): (
              <LoginForm onSwitch={() => setSignUp(true)}/>
            )}
          </Box>

        </Paper>
      </Container>
    )
}

export default AuthForm;