/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar/dist";
import "react-pro-sidebar/dist/css/styles.css";

import { Box, IconButton, Typography, useTheme, useMediaQuery } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SchoolIcon from '@mui/icons-material/School';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import Person2Icon from '@mui/icons-material/Person2';
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ApiIcon from '@mui/icons-material/Api';
import AssistantIcon from '@mui/icons-material/Assistant';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import { Api, TuneOutlined } from '@mui/icons-material';

import { tokens } from "../../theme";
import { SidebarItem } from "./SidebarItem";
import { Utility } from "../utility";
import "../common/index.css";
import schoolImg from "../assets/school.jpg";

const Sidebar = ({ role }) => {
  const theme = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const selected = useSelector(state => state.menuItems.selected);
  const [studentSubMenuOpen, setStudentSubMenuOpen] = useState(false);
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery("(max-width:480px)");

  useEffect(() => {
    setIsCollapsed(isMobile);
  }, [isMobile]);
  useEffect(() => {
    setStudentSubMenuOpen(false);
  }, [selected]);
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: theme.palette.mode === 'light' ? '#ffffff' : `${colors.primary[400]} !important`
        },
        "& .pro-icon-wrapper": {
          backgroundColor: `transparent !important`
        },
        "& .pro-inner-item": {
          padding: `4px 35px 4px 15px !important`
        },
        "& .pro-inner-item:hover": {
          color: `#868dfb !important`
        },
        "& .pro-menu-item.active": {
          color: `#6870fa !important`
        },
        "& .pro-arrow-wrapper": {
          marginRight: "50px"
        }

      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              color: colors.grey[100],
              margin: isMobile ? `10px 0px 10px 0` : `10px 0px 10px 20px !important`
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="5px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  {import.meta.env.VITE_COMPANY_NAME}
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* USER */}
          {!isCollapsed && (
            <Box mb="15px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  src={schoolImg}
                  style={{ cursor: "pointer", borderRadius: "0%", width: "60%" }}
                />
              </Box>
            </Box>
          )}
          {role === 'admin' && <>
            {/* MENU ITEMS */}
            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <SidebarItem
                title="Dashboard"
                to="/"
                icon={<HomeOutlinedIcon />}
                selected={selected}
              />

              {isCollapsed ? (
                <>
                  <SubMenu
                    title="Students"
                    icon={<PeopleOutlinedIcon />}
                    selected={selected}
                  >
                    <MenuItem style={{ marginLeft: "-15px",marginRight:"-15px" }}>PN</MenuItem>
                    <MenuItem style={{ marginLeft: "-15px",marginRight:"-15px" }}>NS </MenuItem>
                    <MenuItem style={{ marginLeft: "-15px",marginRight:"-15px" }}>LKG </MenuItem>
                    <MenuItem style={{ marginLeft: "-15px",marginRight:"-20px" }}>UKG</MenuItem>
                    <MenuItem style={{ marginLeft: "-15px",marginRight:"-15px" }}>I</MenuItem>
                    <MenuItem style={{ marginLeft: "-15px",marginRight:"-15px" }}>II </MenuItem>
                    <MenuItem style={{ marginLeft: "-15px",marginRight:"-15px" }}>III </MenuItem>
                    <MenuItem style={{ marginLeft: "-15px",marginRight:"-15px" }}>IV</MenuItem>
                    <MenuItem style={{ marginLeft: "-15px",marginRight:"-15px" }}>V</MenuItem>
                    <MenuItem style={{ marginLeft: "-15px",marginRight:"-15px" }}>VI </MenuItem>
                    <MenuItem style={{ marginLeft: "-15px",marginRight:"-15px" }}>VII</MenuItem>
                    <MenuItem style={{ marginLeft: "-15px",marginRight:"-15px" }}>VIII </MenuItem>
                    <MenuItem style={{ marginLeft: "-15px",marginRight:"-15px" }}>IX </MenuItem>
                    <MenuItem style={{ marginLeft: "-15px",marginRight:"-15px" }}>X </MenuItem>
                    <MenuItem style={{ marginLeft: "-15px",marginRight:"-15px" }}>XI </MenuItem>
                    <MenuItem style={{ marginLeft: "-15px",marginRight:"-15px" }}>XII </MenuItem>
                    
                  </SubMenu>

                </>
              ) :
                (
                  <SubMenu
                    title="Students"
                    icon={<PeopleOutlinedIcon />}
                    selected={selected}
                  >
                    <MenuItem><SchoolIcon sx={{ verticalAlign: "sub", marginLeft: "-1px", marginRight: "5px" }} /> Pre Nursery</MenuItem>
                    <MenuItem><SchoolIcon sx={{ verticalAlign: "sub", marginLeft: "-1px", marginRight: "5px" }} /> Nursery</MenuItem>
                    <MenuItem ><SchoolIcon sx={{ verticalAlign: "sub", marginLeft: "-1px", marginRight: "5px" }} /> Lower Kindergarden</MenuItem>
                    <MenuItem ><SchoolIcon sx={{ verticalAlign: "sub", marginLeft: "-1px", marginRight: "5px" }} /> Upper Kindergarden</MenuItem>
                    <MenuItem ><SchoolIcon sx={{ verticalAlign: "sub", marginLeft: "-1px", marginRight: "5px" }} /> Class I</MenuItem>
                    <MenuItem ><SchoolIcon sx={{ verticalAlign: "sub", marginLeft: "-1px", marginRight: "5px" }} /> Class II</MenuItem>
                    <MenuItem ><SchoolIcon sx={{ verticalAlign: "sub", marginLeft: "-1px", marginRight: "5px" }} /> Class III</MenuItem>
                    <MenuItem ><SchoolIcon sx={{ verticalAlign: "sub", marginLeft: "-1px", marginRight: "5px" }} /> Class IV</MenuItem>
                    <MenuItem ><SchoolIcon sx={{ verticalAlign: "sub", marginLeft: "-1px", marginRight: "5px" }} /> Class V</MenuItem>
                    <MenuItem ><SchoolIcon sx={{ verticalAlign: "sub", marginLeft: "-1px", marginRight: "5px" }} /> Class VI</MenuItem>
                    <MenuItem ><SchoolIcon sx={{ verticalAlign: "sub", marginLeft: "-1px", marginRight: "5px" }} /> Class VII</MenuItem>
                    <MenuItem ><SchoolIcon sx={{ verticalAlign: "sub", marginLeft: "-1px", marginRight: "5px" }} /> Class VIII</MenuItem>
                    <MenuItem ><SchoolIcon sx={{ verticalAlign: "sub", marginLeft: "-1px", marginRight: "5px" }} /> Class IX</MenuItem>
                    <MenuItem ><SchoolIcon sx={{ verticalAlign: "sub", marginLeft: "-1px", marginRight: "5px" }} /> Class X</MenuItem>
                    <MenuItem ><SchoolIcon sx={{ verticalAlign: "sub", marginLeft: "-1px", marginRight: "5px" }} /> Class XI</MenuItem>
                    <MenuItem ><SchoolIcon sx={{ verticalAlign: "sub", marginLeft: "-1px", marginRight: "5px" }} /> Class XII</MenuItem>
                   
                  </SubMenu>
                )
              }

              <SidebarItem
                title="Teacher"
                to="/teacher/listing"
                icon={<Diversity3Icon />}
                selected={selected}
              />
              <SidebarItem
                title="Employee"
                to="/employee/listing"
                icon={<Person2Icon/>}
                selected={selected}
              />
              <SidebarItem
                title="Time Table"
                to="/employee/listing"
                icon={<ReceiptLongIcon />}
                selected={selected}
              />
              <SidebarItem
                title="Class Subjects"
                to="/employee/listing"
                icon={<BorderColorIcon />}
                selected={selected}
              />
              <SidebarItem
                title="Attendance"
                to="/employee/listing"
                icon={<CalendarMonthIcon />}
                selected={selected}
              />
              <SidebarItem
                title="Holiday"
                to="/employee/listing"
                icon={<AirplaneTicketIcon />}
                selected={selected}
              />
              <SidebarItem
                title="Leave"
                to="/employee/listing"
                icon={<ExitToAppIcon />}
                selected={selected}
              />
              <SidebarItem
                title="Bus"
                to="/employee/listing"
                icon={<DirectionsBusIcon />}
                selected={selected}
              />
              <SidebarItem
                title="Marksheet"
                to="/employee/listing"
                icon={<FormatListBulletedIcon />}
                selected={selected}
              />
            </Box>
          </>}
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
