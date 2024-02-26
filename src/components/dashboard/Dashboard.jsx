/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Groups3Icon from "@mui/icons-material/Groups3";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import EngineeringSharpIcon from '@mui/icons-material/EngineeringSharp';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import DropDown from "../common/DropDown";
import "../common/index.css"
import StatBox from "../common/StatBox";
import { tokens, themeSettings } from "../../theme";
import { studentData, lineData } from "../common/CustomCharts";
import API from "../../apis";

import dashBg from "../assets/formBg.png";

const Dashboard = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [dashboardCount, setDashboardCount] = useState({});

  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:480px)");
  const isTab = useMediaQuery("(max-width:920px)");
  const colors = tokens(theme.palette.mode);
  const { typography } = themeSettings(theme.palette.mode);
  const dashboardAttributes = ['student', 'bus', 'teacher', 'employee'];

  const options1 = {
    chart: {
      type: 'spline',
      backgroundColor: colors.blueAccent[500],
      borderRadius: 6,
      width: null,
    },
    title: {
      text: 'RESULT %',
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
        name: 'Passing %',
        data: studentData.map(dataPoint => dataPoint.students),
        color: colors.greenAccent[800],
      },
      {
        name: 'Failing %',
        data: studentData.map(dataPoint => dataPoint.newStudents),
        color: colors.redAccent[900],
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
      colorByPoint: true,
      data: [
        { name: 'Class 1', y: 30, color: colors.blueAccent[600] },
        { name: 'Class 2', y: 40, color: colors.greenAccent[600] },
        { name: 'Class 3', y: 30, color: colors.redAccent[100] },
        { name: 'Class 4', y: 60, color: colors.blueAccent[100] },
        { name: 'Class 5', y: 50, color: colors.blueAccent[700] },
        { name: 'Class 6', y: 70, color: colors.orangeAccent[100] },
        { name: 'Class 7', y: 30, color: colors.redAccent[200] },
        { name: 'Class 8', y: 70, color: colors.blueAccent[200] },
        { name: 'Class 9', y: 60, color: colors.primary[800] },
        { name: 'Class 10', y: 50, color: colors.primary[500] },
        { name: 'Class 11', y: 80, color: colors.primary[600] }
      ],
      color: colors.blueAccent[600],
    }],
  };

  useEffect(() => {
    const promises = dashboardAttributes.map(attribute =>
      API.DashboardAPI.getDashboardCount(attribute)
        .then(data => {
          if (data.status === 'Success') {
            return { [attribute]: data.data };
          } else if (data.status === 'Error') {
            return { [attribute]: 0 };
          }
          // Run this if the status is neither 'Success' nor 'Error'
          return { [attribute]: 0, error: 'Unexpected status' };
        })
        //Creating an object where attribute is the key and retrieved data is the value.
        .catch(error => ({ [attribute]: 0, error }))
    );

    Promise.all(promises)
      .then(results => {    //Combining the results of all promises into a single object using Object.assign({}, ...results)
        const countObject = Object.assign({}, ...results);
        setDashboardCount(countObject);
      })
      .catch(error => {
        console.error('Error fetching dashboard counts:', error);
      });
  }, [])

  return (
    <Box ml="10px"
      sx={{
        backgroundImage: theme.palette.mode == "light" ? `linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url(${dashBg})`
          : `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${dashBg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "start",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        height: "100vh"
      }}
    >
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          sx={{
            fontFamily: typography.fontFamily,
            fontSize: isMobile ? typography.h4.fontSize : typography.h2.fontSize,
            color: colors.grey[100],
            fontWeight: "600",
            display: "inline-block",
            textShadow: "1px 1px 10px white",
            backgroundColor: theme.palette.mode === 'light' ? "white" : "transparent",
            lineHeight: "0.8",
            paddingTop: "15px"
          }}
        >
          Dashboard
        </Typography>
        {/* <DropDown
          onSelectClass={(selectedClass) => setSelectedClass(selectedClass)}
          onSelectSection={(selectedSection) => setSelectedSection(selectedSection)}
        /> */}
      </Box>
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns={isMobile ? "repeat(2, minmax(0, 1fr))" : isTab ? "repeat(2, minmax(0, 1fr))" : "repeat(4, minmax(0, 1fr))"}
        gridTemplateRows={isMobile ? "0.1fr 0.1fr 0.2fr 0.2fr" : isTab ? "1fr 1fr 2fr 2fr" : ""}
        gridTemplateAreas={isMobile ? `"box1 box2" "box3 box4" "chart1 chart1" "chart2 chart2"` : isTab ? `"box1 box2" "box3 box4" "chart1 chart1" "chart2 chart2"` : `"box1 box2 box3 box4" "chart1 chart1 chart2 chart2"`}
        gap={isMobile ? "15px" : "30px"}
        margin={isMobile ? "10px" : "20px"}
        flexWrap="wrap"
      >
        {/* ROW 1 */}
        <Box
          backgroundColor={colors.yellowAccent[100]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding={isMobile ? "8px" : "15px"}
          borderRadius="20px"
          gridArea="box1"
          boxShadow=" rgb(38, 57, 77) 0px 20px 30px -10px;"

        >
          <StatBox
            title={dashboardCount.student}
            subtitle="Students"
            progress={`${(dashboardCount.student / 5000)}`}
            increase={`${((dashboardCount.student / 5000) * 100).toFixed(2)}%`}
            yellowColor={colors.yellowAccent[100]}
            icon={
              <Groups3Icon
                sx={{ color: colors.primary[500], fontSize: isMobile ? "10px" : "26px" }}
              />
            }
          />
        </Box>
        <Box
          backgroundColor={colors.greenAccent[700]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          // "borderRadius="20% 80% 16% 84% / 80% 19% 81% 20%  "
          borderRadius="20px"
          padding={isMobile ? "8px" : "15px"}
          gridArea="box2"
          boxShadow="rgb(38, 57, 77) 0px 20px 30px -10px;"
        >
          <StatBox
            title={dashboardCount.bus}
            subtitle="Buses"
            progress={`${(dashboardCount.bus / 500)}`}
            increase={`${((dashboardCount.bus / 500) * 100).toFixed(2)}%`}
            yellowColor={colors.greenAccent[700]}
            icon={
              <DirectionsBusIcon
                sx={{ color: colors.primary[500], fontSize: isMobile ? "10px" : "26px" }}
              />
            }
          />
        </Box>
        <Box
          backgroundColor={colors.blueAccent[700]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          // borderRadius="20% 80% 16% 84% / 80% 19% 81% 20% "
          borderRadius="20px"
          padding={isMobile ? "8px" : "15px"}
          gridArea="box3"
          boxShadow=" rgb(38, 57, 77) 0px 20px 30px -10px;"
        >
          <StatBox
            title={dashboardCount.teacher}
            subtitle="Teachers"
            progress={`${(dashboardCount.teacher / 500)}`}
            increase={`${((dashboardCount.teacher / 500) * 100).toFixed(2)}%`}
            yellowColor={colors.blueAccent[700]}
            icon={
              <Diversity3Icon
                sx={{ color: colors.primary[500], fontSize: isMobile ? "10px" : "26px" }}
              />
            }
          />
        </Box>
        <Box
          backgroundColor={colors.redAccent[700]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          // borderRadius="20% 80% 16% 84% / 80% 19% 81% 20% "
          borderRadius="20px"
          padding={isMobile ? "8px" : "15px"}
          gridArea="box4"
          boxShadow=" rgb(38, 57, 77) 0px 20px 30px -10px;"
        >
          <StatBox
            title={dashboardCount.employee}
            subtitle="employees"
            progress={`${(dashboardCount.employee / 500)}`}
            increase={`${((dashboardCount.employee / 500) * 100).toFixed(2)}%`}
            yellowColor={colors.redAccent[700]}
            icon={
              <EngineeringSharpIcon
                sx={{ color: colors.primary[500], fontSize: isMobile ? "10px" : "26px" }}
              />
            }
          />
        </Box>

        <Box sx={{ width: isMobile ? "100%" : isTab ? "100%" : "110vh", gridArea: "chart1", boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px;", borderRadius: "20px", overflow: "hidden" }}>
          <HighchartsReact highcharts={Highcharts} options={options1} /></Box>

        <Box sx={{ width: isMobile ? "100%" : isTab ? "100%" : "60vh", marginLeft: isMobile ? "0vh" : isTab ? "0vh" : "24vh", gridArea: "chart2", boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px;", borderRadius: "20px", overflow: "hidden" }}>
          <HighchartsReact highcharts={Highcharts} options={option} /></Box>

      </Box>
    </Box>
  );
};

export default Dashboard;
