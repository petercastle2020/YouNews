import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

import { useTheme } from "@mui/material/styles";

// MUI
import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Box,
  Link,
  TextField,
  Typography,
  Alert,
  AlertTitle,
} from "@mui/material";

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        You News
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup, error, isLoading } = useSignup();
  const theme = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password, confirmPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirm-password"
            label="Confirm-password"
            type="password"
            id="confirm-password"
            autoComplete="confirm-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                href="#"
                variant="body2"
                color={theme.palette.link.main}
                sx={{ paddingRight: "1rem" }}
              >
                {"Forgot password? "}
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="/signup"
                variant="body2"
                color={theme.palette.link.main}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {error && (
        <Alert severity="error" sx={{ marginTop: "1rem" }}>
          <AlertTitle>Error</AlertTitle>
          <strong>{error}</strong>
        </Alert>
      )}
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default Signup;
