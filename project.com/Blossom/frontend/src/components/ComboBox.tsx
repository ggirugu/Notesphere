import {
  Autocomplete,
  AutocompleteProps,
  ChipTypeMap,
  TextField,
  TextFieldProps,
} from "@mui/material";
import React, { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type ComboBoxProps<
  T extends FieldValues,
  Value,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends React.ElementType = ChipTypeMap["defaultComponent"]
> = {
  control: Control<T>;
  id: Path<T>;
  label?: string;
  textFieldProps?: TextFieldProps;
} & Omit<
  AutocompleteProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>,
  "renderInput"
>;

const ComboBox = <
  T extends FieldValues,
  Value,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends React.ElementType = ChipTypeMap["defaultComponent"]
>({
  control,
  textFieldProps,
  ...props
}: ComboBoxProps<
  T,
  Value,
  Multiple,
  DisableClearable,
  FreeSolo,
  ChipComponent
>) => {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <Controller
      control={control}
      name={props.id}
      render={({ field, fieldState }) => (
        <Autocomplete
          filterSelectedOptions
          {...props}
          renderInput={(params) => (
            <TextField
              {...params}
              {...textFieldProps}
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              label={props.label}
            />
          )}
          onInputChange={(_, v) => setInputValue(v)}
          inputValue={inputValue}
          {...field}
          onChange={props.onChange}
        />
      )}
    />
  );
};

export default ComboBox;
