// ** React Imports

import Avatar from '@mui/material/Avatar'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Typography from '@mui/material/Typography'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import KeyOutline from 'mdi-material-ui/KeyOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import { type ChangeEvent, type MouseEvent, useId, useState } from 'react'

import OptimizedImage from 'src/components/OptimizedImage'

interface State {
  newPassword: string
  currentPassword: string
  showNewPassword: boolean
  confirmNewPassword: string
  showCurrentPassword: boolean
  showConfirmNewPassword: boolean
}

const TabSecurity = () => {
  // ** States
  const [values, setValues] = useState<State>({
    newPassword: '',
    currentPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showCurrentPassword: false,
    showConfirmNewPassword: false,
  })
  const currentPasswordId = useId()
  const newPasswordId = useId()
  const confirmPasswordId = useId()

  // Handle Current Password
  const handleCurrentPasswordChange =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value })
    }
  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })
  }
  const handleMouseDownCurrentPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // Handle New Password
  const handleNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }
  const handleMouseDownNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value })
    }
  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }
  const handleMouseDownConfirmNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <form>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid
            size={{
              xs: 12,
              sm: 6,
            }}
          >
            <Grid container spacing={5}>
              <Grid sx={{ marginTop: 4.75 }} size={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor={currentPasswordId}>Current Password</InputLabel>
                  <OutlinedInput
                    label="Current Password"
                    value={values.currentPassword}
                    id={currentPasswordId}
                    type={values.showCurrentPassword ? 'text' : 'password'}
                    onChange={handleCurrentPasswordChange('currentPassword')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          aria-label="toggle password visibility"
                          onClick={handleClickShowCurrentPassword}
                          onMouseDown={handleMouseDownCurrentPassword}
                          color="inherit"
                        >
                          {values.showCurrentPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid sx={{ marginTop: 6 }} size={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor={newPasswordId}>New Password</InputLabel>
                  <OutlinedInput
                    label="New Password"
                    value={values.newPassword}
                    id={newPasswordId}
                    onChange={handleNewPasswordChange('newPassword')}
                    type={values.showNewPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={handleClickShowNewPassword}
                          aria-label="toggle password visibility"
                          onMouseDown={handleMouseDownNewPassword}
                          color="inherit"
                        >
                          {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid size={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor={confirmPasswordId}>Confirm New Password</InputLabel>
                  <OutlinedInput
                    label="Confirm New Password"
                    value={values.confirmNewPassword}
                    id={confirmPasswordId}
                    type={values.showConfirmNewPassword ? 'text' : 'password'}
                    onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmNewPassword}
                          onMouseDown={handleMouseDownConfirmNewPassword}
                          color="inherit"
                        >
                          {values.showConfirmNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            sx={{
              display: 'flex',
              marginTop: [7.5, 2.5],
              alignItems: 'center',
              justifyContent: 'center',
            }}
            size={{
              sm: 6,
              xs: 12,
            }}
          >
            <Box
              sx={{
                width: 183,
                height: 256,
                position: 'relative',
              }}
            >
              <OptimizedImage
                src="/images/pages/pose-m-1.png"
                alt="avatar"
                fill
                sizes="183px"
                style={{ objectFit: 'contain' }}
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <Box sx={{ mt: 1.75, display: 'flex', alignItems: 'center' }}>
          <KeyOutline sx={{ marginRight: 3 }} />
          <Typography variant="h6">Two-factor authentication</Typography>
        </Box>

        <Box sx={{ mt: 5.75, display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              maxWidth: 368,
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Avatar
              variant="rounded"
              sx={{ width: 48, height: 48, color: 'common.white', backgroundColor: 'primary.main' }}
            >
              <LockOpenOutline sx={{ fontSize: '1.75rem' }} />
            </Avatar>
            <Typography sx={{ fontWeight: 600, marginTop: 3.5, marginBottom: 3.5 }}>
              Two factor authentication is not enabled yet.
            </Typography>
            <Typography variant="body2">
              Two-factor authentication adds an additional layer of security to your account by
              requiring more than just a password to log in. Learn more.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 11 }}>
          <Button variant="contained" sx={{ marginRight: 3.5 }}>
            Save Changes
          </Button>
          <Button
            type="reset"
            variant="outlined"
            color="secondary"
            onClick={() =>
              setValues({ ...values, currentPassword: '', newPassword: '', confirmNewPassword: '' })
            }
          >
            Reset
          </Button>
        </Box>
      </CardContent>
    </form>
  )
}
export default TabSecurity
