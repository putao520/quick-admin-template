// ** React Imports
import { forwardRef } from 'react'

// ** MUI Imports
import IconButton, { IconButtonProps } from '@mui/material/IconButton'

// 创建一个包装器组件，确保所有 IconButton 都有 color 属性
const FixedIconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  // 解构 props，避免重复传递 color 属性
  const { color = 'inherit', ...otherProps } = props
  
  // 使用解构后的属性
  return <IconButton ref={ref} color={color} {...otherProps} />
})

FixedIconButton.displayName = 'FixedIconButton'

export default FixedIconButton
