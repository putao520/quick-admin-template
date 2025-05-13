// ** React Imports
import React, { useState } from 'react'

// ** MUI X Imports
import { DataGridPremium, GridToolbar } from '@mui/x-data-grid-premium'
import { useDemoData } from '@mui/x-data-grid-generator'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

// ** Third Party Imports
import dayjs from 'dayjs'

const TestMuiComponents = () => {
  // 使用示例数据
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    editable: true,
  })

  // 日期范围选择器状态
  const [dateRange, setDateRange] = useState([
    dayjs(),
    dayjs().add(7, 'day')
  ])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader 
              title="MUI X 组件测试" 
              subheader="验证 MUI X 高级组件是否正常工作" 
            />
            <CardContent>
              <Typography variant="body2" sx={{ mb: 4 }}>
                这个页面展示了 MUI X 高级组件的功能，包括 Data Grid Premium 和 Date Pickers Pro。
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
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

        <Grid item xs={12}>
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
