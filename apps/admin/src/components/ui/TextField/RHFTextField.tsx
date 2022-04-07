import React from 'react'
import {
  FieldValues,
  useController,
  UseControllerProps,
  FieldPath,
} from 'react-hook-form'
import TextField, { TextFieldProps } from './TextField'

export interface RHFTextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName> {
  label?: TextFieldProps['label']
  placeholder?: TextFieldProps['placeholder']
  fullWidth?: TextFieldProps['fullWidth']
  minRows?: TextFieldProps['minRows']
  size?: TextFieldProps['size']
}

const RHFTextField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  fullWidth = true,
  size = 'medium',
  ...props
}: RHFTextFieldProps<TFieldValues, TName>) => {
  const {
    field: { onChange, onBlur, name, value, ref },
    fieldState: { error },
  } = useController(props)

  return (
    <TextField
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      name={name}
      inputRef={ref}
      error={Boolean(error?.message)}
      helperText={error?.message}
      label={props.label}
      placeholder={props.placeholder}
      minRows={props.minRows}
      multiline={Boolean(props.minRows || 0 > 1)}
      fullWidth={fullWidth}
      size={size}
    />
  )
}

export default RHFTextField
