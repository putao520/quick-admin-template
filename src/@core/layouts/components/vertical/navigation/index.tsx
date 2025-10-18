// ** React Import

import Box, { type BoxProps } from '@mui/material/Box'

// ** MUI Import
import List from '@mui/material/List'
import { styled, useTheme } from '@mui/material/styles'
import { type ReactNode, type UIEvent, useRef, useState } from 'react'

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Type Import
import type { Settings } from 'src/@core/context/settingsContext'
import type { VerticalNavItemsType } from 'src/@core/layouts/types'
// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
// ** Component Imports
import Drawer from './Drawer'
import VerticalNavHeader from './VerticalNavHeader'
import VerticalNavItems from './VerticalNavItems'

interface Props {
  hidden: boolean
  navWidth: number
  settings: Settings
  children: ReactNode
  navVisible: boolean
  toggleNavVisibility: () => void
  setNavVisible: (value: boolean) => void
  verticalNavItems?: VerticalNavItemsType
  saveSettings: (values: Settings) => void
  verticalNavMenuContent?: () => ReactNode
  afterVerticalNavMenuContent?: () => ReactNode
  beforeVerticalNavMenuContent?: () => ReactNode
}

const StyledBoxForShadow = styled(Box)<BoxProps>({
  top: 50,
  left: -8,
  zIndex: 2,
  height: 75,
  display: 'none',
  position: 'absolute',
  pointerEvents: 'none',
  width: 'calc(100% + 15px)',
  '&.d-block': {
    display: 'block',
  },
})

type ScrollableElement = HTMLElement & {
  _getBoundingClientRect?: typeof HTMLElement.prototype.getBoundingClientRect
}

const Navigation = (props: Props) => {
  // ** Props
  const {
    hidden,
    afterVerticalNavMenuContent,
    beforeVerticalNavMenuContent,
    verticalNavMenuContent: userVerticalNavMenuContent,
  } = props

  // ** States
  const [groupActive, setGroupActive] = useState<string[]>([])
  const [currentActiveGroup, setCurrentActiveGroup] = useState<string[]>([])

  // ** Ref
  const shadowRef = useRef<HTMLDivElement | null>(null)

  // ** Hooks
  const theme = useTheme()

  // ** Fixes Navigation InfiniteScroll
  const handleInfiniteScroll = (ref: ScrollableElement | null) => {
    if (!ref || ref._getBoundingClientRect) {
      return
    }

    const originalMethod = ref.getBoundingClientRect.bind(ref)
    ref._getBoundingClientRect = originalMethod

    ref.getBoundingClientRect = () => {
      const original = originalMethod()

      return { ...original, height: Math.floor(original.height) }
    }
  }

  // ** Scroll Menu
  const scrollMenu = (source: UIEvent<HTMLDivElement> | HTMLElement) => {
    const container = source instanceof HTMLElement ? source : (source.currentTarget as HTMLElement)

    if (!shadowRef.current) return

    if (container.scrollTop > 0) {
      shadowRef.current.classList.add('d-block')
    } else {
      shadowRef.current.classList.remove('d-block')
    }
  }

  const renderScrollWrapper = (content: ReactNode) => {
    if (hidden) {
      return (
        <Box
          onScroll={(event: UIEvent<HTMLDivElement>) => scrollMenu(event)}
          sx={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}
        >
          {content}
        </Box>
      )
    }

    return (
      <PerfectScrollbar
        options={{ wheelPropagation: false }}
        onScrollY={(container: HTMLElement) => scrollMenu(container)}
        containerRef={(ref: HTMLElement | null) =>
          handleInfiniteScroll(ref as ScrollableElement | null)
        }
      >
        {content}
      </PerfectScrollbar>
    )
  }

  return (
    <Drawer {...props}>
      <VerticalNavHeader {...props} />
      <StyledBoxForShadow
        ref={shadowRef}
        sx={{
          background: `linear-gradient(${theme.palette.background.default} 40%,${hexToRGBA(
            theme.palette.background.default,
            0.1,
          )} 95%,${hexToRGBA(theme.palette.background.default, 0.05)})`,
        }}
      />
      <Box sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
        {renderScrollWrapper(
          <>
            {beforeVerticalNavMenuContent ? beforeVerticalNavMenuContent() : null}
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {userVerticalNavMenuContent ? (
                userVerticalNavMenuContent()
              ) : (
                <List className="nav-items" sx={{ transition: 'padding .25s ease', pr: 4.5 }}>
                  <VerticalNavItems
                    groupActive={groupActive}
                    setGroupActive={setGroupActive}
                    currentActiveGroup={currentActiveGroup}
                    setCurrentActiveGroup={setCurrentActiveGroup}
                    {...props}
                  />
                </List>
              )}
            </Box>
          </>,
        )}
      </Box>
      {afterVerticalNavMenuContent ? afterVerticalNavMenuContent() : null}
    </Drawer>
  )
}

export default Navigation
