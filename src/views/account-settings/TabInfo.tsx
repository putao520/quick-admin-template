// ** React Imports

import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
// ** MUI Imports
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Select from '@mui/material/Select'
import TextField, { type TextFieldProps } from '@mui/material/TextField'
import { forwardRef, useId, useState } from 'react'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const CustomInput = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => (
  <TextField inputRef={ref} label="Birth Date" fullWidth {...props} />
))

CustomInput.displayName = 'TabInfoDatePickerInput'

const TabInfo = () => {
  // ** State
  const [date, setDate] = useState<Date | null | undefined>(null)
  const datePickerId = useId()
  const countryLabelId = useId()
  const countrySelectId = useId()
  const languagesLabelId = useId()
  const languagesSelectId = useId()
  const languagesInputId = useId()

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid sx={{ marginTop: 4.8 }} size={12}>
            <TextField
              fullWidth
              multiline
              label="Bio"
              minRows={2}
              placeholder="Bio"
              defaultValue="The name’s John Deo. I am a tireless seeker of knowledge, occasional purveyor of wisdom and also, coincidentally, a graphic designer. Algolia helps businesses across industries quickly create relevant 😎, scalable 😀, and lightning 😍 fast search and discovery experiences."
            />
          </Grid>
          <Grid
            size={{
              xs: 12,
              sm: 6,
            }}
          >
            <DatePickerWrapper>
              <DatePicker
                selected={date}
                showYearDropdown
                showMonthDropdown
                id={datePickerId}
                portalId="react-datepicker-portal"
                placeholderText="MM-DD-YYYY"
                customInput={<CustomInput />}
                onChange={(newDate: Date | null) => setDate(newDate)}
              />
            </DatePickerWrapper>
          </Grid>
          <Grid
            size={{
              xs: 12,
              sm: 6,
            }}
          >
            <TextField fullWidth type="number" label="Phone" placeholder="(123) 456-7890" />
          </Grid>
          <Grid
            size={{
              xs: 12,
              sm: 6,
            }}
          >
            <TextField
              fullWidth
              label="Website"
              placeholder="https://example.com/"
              defaultValue="https://themeselection.com/"
            />
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
                defaultValue="USA"
                id={countrySelectId}
                labelId={countryLabelId}
              >
                <MenuItem value="USA">USA</MenuItem>
                <MenuItem value="UK">UK</MenuItem>
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
              <InputLabel id={languagesLabelId} htmlFor={languagesSelectId}>
                Languages
              </InputLabel>
              <Select
                multiple
                defaultValue={['English']}
                id={languagesSelectId}
                labelId={languagesLabelId}
                input={<OutlinedInput label="Languages" id={languagesInputId} />}
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
            <FormControl>
              <FormLabel sx={{ fontSize: '0.875rem' }}>Gender</FormLabel>
              <RadioGroup
                row
                defaultValue="male"
                aria-label="gender"
                name="account-settings-info-radio"
              >
                <FormControlLabel value="male" label="Male" control={<Radio />} />
                <FormControlLabel value="female" label="Female" control={<Radio />} />
                <FormControlLabel value="other" label="Other" control={<Radio />} />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid size={12}>
            <Button variant="contained" sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
            <Button type="reset" variant="outlined" color="secondary" onClick={() => setDate(null)}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabInfo
