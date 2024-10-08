import { useLoginService } from "@/api/authServices";
import Input from "@/components/Input";
import { signInUser } from "@/utils/authUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CircularProgress, Typography } from "@mui/material";
import { AxiosError } from "axios";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AuthLayout from "../AuthLayout";
import { SignInSchemaType, signInZodSchema } from "../typesAndData";

type SignInPageProps = {
  vendor?: boolean;
};

const SignInPage: React.FC<SignInPageProps> = ({ vendor }) => {
  const { mutate, isPending } = useLoginService();
  const { control, handleSubmit, setError } = useForm<SignInSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInZodSchema),
  });

  const handleLogin = useCallback(
    (data: SignInSchemaType) => {
      mutate(
        { ...data, isVendor: vendor },
        {
          onSuccess: (d) => {
            signInUser(d, "/notes/home");
          },
          onError: (e) => {
            if (e instanceof AxiosError) {
              setError("email", { message: e?.response?.data });
            }
          },
        }
      );
    },
    [mutate, setError, vendor]
  );

  return (
    <AuthLayout
      pageTitle={`Notesphere Sign In`}
      submitHandler={handleSubmit(handleLogin)}
    >
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
        Login
      </Button>

      <Typography
        textAlign="center"
        component={Link}
        to={vendor ? "/auth/notes/sign-up" : "/auth/customer/sign-up"}
        mt="0.5rem"
        color="secondary"
      >
        Don't have an account?
      </Typography>
    </AuthLayout>
  );
};

export default SignInPage;
