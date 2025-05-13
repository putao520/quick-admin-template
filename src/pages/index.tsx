// ** React Imports
import React, { useMemo } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'

const Dashboard = () => {
  // 使用 useMemo 缓存仪表盘布局，避免不必要的重新渲染
  const dashboardContent = useMemo(() => (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid
          size={{
            xs: 12,
            md: 4
          }}>
          <Trophy />
        </Grid>
        <Grid
          size={{
            xs: 12,
            md: 8
          }}>
          <StatisticsCard />
        </Grid>
        <Grid
          size={{
            xs: 12,
            md: 6,
            lg: 4
          }}>
          <WeeklyOverview />
        </Grid>
        <Grid
          size={{
            xs: 12,
            md: 6,
            lg: 4
          }}>
          <TotalEarning />
        </Grid>
        <Grid
          size={{
            xs: 12,
            md: 6,
            lg: 4
          }}>
          <Grid container spacing={6}>
            <Grid size={6}>
              <CardStatisticsVerticalComponent
                stats='$25.6k'
                icon={<Poll />}
                color='success'
                trendNumber='+42%'
                title='Total Profit'
                subtitle='Weekly Profit'
              />
            </Grid>
            <Grid size={6}>
              <CardStatisticsVerticalComponent
                stats='$78'
                title='Refunds'
                trend='negative'
                color='secondary'
                trendNumber='-15%'
                subtitle='Past Month'
                icon={<CurrencyUsd />}
              />
            </Grid>
            <Grid size={6}>
              <CardStatisticsVerticalComponent
                stats='862'
                trend='negative'
                trendNumber='-18%'
                title='New Project'
                subtitle='Yearly Project'
                icon={<BriefcaseVariantOutline />}
              />
            </Grid>
            <Grid size={6}>
              <CardStatisticsVerticalComponent
                stats='15'
                color='warning'
                trend='negative'
                trendNumber='-18%'
                subtitle='Last Week'
                title='Sales Queries'
                icon={<HelpCircleOutline />}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          size={{
            xs: 12,
            md: 6,
            lg: 4
          }}>
          <SalesByCountries />
        </Grid>
        <Grid
          size={{
            xs: 12,
            md: 12,
            lg: 8
          }}>
          <DepositWithdraw />
        </Grid>
        <Grid size={12}>
          <Table />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  ), [])

  return dashboardContent
}

// 使用 React.memo 包装组件，避免不必要的重新渲染
export default React.memo(Dashboard)
