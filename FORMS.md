# FORMS

```
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { FormLabel, FormControl } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { zodResolver } from "@hookform/resolvers/zod";

// OUTSIDE FUNCTION OR from .schema and .types in models
const Schema = z.object({
  [INPUT + VALIDATION]
});

type Inputs = z.infer<typeof Schema>;

// INSIDE FUNCTION
const methods = useForm<Inputs>({
    resolver: zodResolver(Schema),
    mode: "onChange",
  });

    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input {...register("firstName", { required: true })} />
      <input {...register("lastName", { required: true })} />
      <input {...register("email", { required: true })} />
      <input {...register("password", { required: true })} />
      <input type="submit" />
    </form>

OR

    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
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

```
# IDs

- Fetch from state/store/BE

  // userId
    import { useUserStore } from "../store/user/UserStore";

    const user = useUserStore((state) => state.user);
    const userId = user?.id
    console.log("[File] userId:", userId);
 // projectId
    const params = useParams({ strict: false }); 
    const { id } = params; // from URL - projectId