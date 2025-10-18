// ** React Imports

import Box from '@mui/material/Box'
// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useDemoData } from '@mui/x-data-grid-generator'
// ** MUI X Imports
import { DataGridPremium, GridToolbar } from '@mui/x-data-grid-premium'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
import type { Dayjs } from 'dayjs'
// ** Third Party Imports
import dayjs from 'dayjs'
import { useState } from 'react'

const TestMuiComponents = () => {
  // 使用示例数据
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    editable: true,
  })

  // 日期范围选择器状态
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    dayjs(),
    dayjs().add(7, 'day'),
  ])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={6}>
        <Grid
          size={{
            xs: 12,
          }}
        >
          <Card>
            <CardHeader title="MUI X 组件测试" subheader="验证 MUI X 高级组件是否正常工作" />
            <CardContent>
              <Typography variant="body2" sx={{ mb: 4 }}>
                这个页面展示了 MUI X 高级组件的功能，包括 Data Grid Premium 和 Date Pickers Pro。
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          size={{
            xs: 12,
          }}
        >
          <Card>
            <CardHeader title="Date Pickers Pro" />
            <CardContent>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  日期范围选择器
                </Typography>
                <DateRangePicker
                  value={dateRange}
                  onChange={(newValue) => setDateRange(newValue)}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          size={{
            xs: 12,
          }}
        >
          <Card>
            <CardHeader title="Data Grid Premium" />
            <Divider />
            <CardContent>
              <Box sx={{ height: 500, width: '100%' }}>
                <DataGridPremium
                  {...data}
                  loading={!data.rows.length}
                  slots={{ toolbar: GridToolbar }}
                  initialState={{
                    aggregation: {
                      model: {
                        price: 'avg',
                        quantity: 'sum',
                      },
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </LocalizationProvider>
  )
}

export default TestMuiComponents
