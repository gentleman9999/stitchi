import React from 'react'
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  ButtonTypeMap,
} from '@mui/material'

export type ButtonProps<
  C extends React.ElementType = ButtonTypeMap['defaultComponent'],
> = MuiButtonProps<C, { component?: C }> & {
}

const Button: React.ForwardRefExoticComponent<ButtonProps<React.ElementType>> =
  React.forwardRef((props, ref) => {
    const { loading, component = 'button', testId, ...rest } = props

    return (
      <MuiButton
        {...rest}
        ref={ref}
        component={component}
        disabled={props.disabled || loading}
        disableElevation={true}
        data-testid={testId}
      >
        {props.children}
      </MuiButton>
    )
  })

Button.displayName = 'Button'

export default Button
