// ** React Imports

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'
// ** Custom Components
import CustomIconButton from 'src/@core/components/CustomIconButton'

const TestMuiV7 = () => {
  return (
    <Grid container spacing={6}>
      <Grid
        size={{
          xs: 12,
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              MUI v7 Test Page
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography>Custom IconButton:</Typography>
                <CustomIconButton color="inherit">
                  <Menu />
                </CustomIconButton>
              </Box>
              <Box>
                <Typography>Button Component:</Typography>
                <Button variant="contained" color="primary">
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
