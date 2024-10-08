import { LabelValueType } from "@/lib/constants";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type DropdownProps<T extends FieldValues> = {
  options: LabelValueType[];
  label?: string;
  control: Control<T>;
  id: Path<T>;
} & SelectProps;

const Dropdown = <T extends FieldValues>({
  options,
  label,
  control,
  ...props
}: DropdownProps<T>) => {
  return (
    <Controller
      name={props.id}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl
          fullWidth
          error={Boolean(fieldState.error)}
          size={props.size}
        >
          {label && <InputLabel id={props.id + "label"}>{label}</InputLabel>}
          <Select
            labelId={props.id + "label"}
            {...field}
            {...props}
            label={label}
          >
            {options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {fieldState.error && (
            <FormHelperText>{fieldState.error.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

export default Dropdown;
