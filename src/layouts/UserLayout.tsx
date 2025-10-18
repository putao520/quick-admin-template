// ** React Imports

// ** MUI Imports
import Box from '@mui/material/Box'
import type { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import type { ReactNode } from 'react'
// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'
import type { VerticalNavItemsType } from 'src/@core/layouts/types'
// ** Layout Imports
// !Do not remove this Layout import
import VerticalLayout from 'src/@core/layouts/VerticalLayout'
import OptimizedImage from 'src/components/OptimizedImage'
// ** Navigation Imports
import VerticalNavItems from 'src/navigation/vertical'
// ** Component Import
import UpgradeToProButton from './components/UpgradeToProButton'
import VerticalAppBarContent from './components/vertical/AppBarContent'

interface Props {
  children: ReactNode
}

const UpgradeToProImg = ({ mode }: { mode: string }) => {
  return (
    <Box sx={{ mx: 'auto' }}>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://themeselection.com/products/materio-mui-react-nextjs-admin-template/"
      >
        <Box
          sx={{
            position: 'relative',
            width: 230,
            height: 140,
          }}
        >
          <OptimizedImage
            src={`/images/misc/upgrade-banner-${mode}.png`}
            alt="upgrade to premium"
            fill
            sizes="230px"
            priority
            style={{ objectFit: 'contain' }}
          />
        </Box>
      </a>
    </Box>
  )
}

const UserLayout = ({ children }: Props) => {
  // ** Hooks
  const { settings, saveSettings } = useSettings()

  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/components/use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))
  const verticalNavItems: VerticalNavItemsType = VerticalNavItems()

  return (
    <VerticalLayout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      verticalNavItems={verticalNavItems} // Navigation Items
      afterVerticalNavMenuContent={() => <UpgradeToProImg mode={settings.mode} />}
      verticalAppBarContent={({
        hidden: navHidden,
        saveSettings: navSaveSettings,
        settings: navSettings,
        toggleNavVisibility,
      }) => (
        <VerticalAppBarContent
          hidden={navHidden}
          settings={navSettings}
          saveSettings={navSaveSettings}
          toggleNavVisibility={toggleNavVisibility}
        />
      )}
    >
      {children}
      <UpgradeToProButton />
    </VerticalLayout>
  )
}

export default UserLayout
