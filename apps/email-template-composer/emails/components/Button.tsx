import React from 'react'
import {
  Button as REButton,
  ButtonProps as REButtonProps,
} from '@react-email/components'

interface Props extends REButtonProps {}

const Button = ({ ...reButtonProps }: Props) => (
  <REButton
    className="bg-black text-white rounded px-4 py-2"
    {...reButtonProps}
  />
)

export default Button
