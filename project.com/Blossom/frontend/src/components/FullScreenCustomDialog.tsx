import { Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import CustomDialog, { CustomDialogProps } from "./CustomDialog";

type FullScreenCustomDialogProps = CustomDialogProps;

const FullScreenCustomDialog: React.FC<FullScreenCustomDialogProps> = (
  props
) => {
  return (
    <CustomDialog {...props} fullScreen TransitionComponent={Transition}>
      {props.children}
    </CustomDialog>
  );
};

export default FullScreenCustomDialog;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
