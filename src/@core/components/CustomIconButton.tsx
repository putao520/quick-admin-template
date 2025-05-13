// ** React Imports
import { forwardRef } from 'react'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import ButtonBase, { type ButtonBaseProps } from '@mui/material/ButtonBase'

// 创建自定义的 IconButton 组件
const IconButtonRoot = styled(ButtonBase)(({ theme }) => ({
  flex: '0 0 auto',
  color: theme.palette.text.secondary,
  padding: 8,
  overflow: 'visible',
  fontSize: '1.5rem',
  textAlign: 'center',
  borderRadius: '50%',
  transition: theme.transitions.create('background-color', {
    duration: theme.transitions.duration.shortest
  }),
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)'
  }
}))

export interface CustomIconButtonProps extends ButtonBaseProps {
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  size?: 'small' | 'medium' | 'large'
  edge?: 'start' | 'end' | false
}

const CustomIconButton = forwardRef<HTMLButtonElement, CustomIconButtonProps>((props, ref) => {
  const { children, color = 'inherit', size = 'medium', edge = false, ...other } = props

  return (
    <IconButtonRoot
      ref={ref}
      centerRipple
      {...other}
      sx={{
        ...(color === 'inherit' && { color: 'inherit' }),
        ...(size === 'small' && { padding: 4 }),
        ...(size === 'large' && { padding: 12 }),
        ...(edge === 'start' && { marginLeft: -8 }),
        ...(edge === 'end' && { marginRight: -8 }),
        ...other.sx
      }}
    >
      {children}
    </IconButtonRoot>
  )
})

CustomIconButton.displayName = 'CustomIconButton'

export default CustomIconButton
