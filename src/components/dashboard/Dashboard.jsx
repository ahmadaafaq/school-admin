/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Diversity3Icon from '@mui/icons-material/Diversity3';

import { tokens, themeSettings } from "../../theme";
import StatBox from "../common/StatBox";
import ProgressCircle from "../common/ProgressCircle";


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { typography } = themeSettings(theme.palette.mode);

  return (
    <Box m="10px">
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

        <Box>
          <Typography
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 15px",
              borderRadius: "6px"
            }}
          >
            This Page Is Being Built By Our Team
          </Typography>
        </Box>
      </Box>
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(3, minmax(0, 1fr))"
        gap="30px"
        margin="20px"
        flexWrap="wrap"
      >
        {/* ROW 1 */}
        <Box
          backgroundColor={colors.primary[400]}
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
            icon={
              <PeopleOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          backgroundColor={colors.primary[400]}
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
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          backgroundColor={colors.primary[400]}
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
            icon={
              <Diversity3Icon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
