// Template from https://mui.com/material-ui/getting-started/templates/sign-in/
/*
/src/pages/auth/LoginPage.tsx
route: "/" or "/login"

First page when loading app
Navigate to Login page when user logs out
Need to validate user input
Check for user and auth
Nav to dashboard

A registered user can log in with email + password.
Acceptance Criteria
Create form with Email, Password.
After submit, the app redirects to /dashboard.
Redirect to  /signup if user is not in db.
currentUser in Auth Context is populated.
Error handling: Invalid credentials display human-friendly inline errors (e.g. “Incorrect password”).
Route Protection: Attempting to access any protected route while unauthenticated redirects to /login after the auth guard resolves.
Session Persistence: The user stays logged in after page reload or browser restart.
*/

import * as React from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { useNavigationManager } from "../../services/navigationManager";

const defaultTheme = createTheme();
// const { handleRegister } = useNavigationManager(); 

export default function LoginPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            >
              Sign In
            </Button>
            <Grid container>
              <Grid>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}