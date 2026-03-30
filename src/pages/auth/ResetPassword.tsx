// Template from 
/*
/src/pages/auth/RegisterPage.tsx
route: "/reset"

Navigate from option in header dropdown menu ✅
Need to validate user input ✅
SAVE button ✅
Re-auth and update password ✅
Success message ✅

Reuse for Forget Password

-- Clickup ticket
Add “Forgot password?” link on login page that triggers sendPasswordResetEmail.
Email delivered.
Toast says “Reset link sent”.
*/

import * as React from 'react';
import { Avatar, Button, CssBaseline, TextField, Box, Typography, Container, Alert, FormControl } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigationManager } from "../../services/navigationManager";
import { useAuth } from '../../services/auth_services/AuthProvider';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const ResetSchema = z.object({
  newPass: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPass: z.string().min(8, "Password must be at least 8 characters long")
}).refine((data) => data.newPass === data.confirmPass, {
  message: "Passwords do not match",
  path: ["confirmPass"], // error will show on the confirmPass field
});

type ResetInput = z.infer<typeof ResetSchema>;

export default function ResetPassword() {

  const { handleLogout } = useNavigationManager();
  const { resetPass } = useAuth();

  const methods = useForm<ResetInput>({
      resolver: zodResolver(ResetSchema),
      mode: "onChange",
    });
  
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data: ResetInput) => {
    setLoading(true);
    setError(null);

    try {
      setLoading(true);
      await resetPass(data.newPass); // Updates the actual Firebase Auth record
      setSuccess(true);
      setTimeout(() => handleLogout(), 2000); // Log them out to sign in with new credentials
    } catch (error: any) {
      setLoading(false);
      setError(error.message || "Failed to update password.");
    }
  };

  return (
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
          Reset Password
        </Typography>
        <Box component="form" onSubmit={methods.handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success">Password updated! Logging out...</Alert>}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              {...methods.register("newPass")}
              error={!!methods.formState.errors.newPass}
              helperText={methods.formState.errors.newPass?.message}
              margin="normal"
              required
              fullWidth
              name="newPass"
              label="New Password"
              type="password"
              id="new-password"
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              {...methods.register("confirmPass")}
              error={!!methods.formState.errors.confirmPass}
              helperText={methods.formState.errors.confirmPass?.message}
              margin="normal"
              required
              fullWidth
              name="confirmPass"
              label="Confirm new password"
              type="password"
              id="confirm-password"
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
          <Button
            type="button"
            fullWidth
            variant="contained"
            disabled={loading}
            onClick={handleLogout}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Container>
  );
}