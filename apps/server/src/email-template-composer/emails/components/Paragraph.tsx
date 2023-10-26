import { Text, TextProps } from '@react-email/components'
import React from 'react'

interface Props extends TextProps {
  children: React.ReactNode
}

const Paragraph = ({ children, ...textProps }: Props) => (
  <Text
    {...textProps}
    className={'text-base font-regular m-0 ' + textProps.className}
  >
    {children}
  </Text>
)

export default Paragraph
