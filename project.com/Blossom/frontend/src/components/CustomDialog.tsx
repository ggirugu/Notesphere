import { Close } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React, { ReactNode } from "react";

export type CustomDialogBaseProps = {
  open: boolean;
  onClose: () => unknown;
};

export type CustomDialogProps = {
  title?: string;
  children: ReactNode;
  dialogActions?: ReactNode;
  isLoading?: boolean;
  hideCloseButton?: boolean;
} & CustomDialogBaseProps &
  Omit<DialogProps, "open">;

const CustomDialog: React.FC<CustomDialogProps> = ({
  children,
  dialogActions,
  isLoading,
  hideCloseButton,
  ...props
}) => {
  return (
    <Dialog {...props}>
      {props.title && (
        <DialogTitle marginRight="4rem">{props.title}</DialogTitle>
      )}
      {!hideCloseButton && (
        <Box position="absolute" top={10} right={10}>
          <IconButton onClick={props.onClose}>
            <Close />
          </IconButton>
        </Box>
      )}
      <DialogContent>
        {isLoading ? (
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress />
          </Box>
        ) : (
          children
        )}
      </DialogContent>
      {dialogActions && <DialogActions>{dialogActions}</DialogActions>}
    </Dialog>
  );
};

export default CustomDialog;
