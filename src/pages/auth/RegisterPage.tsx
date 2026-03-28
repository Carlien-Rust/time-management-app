// Template from https://mui.com/material-ui/getting-started/templates/sign-in/
/*
/src/pages/auth/RegisterPage.tsx
route: "/register"

-- Clickup ticket
Provide new users a way to register with Email + Password so they can access the app. ✅
Acceptance Criteria
User successfully submits the "Create Account" form with Name, Email, Password, Confirm. ✅
New user account appears in both Firebase Console and backend system.
On success sign in redirect to /dashboard. ✅
Error handling: Invalid credentials display human-friendly inline errors (e.g. “Password has to be 8 characters long”).
Route Protection: Attempting to access any protected route while unauthenticated redirects to /login after the auth guard resolves.
Session Persistence: The user stays logged in after page reload or browser restart. ✅ Included in firebaseConfig "setPersistence"
*/

import * as React from 'react';
import { Avatar, Button, CssBaseline, TextField, Box, Typography, Container, Alert, FormLabel, FormControl, IconButton, InputAdornment } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigationManager } from "../../services/navigationManager";
import { useAuth } from '../../services/auth_services/AuthProvider';
import { useForm } from "react-hook-form";
import {z} from "zod";
import { useState } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { zodResolver } from "@hookform/resolvers/zod";

const defaultTheme = createTheme();

const RegisterSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type RegisterInputs = z.infer<typeof RegisterSchema>;

export default function SignUp() {

  const methods = useForm<RegisterInputs>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
  });

  const { handleLogout, handleClickOverview } = useNavigationManager();
  const { register } = useAuth();

  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: RegisterInputs) => {
    setError(null);
    setLoading(true);

    try {
      await register(data.email, data.password, data.firstName, data.lastName);
      handleClickOverview(); 
    } catch (err: any) {
      setLoading(false);
      if (err.code === 'auth/email-already-in-use') {
        setError("This email is already registered.");
      } else {
        setError(err.message || "Failed to create account.");
      }
    }
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
          <Box component="form" noValidate onSubmit={methods.handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <FormControl>
              <FormLabel htmlFor="firstName">First Name</FormLabel>
              <TextField
                {...methods.register("firstName")}
                error={!!methods.formState.errors.firstName}
                helperText={methods.formState.errors.firstName ? methods.formState.errors.firstName.message : ""}
                required
                label="First Name"
                //autoComplete="given-name"
              />
            </FormControl> 
            <FormControl> 
              <FormLabel htmlFor="lastName">Last Name</FormLabel>            
              <TextField
                {...methods.register("lastName")}
                error={!!methods.formState.errors.lastName}
                helperText={methods.formState.errors.lastName ? methods.formState.errors.lastName.message : ""}
                required
                label="Last Name"
                //autoComplete="family-name"
              />
            </FormControl> 
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel> 
              <TextField
                {...methods.register("email")}
                error={!!methods.formState.errors.email}
                helperText={methods.formState.errors.email ? methods.formState.errors.email.message : ""}
                required
                label="Email Address"
                placeholder="your@email.com"
                //autoComplete="email"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>  
              <TextField
                {...methods.register("password", { pattern: /^[A-Za-z]+$/i })}
                error={!!methods.formState.errors.password}
                helperText={methods.formState.errors.password ? methods.formState.errors.password.message : ""}
                required
                type={showPassword ? "text" : "password"}
                label="password"
                placeholder="Enter your password"
                //autoComplete="current-password"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={showPassword ? "Hide password visibility" : "Show password visibility"}
                          onClick={() => setShowPassword((show) => !show)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </FormControl> 
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
             // onClick={handleClickOverview} 
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
            <Button onClick={handleLogout} fullWidth variant="text">
              Already have an account? Sign in
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

