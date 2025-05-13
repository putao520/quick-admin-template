// ** React Imports
import { useMemo, useCallback } from 'react'

// ** Types Import
import { type Settings } from 'src/@core/context/settingsContext'
import { type NavLink, type NavSectionTitle, type VerticalNavItemsType } from 'src/@core/layouts/types'

// ** Custom Menu Components
import VerticalNavLink from './VerticalNavLink'
import VerticalNavSectionTitle from './VerticalNavSectionTitle'

interface Props {
  settings: Settings
  navVisible?: boolean
  groupActive: string[]
  currentActiveGroup: string[]
  verticalNavItems?: VerticalNavItemsType
  saveSettings: (values: Settings) => void
  setGroupActive: (value: string[]) => void
  setCurrentActiveGroup: (item: string[]) => void
}

// 使用组件外部定义函数，避免在每次渲染时重新创建
const resolveNavItemComponent = (item: NavLink | NavSectionTitle) => {
  if ((item as NavSectionTitle).sectionTitle) return VerticalNavSectionTitle

  return VerticalNavLink
}

const VerticalNavItems = (props: Props) => {
  // ** Props
  const { verticalNavItems } = props

  // 使用 useMemo 缓存菜单项渲染结果，避免不必要的重新渲染
  const RenderMenuItems = useMemo(() => {
    return verticalNavItems?.map((item: NavLink | NavSectionTitle, index: number) => {
      const TagName: any = resolveNavItemComponent(item)

      return <TagName {...props} key={index} item={item} />
    })
  }, [verticalNavItems, props])

  return <>{RenderMenuItems}</>
}

export default VerticalNavItems
