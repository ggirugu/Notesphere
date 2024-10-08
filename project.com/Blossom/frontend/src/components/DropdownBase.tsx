import { LabelValueType } from "@/lib/constants";
import {
  Box,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import React from "react";

type DropdownBaseProps = {
  options: LabelValueType[];
  label?: string;
  isError?: string;
  errorMsg?: string;
} & SelectProps;

const DropdownBase: React.FC<DropdownBaseProps> = ({
  label,
  options,
  isError,
  errorMsg,
  ...props
}) => {
  return (
    <Box>
      {label && <InputLabel id={props.id + "label"}>{label}</InputLabel>}
      <Select labelId={props.id + "label"} {...props} label={label}>
        {options?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {isError && <FormHelperText>{errorMsg}</FormHelperText>}
    </Box>
  );
};

export default DropdownBase;
