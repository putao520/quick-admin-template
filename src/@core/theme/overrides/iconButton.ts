// ** MUI Imports

import type { IconButtonProps } from '@mui/material/IconButton'
import type { Theme } from '@mui/material/styles'
import type { CSSInterpolation } from '@mui/system'

const IconButton = (theme: Theme) => {
  return {
    MuiIconButton: {
      defaultProps: {
        color: 'inherit',
      },
      styleOverrides: {
        root: ({
          ownerState,
        }: {
          ownerState: {
            color?: IconButtonProps['color']
          }
        }): CSSInterpolation => {
          const isInherit = !ownerState.color || ownerState.color === 'inherit'

          return {
            ...(isInherit && {
              color: theme.palette.text.secondary,
            }),
          }
        },
      },
    },
  }
}

export default IconButton
