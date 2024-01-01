/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
*
* This software is the confidential information of School CRM Inc., and is licensed as
* restricted rights software. The use,reproduction, or disclosure of this software is subject to
* restrictions set forth in your license agreement with School CRM.
*/

import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar/dist";
import "react-pro-sidebar/dist/css/styles.css";

import { Box, IconButton, Typography, useTheme, useMediaQuery, Divider } from "@mui/material";
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
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman';
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ApiIcon from '@mui/icons-material/Api';
import AssistantIcon from '@mui/icons-material/Assistant';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import { Api, TuneOutlined } from '@mui/icons-material';

import API from "../../apis";
import { SidebarItem } from "./SidebarItem";
import { tokens } from "../../theme";
import { Utility } from "../utility";

import "../common/index.css";
import companyImg from "../assets/eden.jpg";
import dpsImg from "../assets/dps.png";

const Sidebar = ({ roleName, rolePriority }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [allClasses, setAllClasses] = useState([]);

  const selected = useSelector(state => state.menuItems.selected);
  const submenuRef = useRef(null);
  const isSubMenuOpen = useRef(false);
  const location = useLocation();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery("(max-width:480px)");
  const { getLocalStorage, remLocalStorage, addClassKeyword } = Utility();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (submenuRef.current && !submenuRef.current.contains(event.target)) {
        // Clicked outside the sidebar to close submenu
        console.log('japan');
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleSubMenu = () => {
    isSubMenuOpen.current = !isSubMenuOpen.current;
  };

  useEffect(() => {
    // const regex = /^\d+/;
    if (!location.pathname.startsWith('/student/')) {
      getLocalStorage('class') ? remLocalStorage('class') : null;
    }
  }, [location.pathname]);

  useEffect(() => {
    API.ClassAPI.getAll(false, 0, 20)
      .then(data => {
        if (data.status === 'Success') {
          setAllClasses(data.data.rows);
        } else {
          console.log("Error fetching classes, Please Try Again");
        }
      })
      .catch(err => {
        throw err;
      });
  }, []);

  useEffect(() => {
    setIsCollapsed(isMobile);
  }, [isMobile]);

  const renderNotCollapsedStudents = () => {
    return allClasses?.map(classs => (
      <SidebarItem
        key={classs.id}
        title={`${addClassKeyword(classs.name)}`}
        to={`/student/listing/${classs.id}`}
        icon={<SchoolIcon sx={{ verticalAlign: "sub", marginLeft: "-1px", marginRight: "5px" }} />}
        selected={selected}
        rolePriority={rolePriority}
        menuVisibility={4}
      />
    ));
  };

  const renderCollapsedStudents = () => {
    const classNames = ["PN", "NS", "LKG", "UKG", "KG", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

    return classNames.map((className, index) => (
      <SidebarItem
        key={index}
        title={`${className}`}
        selected={selected}
        rolePriority={rolePriority}
        menuVisibility={4}
        className={className}
      />
    ));
  };

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
        },
        "& .pro-menu-item.pro-sub-menu": {
          color: `${colors.primary[100]}`
        },
        "& .pro-inner-list-item": {
          height: `${isSubMenuOpen ? "100px" : "0"}` + " !important",
          overflow: isSubMenuOpen ? "scroll" : "hidden",
          transition: 'height 0.3s ease-in-out !important'
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
                  {rolePriority > 1 ? getLocalStorage("auth")?.designation.charAt(0).toUpperCase() + getLocalStorage("auth")?.designation.slice(1) :
                    'Company Name'}
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
                  src={rolePriority > 1 ? dpsImg : companyImg}
                  style={{ cursor: "pointer", borderRadius: "10%", width: "60%" }}
                />
              </Box>
            </Box>
          )}

          {/* MENU ITEMS */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <SidebarItem
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              rolePriority={rolePriority}
              menuVisibility={2}
            />
            <Divider />
            <SidebarItem
              title="School"
              to="/school/listing"
              icon={<SchoolIcon />}
              selected={selected}
              rolePriority={rolePriority}
              menuVisibility={1}
            />
            <Divider />

            <Box onClick={(event) => { event.stopPropagation(); toggleSubMenu(); }}>
              {isCollapsed && isSubMenuOpen.current ? (
                <SubMenu
                  title="Student"
                  icon={<PeopleOutlinedIcon />}
                >
                  <SidebarItem
                    title="All"
                    to="/student/listing"
                    selected={selected}
                    rolePriority={rolePriority}
                    menuVisibility={4}
                    className="All"
                  />
                  {renderCollapsedStudents()}
                </SubMenu>
              ) :
                (
                  <SubMenu
                    title="All Students"
                    icon={<PeopleOutlinedIcon />}
                    ref={submenuRef}
                  >
                    <SidebarItem
                      title="Student"
                      to="/student/listing"
                      icon={<PeopleOutlinedIcon />}
                      selected={selected}
                      rolePriority={rolePriority}
                      menuVisibility={4}
                    />
                    {renderNotCollapsedStudents()}
                  </SubMenu>
                )
              }
              <Divider />
            </Box>

            <SidebarItem
              title="Teacher"
              to="/teacher/listing"
              icon={<Diversity3Icon />}
              selected={selected}
              rolePriority={rolePriority}
              menuVisibility={3}
            />
            <Divider />
            <SidebarItem
              title="User"
              to="/user/listing"
              icon={<PregnantWomanIcon />}
              selected={selected}
              rolePriority={rolePriority}
              menuVisibility={3}
            />
            <Divider />
            <SidebarItem
              title="Bus"
              to="/bus/listing"
              icon={<DirectionsBusIcon />}
              selected={selected}
            />
            <Divider />
            {rolePriority < 2 && <>
              < Typography
                variant="h6"
                color={colors.grey[500]}
                sx={{ m: "15px 0 5px 10px" }}
              >
                Configurations
              </Typography>
              <SidebarItem
                title="Amenity"
                to="/amenity/listing"
                icon={<ApiIcon />}
                selected={selected}
                rolePriority={rolePriority}
                menuVisibility={1}
              />
              <Divider />
              <SidebarItem
                title="Class"
                to="/class/listing"
                icon={<BorderColorIcon />}
                selected={selected}
                rolePriority={rolePriority}
                menuVisibility={1}
              />
              <Divider />
              <SidebarItem
                title="Section"
                to="/section/listing"
                icon={<BorderColorIcon />}
                selected={selected}
                rolePriority={rolePriority}
                menuVisibility={1}
              />
              <Divider />
              <SidebarItem
                title="Subject"
                to="/subject/listing"
                icon={<BorderColorIcon />}
                selected={selected}
                rolePriority={rolePriority}
                menuVisibility={1}
              />
              <Divider />
              <SidebarItem
                title="Role"
                to="/role/listing"
                icon={<BorderColorIcon />}
                selected={selected}
                rolePriority={rolePriority}
                menuVisibility={1}
              />
               <SidebarItem
                title="Marksheet"
                to="/marksheet/listing"
                icon={<FormatListBulletedIcon />}
                selected={selected}
              />
              <Divider />
            </>}
            {/* <SidebarItem
                title="Time Table"
                to="/employee/listing"
                icon={<ReceiptLongIcon />}
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
            
              */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box >
  );
};

export default Sidebar;
