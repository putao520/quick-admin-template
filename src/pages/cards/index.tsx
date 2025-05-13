// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports
import CardUser from 'src/views/cards/CardUser'
import CardImgTop from 'src/views/cards/CardImgTop'
import CardMobile from 'src/views/cards/CardMobile'
import CardSupport from 'src/views/cards/CardSupport'
import CardTwitter from 'src/views/cards/CardTwitter'
import CardFacebook from 'src/views/cards/CardFacebook'
import CardLinkedIn from 'src/views/cards/CardLinkedIn'
import CardAppleWatch from 'src/views/cards/CardAppleWatch'
import CardMembership from 'src/views/cards/CardMembership'
import CardInfluencer from 'src/views/cards/CardInfluencer'
import CardNavigation from 'src/views/cards/CardNavigation'
import CardWithCollapse from 'src/views/cards/CardWithCollapse'
import CardVerticalRatings from 'src/views/cards/CardVerticalRatings'
import CardNavigationCenter from 'src/views/cards/CardNavigationCenter'
import CardHorizontalRatings from 'src/views/cards/CardHorizontalRatings'

const CardBasic = () => {
  return (
    <Grid container spacing={6}>
      <Grid sx={{ paddingBottom: 4 }} size={12}>
        <Typography variant='h5'>Basic Cards</Typography>
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 4
        }}>
        <CardImgTop />
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 4
        }}>
        <CardUser />
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 4
        }}>
        <CardWithCollapse />
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 6
        }}>
        <CardMobile />
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 6
        }}>
        <CardHorizontalRatings />
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 4
        }}>
        <CardAppleWatch />
      </Grid>
      <Grid
        size={{
          xs: 12,
          md: 8
        }}>
        <CardMembership />
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 4
        }}>
        <CardInfluencer />
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 4
        }}>
        <CardVerticalRatings />
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 4
        }}>
        <CardSupport />
      </Grid>
      <Grid
        sx={{ pb: 4, pt: theme => `${theme.spacing(17.5)} !important` }}
        size={12}>
        <Typography variant='h5'>Navigation Cards</Typography>
      </Grid>
      <Grid
        size={{
          xs: 12,
          md: 6
        }}>
        <CardNavigation />
      </Grid>
      <Grid
        size={{
          xs: 12,
          md: 6
        }}>
        <CardNavigationCenter />
      </Grid>
      <Grid
        sx={{ pb: 4, pt: theme => `${theme.spacing(17.5)} !important` }}
        size={12}>
        <Typography variant='h5'>Solid Cards</Typography>
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 4
        }}>
        <CardTwitter />
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 4
        }}>
        <CardFacebook />
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 4
        }}>
        <CardLinkedIn />
      </Grid>
    </Grid>
  );
}

export default CardBasic
