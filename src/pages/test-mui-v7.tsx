// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Unstable_Grid2' // 使用 Unstable_Grid2 替代 Grid
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Components
import CustomIconButton from 'src/@core/components/CustomIconButton'

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'
import Magnify from 'mdi-material-ui/Magnify'

const TestMuiV7 = () => {
  return (
    <Grid container spacing={6}>
      <Grid xs={12}>
        <Card>
          <CardContent>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
              MUI v7 Test Page
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography>Custom IconButton:</Typography>
                <CustomIconButton color='inherit'>
                  <Menu />
                </CustomIconButton>
              </Box>
              <Box>
                <Typography>Button Component:</Typography>
                <Button variant='contained' color='primary'>
                  Test Button
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TestMuiV7
