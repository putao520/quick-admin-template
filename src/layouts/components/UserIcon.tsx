// ** React Imports

// ** MUI Imports
import type { SvgIconProps } from '@mui/material'
import { type ComponentType, createElement, isValidElement, type ReactNode } from 'react'

interface UserIconProps {
  iconProps?: SvgIconProps
  icon: ComponentType<SvgIconProps> | ReactNode
}

const UserIcon = (props: UserIconProps) => {
  // ** Props
  const { icon, iconProps } = props

  if (isValidElement(icon)) {
    return icon
  }

  if (typeof icon === 'function') {
    const IconComponent = icon

    return <IconComponent {...iconProps} />
  }

  if (icon && typeof icon === 'object' && '$$typeof' in icon) {
    return createElement(icon as unknown as ComponentType<SvgIconProps>, iconProps)
  }

  return icon ?? null
}

export default UserIcon
