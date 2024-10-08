import { useSignUpService } from "@/api/authServices";
import Input from "@/components/Input";
import { signInUser } from "@/utils/authUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CircularProgress, Typography } from "@mui/material";
import { AxiosError } from "axios";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AuthLayout from "../AuthLayout";
import { SignUpSchemaType, signUpZodSchema } from "../typesAndData";

type SignUpPageProps = {
  vendor?: boolean;
};

const SignUpPage: React.FC<SignUpPageProps> = ({ vendor }) => {
  const { mutate, isPending } = useSignUpService();

  const { control, handleSubmit, setError } = useForm<SignUpSchemaType>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    },
    resolver: zodResolver(signUpZodSchema),
  });

  const handleSignUp = useCallback(
    (data: SignUpSchemaType, isVendor = false) => {
      mutate(
        { ...data, isVendor },
        {
          onSuccess: (d) => {
            if (isVendor) {
              signInUser(d, "/notes/home");
            } else {
              signInUser(d);
            }
          },
          onError: (e) => {
            if (e instanceof AxiosError) {
              setError("email", { message: e?.response?.data });
            }
          },
        }
      );
    },
    [mutate, setError]
  );

  return (
    <AuthLayout
      pageTitle={`Notesphere Sign Up`}
      submitHandler={handleSubmit((d) => handleSignUp(d, vendor))}
    >
      <Input
        label="Name"
        control={control}
        id="name"
        variant="standard"
        required
      />
      <Input
        label="Email"
        control={control}
        id="email"
        variant="standard"
        required
      />
      <Input
        label="Password"
        control={control}
        id="password"
        variant="standard"
        type="password"
        required
      />
      <Input
        label="Confirm Password"
        control={control}
        id="confirmPassword"
        variant="standard"
        type="password"
        required
      />
      <Button
        type="submit"
        variant="contained"
        size="large"
        color="secondary"
        disabled={isPending}
        endIcon={
          isPending && <CircularProgress size="1rem" color="secondary" />
        }
      >
        Register
      </Button>

      <Typography
        textAlign="center"
        component={Link}
        to={"/auth/notes"}
        mt="0.5rem"
        color="secondary"
      >
        Already have an account?
      </Typography>
    </AuthLayout>
  );
};

export default SignUpPage;
