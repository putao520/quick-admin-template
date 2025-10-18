import type { ElementType, ReactNode } from 'react'
import type { Settings } from 'src/@core/context/settingsContext'

export type ContentWidth = 'full' | 'boxed'

export type ThemeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'

type NavIconElement = Exclude<ReactNode, string | number | boolean>

export type NavLink = {
  path?: string
  title: string
  action?: string
  subject?: string
  disabled?: boolean
  badgeContent?: string
  externalLink?: boolean
  openInNewTab?: boolean
  icon?: ElementType | NavIconElement
  badgeColor?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
}

export type NavSectionTitle = {
  sectionTitle: string
  action?: string
  subject?: string
}

export type VerticalNavItemsType = (NavLink | NavSectionTitle)[]

export type VerticalAppBarContentProps = {
  hidden: boolean
  settings: Settings
  saveSettings: (values: Settings) => void
  toggleNavVisibility: () => void
}

export type LayoutProps = {
  hidden: boolean
  settings: Settings
  children: ReactNode
  verticalNavItems?: VerticalNavItemsType
  scrollToTop?: () => ReactNode
  saveSettings: (values: Settings) => void
  footerContent?: () => ReactNode
  verticalAppBarContent?: (props: VerticalAppBarContentProps) => ReactNode
  verticalNavMenuContent?: () => ReactNode
  verticalNavMenuBranding?: () => ReactNode
  afterVerticalNavMenuContent?: () => ReactNode
  beforeVerticalNavMenuContent?: () => ReactNode
}

export type BlankLayoutProps = {
  children: ReactNode
}
