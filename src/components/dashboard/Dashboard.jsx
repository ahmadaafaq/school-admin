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
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Groups3Icon from "@mui/icons-material/Groups3";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ApartmentIcon from '@mui/icons-material/Apartment';
import EngineeringSharpIcon from '@mui/icons-material/EngineeringSharp';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import DropDown from "../common/DropDown";
import "../common/index.css"
import StatBox from "../common/StatBox";
import { tokens, themeSettings } from "../../theme";
import { studentData, lineData } from "../common/CustomCharts";
import API from "../../apis";

import dashBg from "../assets/formBg.png"

const Dashboard = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [studentDataa, setStudentData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [schoolData, setSchoolData] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:480px)");
  const isTab = useMediaQuery("(max-width:920px)");
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
        { name: 'Class 11', y: 80, color: colors.primary[600] },
      ],
      color: colors.blueAccent[600],
    }],
  };

  useEffect(() => {
    API.StudentAPI.getAll()
      .then(students => {
        setStudentData(students.data.rows.length)
      })
      .catch(err => {
        throw err;
      });

    API.TeacherAPI.getAll()
      .then(teachers => {
        setTeacherData(teachers.data.rows.length)
      })
      .catch(err => {
        throw err;
      });

    API.EmployeeAPI.getAll()
      .then(employees => {
        setEmployeeData(employees.data.rows.length)
      })
      .catch(err => {
        throw err;
      });

    API.SchoolAPI.getAll()
      .then(schools => {
        setSchoolData(schools.data.rows.length)
      })
      .catch(err => {
        throw err;
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
            title={studentDataa}
            subtitle="Students"
            progress={`${(studentDataa / 5000)}`}
            increase={`${(studentDataa / 5000) * 100}%`}
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
            title={schoolData}
            subtitle="Schools"
            progress={`${(schoolData / 500)}`}
            increase={`${(schoolData / 500) * 100}%`}
            yellowColor={colors.greenAccent[700]}
            icon={
              <ApartmentIcon
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
            title={teacherData}
            subtitle="Teachers"
            progress={`${(teacherData / 500)}`}
            increase={`${(teacherData / 500) * 100}%`}
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

            title={employeeData}
            subtitle="employees"
            progress={`${(employeeData / 500)}`}
            increase={`${(employeeData / 500) * 100}%`}
            yellowColor={colors.redAccent[700]}
            icon={
              <EngineeringSharpIcon
                sx={{ color: colors.primary[500], fontSize: isMobile ? "10px" : "26px" }}
              />
            }
          />
        </Box>

        <Box sx={{ width: isMobile ? "100%" : isTab ? "100%" : "110vh", gridArea: "chart1", boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px;", borderRadius: "10px" }}>
          <HighchartsReact highcharts={Highcharts} options={options1} /></Box>

        <Box sx={{ width: isMobile ? "100%" : isTab ? "100%" : "60vh", marginLeft: isMobile ? "0vh" : isTab ? "0vh" : "24vh", gridArea: "chart2", boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px;", borderRadius: "10px" }}>
          <HighchartsReact highcharts={Highcharts} options={option} /></Box>

      </Box>
    </Box >
  );
}

export default Dashboard;
