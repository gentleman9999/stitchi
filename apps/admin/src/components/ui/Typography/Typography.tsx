import React from 'react'
import {
  Typography as MuiTypography,
  TypographyProps as MuiTypographyProps,
} from '@mui/material'

export type TypographyProps<C extends React.ElementType> = MuiTypographyProps<
  C,
  { component?: C }
> & {}

const Typography = <C extends React.ElementType>(props: TypographyProps<C>) => (
  <MuiTypography {...props} />
)

export default Typography
