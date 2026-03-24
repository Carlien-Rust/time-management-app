// Template from https://mui.com/material-ui/getting-started/templates/sign-in/
/*
/src/pages/auth/RegisterPage.tsx
route: "/register"

Navigate from link on Login page
Need to validate user input
Create user and auth
Return to login page for user to enter session

Provide new users a way to register with Email + Password so they can access the app.
Acceptance Criteria
User successfully submits the "Create Account" form with Name, Email, Password, Confirm. 
New user account appears in both Firebase Console and backend system.
On success sign in redirect to /dashboard.
Error handling: Invalid credentials display human-friendly inline errors (e.g. “Password has to be 8 characters long”).
Route Protection: Attempting to access any protected route while unauthenticated redirects to /login after the auth guard resolves.
Session Persistence: The user stays logged in after page reload or browser restart.
*/

import * as React from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const set = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    return user
    // ...
  })

export default function SignUp() {

  const [email, setEmail] = React.useState<string>
  const [password, setPassword] = React.useState<string>

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    set(email, password);

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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid >
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid >
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid >
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid >
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>




            <Grid container justifyContent="flex-end">
              <Grid >
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}