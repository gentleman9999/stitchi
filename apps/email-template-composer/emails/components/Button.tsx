import React from 'react'
import {
  Button as REButton,
  ButtonProps as REButtonProps,
} from '@react-email/components'

interface Props extends REButtonProps {}

const Button = ({ ...reButtonProps }: Props) => (
  <REButton
    {...reButtonProps}
    className="bg-primary text-black rounded px-8 py-4 text-sm font-semibold tracking-tight"
  />
)

export default Button
