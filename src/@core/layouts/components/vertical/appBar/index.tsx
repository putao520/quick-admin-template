// ** React Imports

import MuiAppBar, { type AppBarProps } from '@mui/material/AppBar'

// ** MUI Imports
import { styled, useTheme } from '@mui/material/styles'
import MuiToolbar, { type ToolbarProps } from '@mui/material/Toolbar'
import type { ReactNode } from 'react'

// ** Type Import
import type { Settings } from 'src/@core/context/settingsContext'
import type { VerticalAppBarContentProps } from 'src/@core/layouts/types'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
  verticalAppBarContent?: (props: VerticalAppBarContentProps) => ReactNode
}

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  transition: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 6),
  backgroundColor: 'transparent',
  color: theme.palette.text.primary,
  minHeight: theme.mixins.toolbar.minHeight,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}))

const Toolbar = styled(MuiToolbar)<ToolbarProps>(({ theme }) => ({
  width: '100%',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  padding: `${theme.spacing(0)} !important`,
  minHeight: `${theme.mixins.toolbar.minHeight}px !important`,
  transition:
    'padding .25s ease-in-out, box-shadow .25s ease-in-out, backdrop-filter .25s ease-in-out, background-color .25s ease-in-out',
}))

const LayoutAppBar = (props: Props) => {
  // ** Props
  const {
    settings,
    verticalAppBarContent: userVerticalAppBarContent,
    hidden,
    saveSettings,
    toggleNavVisibility,
  } = props

  // ** Hooks
  const theme = useTheme()

  // ** Vars
  const { contentWidth } = settings

  return (
    <AppBar elevation={0} color="default" className="layout-navbar" position="static">
      <Toolbar
        className="navbar-content-container"
        sx={{
          ...(contentWidth === 'boxed' && {
            '@media (min-width:1440px)': { maxWidth: `calc(1440px - ${theme.spacing(6)} * 2)` },
          }),
        }}
      >
        {userVerticalAppBarContent?.({
          hidden,
          settings,
          saveSettings,
          toggleNavVisibility,
        }) ?? null}
      </Toolbar>
    </AppBar>
  )
}

export default LayoutAppBar
