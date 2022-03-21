import { createTheme, useTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

//https://mui.com/components/data-grid/getting-started/#typescript
import type {} from '@mui/x-data-grid/themeAugmentation'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#a3e635',
    },
    secondary: {
      main: '#0f172a',
    },
    error: {
      main: red.A400,
    },
  },
})

export default theme

export { useTheme }
