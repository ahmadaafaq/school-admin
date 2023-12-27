/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Groups3Icon from "@mui/icons-material/Groups3";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import EngineeringSharpIcon from '@mui/icons-material/EngineeringSharp';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


import { tokens, themeSettings } from "../../theme";
import StatBox from "../common/StatBox";
import { studentData, lineData } from "../common/CustomCharts";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { typography } = themeSettings(theme.palette.mode);

  const options1 = {
    chart: {
      type: 'spline',
      backgroundColor: colors.blueAccent[500],
      borderRadius: 6,
      width: null,
    },
    title: {
      text: 'Student Data',
      style: {
        color: colors.blueAccent[100],
        fontSize: `${typography.h3.fontSize}px`,
        fontWeight: 'bold',
      },
    },
    xAxis: {
      categories: studentData.map(dataPoint => dataPoint.month),
    },
    yAxis: {
      title: {
        text: 'Number of Students',
        style: {
          color: colors.greenAccent[400],
        },
      },
    },
    tooltip: {
      shared: true,
    },
    series: [
      {
        name: 'Total Students',
        data: studentData.map(dataPoint => dataPoint.students),
        color: colors.greenAccent[400],
      },
      {
        name: 'New Students',
        data: studentData.map(dataPoint => dataPoint.newStudents),
        color: colors.primary[700],
      },
    ],
  };
  const option = {
    chart: {
      type: 'pie',  // Use 'line' for a line chart
      backgroundColor: colors.redAccent[800],
      borderRadius: 6,
      width: null,
    },
    title: {
      text: 'Attendance Trends Over Time',
      style: {
        color: colors.grey[100],
        fontSize: `${typography.h3.fontSize}px`,
        fontWeight: 'bold',
      },
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Date',
        style: {
          color: colors.grey[100],
        },
      },
    },
    yAxis: {
      title: {
        text: 'Attendance Percentage',
        style: {
          color: colors.grey[100],
        },
      },
    },
    tooltip: {
      shared: true,
      formatter: function () {
        return `<strong>${Highcharts.dateFormat('%Y-%m-%d', this.x)}</strong><br>${this.series.name}: ${this.y}%`;
      },
    },
    series: [{
      name: 'Attendance Percentage',
      data: lineData.map(entry => [Date.parse(entry.date), entry.attendance]),
      color: colors.blueAccent[600],
    }],
  };

  return (
    <Box m="10px"  >
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          fontFamily={typography.fontFamily}
          fontSize={typography.h2.fontSize}
          color={colors.grey[100]}
          fontWeight="bold"
          display="inline-block"
        >
          Dashboard
        </Typography>

      </Box>
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        gap="30px"
        margin="20px"
        flexWrap="wrap"
      >
        {/* ROW 1 */}
        <Box
          backgroundColor={colors.primary[100]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding="15px"
          borderRadius="6px"
        >
          <StatBox
            title="12,361"
            subtitle="Students"
            progress="0.75"
            increase="+14%"
            yellowColor={colors.primary[100]}
            icon={
              <Groups3Icon
                sx={{ color: colors.greenAccent[100], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          backgroundColor={colors.primary[900]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="6px"
        >
          <StatBox
            title="32,441"
            subtitle="New Students"
            progress="0.30"
            increase="+5%"
            yellowColor={colors.primary[900]}
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          backgroundColor={colors.primary[800]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="6px"
        >
          <StatBox
            title="1,325"
            subtitle="Teachers"
            progress="0.80"
            increase="+43%"
            yellowColor={colors.primary[800]}
            icon={
              <Diversity3Icon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          backgroundColor={colors.primary[700]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="6px"
        >
          <StatBox

            title="50"
            subtitle="employees"
            progress="0.80"
            increase="+5%"
            yellowColor={colors.primary[700]}
            icon={
              <EngineeringSharpIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box sx={{ width: "105vh" }}>
          <HighchartsReact highcharts={Highcharts} options={options1} /></Box>
        <Box sx={{ width: "60vh", marginLeft: "65vh" }}>
          <HighchartsReact highcharts={Highcharts} options={option} /></Box>

      </Box>
    </Box>
  );
}

export default Dashboard;
