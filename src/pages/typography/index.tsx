// ** MUI Imports
import Grid from '@mui/material/Grid'
import TypographyHeadings from 'src/views/typography/TypographyHeadings'
// ** Demo Components Imports
import TypographyTexts from 'src/views/typography/TypographyTexts'

const TypographyPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={12}>
        <TypographyHeadings />
      </Grid>
      <Grid size={12}>
        <TypographyTexts />
      </Grid>
    </Grid>
  )
}

export default TypographyPage
