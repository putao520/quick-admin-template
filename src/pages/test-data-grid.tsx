// ** React Imports
import React from 'react'

// ** MUI X Imports
import { DataGridPremium, GridToolbar } from '@mui/x-data-grid-premium'
import { useDemoData } from '@mui/x-data-grid-generator'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const TestDataGrid = () => {
  // 使用示例数据
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    editable: true,
  })

  return (
    <Card>
      <CardHeader 
        title="MUI X Data Grid Premium" 
        subheader="高级数据表格组件示例" 
      />
      <CardContent>
        <Typography variant="body2" sx={{ mb: 4 }}>
          这个页面展示了 MUI X Data Grid Premium 的高级功能，包括数据聚合、工具栏和数据导出等。
        </Typography>
        
        <div style={{ height: 600, width: '100%' }}>
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
        </div>
      </CardContent>
    </Card>
  )
}

export default TestDataGrid
