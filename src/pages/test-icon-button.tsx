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
import CustomIconButton from 'src/@core/components/CustomIconButton'

const TestIconButton = () => {
  return (
    <Box sx={{ p: 6 }}>
      <Box sx={{ width: '100%' }}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              IconButton Test Page
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography>Basic IconButton:</Typography>
                <CustomIconButton color="inherit">
                  <Menu />
                </CustomIconButton>
              </Box>
              <Box>
                <Typography>IconButton with primary color:</Typography>
                <CustomIconButton color="primary">
                  <Magnify />
                </CustomIconButton>
              </Box>
              <Box>
                <Typography>IconButton with secondary color:</Typography>
                <CustomIconButton color="secondary">
                  <Menu />
                </CustomIconButton>
              </Box>
              <Box>
                <Typography>IconButton with default color:</Typography>
                <CustomIconButton>
                  <Magnify />
                </CustomIconButton>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default TestIconButton
