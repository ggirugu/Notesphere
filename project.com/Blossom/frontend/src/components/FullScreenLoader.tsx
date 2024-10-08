import { Backdrop, CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";

type FullScreenLoaderProps = {
  isLoading: boolean;
  label?: string;
};

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({
  isLoading,
  label,
}) => {
  if (!isLoading) return null;

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open
    >
      <Stack gap="0.5rem" alignItems="center">
        <CircularProgress color="inherit" />
        {label && <Typography>{label}</Typography>}
      </Stack>
    </Backdrop>
  );
};

export default FullScreenLoader;
