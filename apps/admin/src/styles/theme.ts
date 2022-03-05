import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

//https://mui.com/components/data-grid/getting-started/#typescript
import type {} from '@mui/x-data-grid/themeAugmentation'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
})

export default theme
