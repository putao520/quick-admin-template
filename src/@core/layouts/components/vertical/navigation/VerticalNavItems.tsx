// ** React Imports
import { useMemo } from 'react'

// ** Types Import
import type { Settings } from 'src/@core/context/settingsContext'
import type { NavLink, NavSectionTitle, VerticalNavItemsType } from 'src/@core/layouts/types'

// ** Custom Menu Components
import VerticalNavLink from './VerticalNavLink'
import VerticalNavSectionTitle from './VerticalNavSectionTitle'

const isNavSectionTitle = (item: NavLink | NavSectionTitle): item is NavSectionTitle =>
  'sectionTitle' in item

interface Props {
  settings: Settings
  navVisible?: boolean
  groupActive: string[]
  currentActiveGroup: string[]
  verticalNavItems?: VerticalNavItemsType
  saveSettings: (values: Settings) => void
  toggleNavVisibility: () => void
  setGroupActive: (value: string[]) => void
  setCurrentActiveGroup: (item: string[]) => void
}

const VerticalNavItems = (props: Props) => {
  // ** Props
  const { verticalNavItems } = props

  // 使用 useMemo 缓存菜单项渲染结果，避免不必要的重新渲染
  const RenderMenuItems = useMemo(() => {
    return verticalNavItems?.map((item: NavLink | NavSectionTitle) => {
      if (isNavSectionTitle(item)) {
        return <VerticalNavSectionTitle key={`nav-section-${item.sectionTitle}`} item={item} />
      }

      return <VerticalNavLink key={`nav-link-${item.path ?? item.title}`} {...props} item={item} />
    })
  }, [verticalNavItems, props])

  return <>{RenderMenuItems}</>
}

export default VerticalNavItems
