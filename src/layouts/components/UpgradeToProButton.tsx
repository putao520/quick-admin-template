// ** React Import

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import Typography from '@mui/material/Typography'
import type { FocusEvent, MouseEvent } from 'react'
import { useState } from 'react'

import OptimizedImage from 'src/components/OptimizedImage'

const BuyNowButton = () => {
  // ** States
  const [open, setOpen] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleOpen = (event?: MouseEvent<HTMLElement> | FocusEvent<HTMLElement>) => {
    if (event) {
      setAnchorEl(event.currentTarget)
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box
      className="upgrade-to-pro-button mui-fixed"
      sx={{
        right: (theme) => theme.spacing(20),
        bottom: (theme) => theme.spacing(10),
        zIndex: 11,
        position: 'fixed',
      }}
    >
      <Button
        component="a"
        target="_blank"
        variant="contained"
        onMouseLeave={handleClose}
        onFocus={(event) => handleOpen(event)}
        onBlur={handleClose}
        onMouseEnter={(event) => handleOpen(event)}
        href="https://themeselection.com/products/materio-mui-react-nextjs-admin-template/"
        sx={{
          backgroundColor: '#ff3e1d',
          boxShadow: '0 1px 20px 1px #ff3e1d',
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: '#e6381a',
          },
        }}
      >
        Upgrade To Pro
      </Button>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="top-end"
        transition
        slotProps={{
          root: {
            onMouseEnter: () => handleOpen(),
            onMouseLeave: handleClose,
          },
        }}
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 16],
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={700}>
            <Box sx={{ pb: 4, minWidth: (theme) => (theme.breakpoints.down('sm') ? 400 : 300) }}>
              <Paper elevation={9} sx={{ borderRadius: 1, overflow: 'hidden' }}>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://themeselection.com/products/materio-mui-react-nextjs-admin-template/"
                >
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: 200,
                    }}
                  >
                    <OptimizedImage
                      src="/images/misc/materio-pro-banner.png"
                      alt="materio-pro-banner"
                      fill
                      sizes="(min-width: 600px) 400px, 100vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </Box>
                </a>
                <CardContent>
                  <Typography sx={{ mb: 4 }} variant="h6">
                    Materio - React Admin Template
                  </Typography>
                  <Typography sx={{ mb: 4 }} variant="body2">
                    Materio Admin is the most developer friendly & highly customizable Admin
                    Dashboard Template based on MUI and NextJS.
                  </Typography>
                  <Typography sx={{ mb: 4 }} variant="body2">
                    Click on below buttons to explore PRO version.
                  </Typography>
                  <Button
                    component="a"
                    sx={{ mr: 4 }}
                    target="_blank"
                    variant="contained"
                    href="https://demos.themeselection.com/materio-mui-react-nextjs-admin-template/landing/"
                  >
                    Demo
                  </Button>
                  <Button
                    component="a"
                    target="_blank"
                    variant="outlined"
                    href="https://themeselection.com/products/materio-mui-react-nextjs-admin-template/"
                  >
                    Download
                  </Button>
                </CardContent>
              </Paper>
            </Box>
          </Fade>
        )}
      </Popper>
    </Box>
  )
}

export default BuyNowButton
