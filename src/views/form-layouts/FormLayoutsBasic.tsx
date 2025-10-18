// ** React Imports

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import Link from '@mui/material/Link'
import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import { type ChangeEvent, type MouseEvent, type SyntheticEvent, useId, useState } from 'react'

interface State {
  password: string
  showPassword: boolean
}

const FormLayoutsBasic = () => {
  // ** States
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false,
  })
  const [confirmPassValues, setConfirmPassValues] = useState<State>({
    password: '',
    showPassword: false,
  })

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleConfirmPassChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassValues({ ...confirmPassValues, [prop]: event.target.value })
  }
  const handleClickConfirmPassShow = () => {
    setConfirmPassValues({ ...confirmPassValues, showPassword: !confirmPassValues.showPassword })
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const passwordInputId = useId()
  const passwordHelperId = `${passwordInputId}-helper`
  const confirmPasswordInputId = useId()
  const confirmPasswordHelperId = `${confirmPasswordInputId}-helper`

  return (
    <Card>
      <CardHeader title="Basic" titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid size={12}>
              <TextField fullWidth label="Name" placeholder="Leonard Carter" />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                type="email"
                label="Email"
                placeholder="carterleonard@gmail.com"
                helperText="You can use letters, numbers & periods"
              />
            </Grid>
            <Grid size={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor={passwordInputId}>Password</InputLabel>
                <OutlinedInput
                  label="Password"
                  value={values.password}
                  id={passwordInputId}
                  onChange={handleChange('password')}
                  type={values.showPassword ? 'text' : 'password'}
                  aria-describedby={passwordHelperId}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setValues({ ...values, showPassword: !values.showPassword })}
                        aria-label="toggle password visibility"
                        color="inherit"
                      >
                        {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText id={passwordHelperId}>
                  Use 8 or more characters with a mix of letters, numbers & symbols
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid size={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor={confirmPasswordInputId}>Confirm Password</InputLabel>
                <OutlinedInput
                  label="Confirm Password"
                  value={confirmPassValues.password}
                  id={confirmPasswordInputId}
                  onChange={handleConfirmPassChange('password')}
                  aria-describedby={confirmPasswordHelperId}
                  type={confirmPassValues.showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={handleClickConfirmPassShow}
                        onMouseDown={handleMouseDownPassword}
                        aria-label="toggle password visibility"
                        color="inherit"
                      >
                        {confirmPassValues.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText id={confirmPasswordHelperId}>
                  Make sure to type the same password as above
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid size={12}>
              <Box
                sx={{
                  gap: 5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Button type="submit" variant="contained" size="large">
                  Get Started!
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ mr: 2 }}>Already have an account?</Typography>
                  <Link href="/" onClick={(e: SyntheticEvent) => e.preventDefault()}>
                    Log in
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormLayoutsBasic
