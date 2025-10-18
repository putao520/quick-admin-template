// ** React Imports

import Button from '@mui/material/Button'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import TextField, { type TextFieldProps } from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import { type ChangeEvent, forwardRef, type MouseEvent, useId, useState } from 'react'
// ** Third Party Imports
import DatePicker from 'react-datepicker'

interface State {
  password: string
  password2: string
  showPassword: boolean
  showPassword2: boolean
}

const CustomInput = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => (
  <TextField fullWidth {...props} inputRef={ref} label="Birth Date" autoComplete="off" />
))

CustomInput.displayName = 'FormLayoutsSeparatorDatePickerInput'

const FormLayoutsSeparator = () => {
  // ** States
  const [language, setLanguage] = useState<string[]>([])
  const [date, setDate] = useState<Date | null | undefined>(null)
  const [values, setValues] = useState<State>({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false,
  })

  // Handle Password
  const handlePasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // Handle Confirm Password
  const handleConfirmChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showPassword2: !values.showPassword2 })
  }
  const handleMouseDownConfirmPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // Handle Select
  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    setLanguage(event.target.value as string[])
  }

  const passwordId = useId()
  const confirmPasswordId = useId()
  const countryLabelId = useId()
  const countrySelectId = useId()
  const languageLabelId = useId()
  const languageSelectId = useId()
  const languageInputId = useId()
  const datePickerId = useId()

  return (
    <Card>
      <CardHeader
        title="Multi Column with Form Separator"
        titleTypographyProps={{ variant: 'h6' }}
      />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={(e) => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid size={12}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                1. Account Details
              </Typography>
            </Grid>
            <Grid
              size={{
                xs: 12,
                sm: 6,
              }}
            >
              <TextField fullWidth label="Username" placeholder="carterLeonard" />
            </Grid>
            <Grid
              size={{
                xs: 12,
                sm: 6,
              }}
            >
              <TextField
                fullWidth
                type="email"
                label="Email"
                placeholder="carterleonard@gmail.com"
              />
            </Grid>
            <Grid
              size={{
                xs: 12,
                sm: 6,
              }}
            >
              <FormControl fullWidth>
                <InputLabel htmlFor={passwordId}>Password</InputLabel>
                <OutlinedInput
                  label="Password"
                  value={values.password}
                  id={passwordId}
                  onChange={handlePasswordChange('password')}
                  type={values.showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        aria-label="toggle password visibility"
                        color="inherit"
                      >
                        {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid
              size={{
                xs: 12,
                sm: 6,
              }}
            >
              <FormControl fullWidth>
                <InputLabel htmlFor={confirmPasswordId}>Confirm Password</InputLabel>
                <OutlinedInput
                  value={values.password2}
                  label="Confirm Password"
                  id={confirmPasswordId}
                  onChange={handleConfirmChange('password2')}
                  type={values.showPassword2 ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                        color="inherit"
                      >
                        {values.showPassword2 ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid size={12}>
              <Divider sx={{ marginBottom: 0 }} />
            </Grid>
            <Grid size={12}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                2. Personal Info
              </Typography>
            </Grid>
            <Grid
              size={{
                xs: 12,
                sm: 6,
              }}
            >
              <TextField fullWidth label="First Name" placeholder="Leonard" />
            </Grid>
            <Grid
              size={{
                xs: 12,
                sm: 6,
              }}
            >
              <TextField fullWidth label="Last Name" placeholder="Carter" />
            </Grid>
            <Grid
              size={{
                xs: 12,
                sm: 6,
              }}
            >
              <FormControl fullWidth>
                <InputLabel id={countryLabelId} htmlFor={countrySelectId}>
                  Country
                </InputLabel>
                <Select
                  label="Country"
                  defaultValue=""
                  id={countrySelectId}
                  labelId={countryLabelId}
                >
                  <MenuItem value="UK">UK</MenuItem>
                  <MenuItem value="USA">USA</MenuItem>
                  <MenuItem value="Australia">Australia</MenuItem>
                  <MenuItem value="Germany">Germany</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              size={{
                xs: 12,
                sm: 6,
              }}
            >
              <FormControl fullWidth>
                <InputLabel id={languageLabelId} htmlFor={languageSelectId}>
                  Language
                </InputLabel>
                <Select
                  multiple
                  value={language}
                  onChange={handleSelectChange}
                  id={languageSelectId}
                  labelId={languageLabelId}
                  input={<OutlinedInput label="Language" id={languageInputId} />}
                >
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="French">French</MenuItem>
                  <MenuItem value="Spanish">Spanish</MenuItem>
                  <MenuItem value="Portuguese">Portuguese</MenuItem>
                  <MenuItem value="Italian">Italian</MenuItem>
                  <MenuItem value="German">German</MenuItem>
                  <MenuItem value="Arabic">Arabic</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              size={{
                xs: 12,
                sm: 6,
              }}
            >
              <DatePicker
                selected={date}
                showYearDropdown
                showMonthDropdown
                placeholderText="MM-DD-YYYY"
                customInput={<CustomInput />}
                id={datePickerId}
                portalId="react-datepicker-portal"
                onChange={(newDate: Date | null) => setDate(newDate)}
              />
            </Grid>
            <Grid
              size={{
                xs: 12,
                sm: 6,
              }}
            >
              <TextField fullWidth label="Phone No." placeholder="+1-123-456-8790" />
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button size="large" type="submit" sx={{ mr: 2 }} variant="contained">
            Submit
          </Button>
          <Button size="large" color="secondary" variant="outlined">
            Cancel
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default FormLayoutsSeparator
