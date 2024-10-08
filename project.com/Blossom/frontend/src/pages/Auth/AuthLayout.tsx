import { Box, Paper, Typography } from "@mui/material";
import React, { FormEvent } from "react";

type AuthLayoutProps = {
  pageTitle: string;
  children: React.ReactNode;
  submitHandler: (e: FormEvent) => unknown;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  pageTitle,
  submitHandler,
}) => {
  return (
    <Box
      display="flex"
      height="80vh"
      width="100%"
      alignItems="center"
      justifyContent="center"
      component="form"
      onSubmit={submitHandler}
    >
      <Box
        component={Paper}
        p="2rem"
        display="flex"
        flexDirection="column"
        gap="2rem"
        borderRadius="1rem"
        width="40rem"
      >
        <Typography variant="h5" textAlign="center" fontWeight={600} mb="2rem">
          {pageTitle}
        </Typography>
        {children}
      </Box>
    </Box>
  );
};

export default AuthLayout;
