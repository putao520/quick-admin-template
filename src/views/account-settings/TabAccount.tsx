// ** React Imports

import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
// ** MUI Imports
import Box from '@mui/material/Box'
import Button, { type ButtonProps } from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Link from '@mui/material/Link'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import {
  type ChangeEvent,
  type ElementType,
  type SyntheticEvent,
  useCallback,
  useId,
  useState,
  useTransition,
} from 'react'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius,
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(
  ({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center',
    },
  }),
)

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4),
  },
}))

const TabAccount = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState<boolean>(true)
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
  const uploadInputId = useId()

  // 使用 useTransition 处理图片加载，避免阻塞 UI
  const [isPending, startTransition] = useTransition()

  // 使用 useCallback 缓存文件上传回调函数
  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    const files = event.target.files
    // 确保文件存在并且有效
    if (files && files.length > 0) {
      const file = files[0]
      if (file) {
        reader.onload = () => {
          // 使用 startTransition 处理图片加载，使界面保持响应
          startTransition(() => {
            setImgSrc(reader.result as string)
          })
        }

        reader.readAsDataURL(file)
      }
    }
  }, [])

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid sx={{ marginTop: 4.8, marginBottom: 3 }} size={12}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt="Profile Pic" />
              <Box>
                <ButtonStyled component="label" variant="contained" htmlFor={uploadInputId}>
                  Upload New Photo
                  <input
                    hidden
                    type="file"
                    onChange={onChange}
                    accept="image/png, image/jpeg"
                    id={uploadInputId}
                  />
                </ButtonStyled>
                <ResetButtonStyled
                  color="error"
                  variant="outlined"
                  disabled={isPending}
                  onClick={useCallback(() => {
                    startTransition(() => {
                      setImgSrc('/images/avatars/1.png')
                    })
                  }, [])}
                >
                  Reset
                </ResetButtonStyled>
                <Typography variant="body2" sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid
            size={{
              xs: 12,
              sm: 6,
            }}
          >
            <TextField fullWidth label="Username" placeholder="johnDoe" defaultValue="johnDoe" />
          </Grid>
          <Grid
            size={{
              xs: 12,
              sm: 6,
            }}
          >
            <TextField fullWidth label="Name" placeholder="John Doe" defaultValue="John Doe" />
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
              placeholder="johnDoe@example.com"
              defaultValue="johnDoe@example.com"
            />
          </Grid>
          <Grid
            size={{
              xs: 12,
              sm: 6,
            }}
          >
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select label="Role" defaultValue="admin">
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="author">Author</MenuItem>
                <MenuItem value="editor">Editor</MenuItem>
                <MenuItem value="maintainer">Maintainer</MenuItem>
                <MenuItem value="subscriber">Subscriber</MenuItem>
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
              <InputLabel>Status</InputLabel>
              <Select label="Status" defaultValue="active">
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            size={{
              xs: 12,
              sm: 6,
            }}
          >
            <TextField
              fullWidth
              label="Company"
              placeholder="ABC Pvt. Ltd."
              defaultValue="ABC Pvt. Ltd."
            />
          </Grid>

          {openAlert ? (
            <Grid sx={{ mb: 3 }} size={12}>
              <Alert
                severity="warning"
                sx={{ '& a': { fontWeight: 400 } }}
                action={
                  <IconButton
                    size="small"
                    color="inherit"
                    aria-label="close"
                    onClick={() => setOpenAlert(false)}
                  >
                    <Close fontSize="inherit" />
                  </IconButton>
                }
              >
                <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
                <Link href="/" onClick={(e: SyntheticEvent) => e.preventDefault()}>
                  Resend Confirmation
                </Link>
              </Alert>
            </Grid>
          ) : null}

          <Grid size={12}>
            <Button variant="contained" sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
            <Button type="reset" variant="outlined" color="secondary">
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
