// ** MUI Imports
import { type Theme } from '@mui/material/styles'

const IconButton = (theme: Theme) => {
  return {
    MuiIconButton: {
      defaultProps: {
        color: 'inherit'
      },
      styleOverrides: {
        root: {
          '&:not([color])': {
            color: theme.palette.text.secondary
          }
        }
      }
    }
  }
}

export default IconButton
