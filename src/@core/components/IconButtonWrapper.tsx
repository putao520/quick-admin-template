// ** React Imports
import { forwardRef } from 'react'

// ** MUI Imports
import IconButton, { type IconButtonProps } from '@mui/material/IconButton'

const IconButtonWrapper = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  // 确保所有 IconButton 都有 color 属性
  return <IconButton ref={ref} color="inherit" {...props} />
})

IconButtonWrapper.displayName = 'IconButtonWrapper'

export default IconButtonWrapper
