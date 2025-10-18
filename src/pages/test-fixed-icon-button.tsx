// ** React Imports

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Magnify from 'mdi-material-ui/Magnify'
// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'
// ** Custom Components
import FixedIconButton from 'src/@core/components/FixedIconButton'

const TestFixedIconButton = () => {
  return (
    <Box sx={{ p: 6 }}>
      <Box sx={{ width: '100%' }}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Fixed IconButton Test Page
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography>Fixed IconButton with inherit color:</Typography>
                <FixedIconButton color="inherit">
                  <Menu />
                </FixedIconButton>
              </Box>
              <Box>
                <Typography>Fixed IconButton with primary color:</Typography>
                <FixedIconButton color="primary">
                  <Magnify />
                </FixedIconButton>
              </Box>
              <Box>
                <Typography>Fixed IconButton with secondary color:</Typography>
                <FixedIconButton color="secondary">
                  <Menu />
                </FixedIconButton>
              </Box>
              <Box>
                <Typography>Fixed IconButton with default color:</Typography>
                <FixedIconButton>
                  <Magnify />
                </FixedIconButton>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default TestFixedIconButton
