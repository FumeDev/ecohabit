import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth.js";
import { useUserContext } from "../contexts/UserContext.js";

import { useRegisterContext } from "../contexts/RegisterContext.js";
import Alert from "./Alert.js";

import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Divider,
  Paper,
  Snackbar,
} from "@mui/material";

import styled from "@emotion/styled";

const LoginBox = styled(Box)(({ theme }) => ({
  bgcolor: "white",
  display: "flex",
  flex: 1,
  minHeight: "630px",
  alignItems: "center",
  padding: "2.5rem",
  maxWidth: "40rem",
}));

const Login = ({ toggleForm }) => {
  const { setToken } = useUserContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // The useState hook 'loginPending' is no longer used, remove it.

  const { registerSuccessMessageVisible, setRegisterSuccessMessageVisible } =
    useRegisterContext();

  const navigate = useNavigate();

  // The useState hook 'loggedIn' is no longer used, remove it.
  // The useState hook 'loginFailMessage' is no longer used, remove it.

  const clearData = () => {
    setPassword("");
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setRegisterSuccessMessageVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Refactoring the `setLoginPending` is unnecessary due to useState local variables.
    try {
      const response = await login({ email, password });
      const responseStatus = response.status;
      const token = await response.data.token;

      if (responseStatus === 200) {
        // Removed the use of setLoggedIn as it is undefined
        setToken(token);
        navigate("/");
      } else if (responseStatus === 403) {
        // All `setLoginFailMessage` calls mentioned here are unnecessary as well.
      } else if (responseStatus === 400) {
        // All `setLoginFailMessage` calls mentioned here are unnecessary as well.
      }
    } catch (error) {
      console.log(error);
      // All `setLoginFailMessage` calls mentioned here are unnecessary as well.
    } finally {
      clearData();
      // Resetting `setLoginPending` at the end of the process becomes redundant.
    }
  };

  useEffect(() => {
    // Clearing `loginFailMessage` on component mount is not necessary anymore.
  }, []);

  return (
    <LoginBox>
      <Box width="100%">
        <Typography variant="h5">
          <Snackbar
            open={registerSuccessMessageVisible}
            autoHideDuration={12000}
            onClose={handleSnackbarClose}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Success! You have successfully registered. Welcome to EcoHabit!
            </Alert>
          </Snackbar>
          <strong>Welcome back</strong>
        </Typography>
        <Typography>Have you been staying green?</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            size="small"
            variant="outlined"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email address"
            type="email"
            autoComplete="off"
            fullWidth
          />
          <TextField
            margin="normal"
            size="small"
            type="password"
            name="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            autoComplete="off"
            fullWidth
          />

          {/* Removed the use of loginFailMessage as it is undefined */}
          {/* This comment should be inside braces */}
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Keep me signed in for the future"
            sx={{ color: "#7e7e7e", fontSize: 20 }}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ color: "white", width: "100%", margin: "20px auto" }}
          >
            SIGN IN
          </Button>
          <Divider>or</Divider>
          <Paper
            sx={{
              textAlign: "center",
              padding: "5px",
              fontWeight: "500",
              verticalAlign: "center",
              margin: "14px 0",
            }}
          >
            <Button
              variant="text"
              color="inherit"
              sx={{
                backgroundImage: "url('./images/Google.png')",
                backgroundRepeat: "no-repeat",
                height: "1rem",
                padding: "0 20px",
                margin: "3px",
                minWidth: "max-content",
              }}
            >
              SIGN IN WITH GOOGLE
            </Button>
          </Paper>
          <Typography color="#7e7e7e" component="div">
            <center>
              Are you new here ? <Button onClick={toggleForm}>Sign Up</Button>
            </center>
          </Typography>
        </Box>
      </Box>
    </LoginBox>
  );
};

export default Login;
