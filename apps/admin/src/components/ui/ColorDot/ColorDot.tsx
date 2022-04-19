import React from 'react'
import { Box } from '..'

export interface ColorDotProps {
  hex?: string
}

const ColorDot = ({ hex }: ColorDotProps) => {
  return (
    <Box
      sx={{
        backgroundColor: hex,
        width: 20,
        height: 20,
        borderRadius: '100%',
        border: '1px solid',
        borderColor: 'grey.200',
      }}
    />
  )
}

export default ColorDot
