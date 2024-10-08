import { TextFieldProps } from "@mui/material";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type CustomDatePickerProps<T extends FieldValues> = {
  control: Control<T>;
  id: Path<T>;
  textFieldProps: TextFieldProps;
} & DatePickerProps<Dayjs>;

const CustomDatePicker = <T extends FieldValues>({
  control,
  id,
  textFieldProps,
  ...props
}: CustomDatePickerProps<T>) => {
  return (
    <Controller
      name={id}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <DatePicker
            {...props}
            {...field}
            slotProps={{
              textField: {
                error: Boolean(fieldState.error),
                helperText: fieldState.error?.message,
                fullWidth: true,
                ...textFieldProps,
              },
            }}
          />
        );
      }}
    />
  );
};

export default CustomDatePicker;
