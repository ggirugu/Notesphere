import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type InputProps<T extends FieldValues> = {
  control: Control<T>;
} & Omit<TextFieldProps, "id"> & {
    id: Path<T>;
  };

const Input = <T extends FieldValues>({ control, ...props }: InputProps<T>) => {
  return (
    <Controller
      name={props.id}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...props}
          error={Boolean(fieldState.error)}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};

export default Input;
