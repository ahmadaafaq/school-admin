/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
*
* This software is the confidential information of School CRM Inc., and is licensed as
* restricted rights software. The use,reproduction, or disclosure of this software is subject to
* restrictions set forth in your license agreement with School CRM.
*/

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar/dist";
import "react-pro-sidebar/dist/css/styles.css";

import { Box, IconButton, Typography, useTheme, useMediaQuery, Divider } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SchoolIcon from '@mui/icons-material/School';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import EventIcon from '@mui/icons-material/Event';
import PaymentIcon from '@mui/icons-material/Payment';
import amenityIcon from '../assets/amenityIcon.png';
import classIcon from '../assets/classIcon.png';
import sectionIcon from '../assets/sectionIcon.png'
import subjectIcon from '../assets/subjectIcon.png'
import roleIcon from '../assets/roleIcon.png'

import API from "../../apis";
import { setFormClasses } from "../../redux/actions/ClassAction";
import { SidebarItem } from "./SidebarItem";
import { tokens } from "../../theme";
import { Utility } from "../utility";

import "../common/index.css";
import companyImg from "../assets/eden.jpg";
import dpsImg from "../assets/dps.png";

const Sidebar = ({ rolePriority }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSubMenuOpen, setIsubMenuOpen] = useState(false);
  const selected = useSelector(state => state.menuItems.selected);
  const formClassesInRedux = useSelector(state => state.allFormClasses);

  const dispatch = useDispatch();
  const location = useLocation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery("(max-width:480px)");
  const isTab = useMediaQuery("(max-width:920px)");
  const { customSort, createUniqueDataArray, getLocalStorage, remLocalStorage, addClassKeyword } = Utility();

  const closeSubMenu = () => {
    if (isSubMenuOpen) {
      setIsubMenuOpen(false);
    }
  };

  useEffect(() => {
    // const regex = /^\d+/;
    if (!location.pathname.startsWith('/student/')) {
      getLocalStorage('class') ? remLocalStorage('class') : null;
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!formClassesInRedux?.listData?.length) {
      API.SchoolAPI.getSchoolClasses(16)
        .then(classData => {
          if (classData.status === 'Success') {
            classData.data.sort(customSort);
            const uniqueClassDataArray = createUniqueDataArray(classData.data, 'class_id', 'class_name');
            dispatch(setFormClasses(uniqueClassDataArray));
          } else {
            console.log("Error Fetching ClassData, Please Try Again");
          }
        })
        .catch(err => {
          console.log("Error Fetching ClassData:", err);
        });
    }
  }, [formClassesInRedux.listData.length]);

  useEffect(() => {
    setIsCollapsed(isMobile);
  }, [isMobile]);

  useEffect(() => {
    setIsCollapsed(isTab);
  }, [isTab]);

  const renderNotCollapsedStudents = () => {
    return formClassesInRedux?.listData?.length && formClassesInRedux.listData.map(classs => (
      <SidebarItem
        key={classs.class_id}
        title={`${addClassKeyword(classs.class_name)}`}
        to={`/student/listing/${classs.class_id}`}
        icon={<SchoolIcon sx={{ verticalAlign: "sub", marginLeft: "-1px", marginRight: "5px" }} />}
        selected={selected}
        rolePriority={rolePriority}
        menuVisibility={5}
        isSubMenu={true}
      />
    ));
  };

  const mapping = {
    'Pre Nursery': 'PN',
    'Nursery': 'N',
    'Upper Kindergarten': 'UKG',
    'Lower Kindergarten': 'LKG'
  };

  const renderCollapsedStudents = () => {
    return formClassesInRedux?.listData?.length && formClassesInRedux.listData.map(classs => (
      <SidebarItem
        key={classs.class_id}
        to={`/student/listing/${classs.class_id}`}
        icon={<span>{mapping[classs.class_name] || classs.class_name}</span>}
        selected={selected}
        rolePriority={rolePriority}
        menuVisibility={5}
        isSubMenu={true}
      />
    ));
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: theme.palette.mode === 'light' ? '#ffffff' : `${colors.primary[400]} !important`,
          overflow: isMobile ? "hidden" : ""
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
          height: `${isSubMenuOpen ? "115px" : "0"}` + " !important",
          overflowY: isSubMenuOpen ? "scroll" : "hidden",
          transition: 'height 0.3s ease-in-out !important'
        }
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square" onClick={(event) => closeSubMenu(event)}>
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
            <SidebarItem
              title="School"
              to="/school/listing"
              icon={<SchoolIcon />}
              selected={selected}
              rolePriority={rolePriority}
              menuVisibility={1}
            />
            {rolePriority < 5 ? (
              <Box>
                {isCollapsed && isSubMenuOpen ? (
                  <SubMenu onClick={(event) => event.stopPropagation()}
                    title="Student"
                    icon={<PeopleOutlinedIcon />}
                  >
                    <SidebarItem
                      title="Student"
                      to="/student/listing"
                      icon={<PeopleOutlinedIcon />}
                      selected={selected}
                      rolePriority={rolePriority}
                      menuVisibility={5}
                      isSubMenu={true}
                    />
                    {renderCollapsedStudents()}
                  </SubMenu>
                ) :
                  (
                    <SubMenu
                      title="All Students"
                      onClick={(event) => {
                        isSubMenuOpen ? setIsubMenuOpen(false) :
                          setIsubMenuOpen(true);
                        event.stopPropagation();
                      }}
                      open={isSubMenuOpen}
                      icon={<PeopleOutlinedIcon />
                      }
                    >
                      <SidebarItem
                        title="Student"
                        to="/student/listing"
                        icon={<PeopleOutlinedIcon />}
                        selected={selected}
                        rolePriority={rolePriority}
                        menuVisibility={5}
                        isSubMenu={true}
                      />
                      {renderNotCollapsedStudents()}
                    </SubMenu>
                  )}

              </Box>
            ) : (
              <SidebarItem
                title="Student"
                to="/student/listing"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                rolePriority={rolePriority}
                menuVisibility={5}
              />
            )}
            <Divider />
            <SidebarItem
              title="Teacher"
              to="/teacher/listing"
              icon={<Diversity3Icon />}
              selected={selected}
              rolePriority={rolePriority}
              menuVisibility={3}
            />
            <SidebarItem
              title="User"
              to="/user/listing"
              icon={<PregnantWomanIcon />}
              selected={selected}
              rolePriority={rolePriority}
              menuVisibility={3}
            />
            <SidebarItem
              title="Employee"
              to="/employee/listing"
              icon={<AssignmentIndIcon />}
              selected={selected}
              rolePriority={rolePriority}
              menuVisibility={3}
            />
            <SidebarItem
              title="Payment"
              to="/payment/listing"
              icon={<PaymentIcon />}
              selected={selected}
              rolePriority={rolePriority}
              menuVisibility={3}
            />
            <SidebarItem
              title="Bus"
              to="/bus/listing"
              icon={<DirectionsBusIcon />}
              selected={selected}
              rolePriority={rolePriority}
              menuVisibility={3}
            />
            <SidebarItem
              title="Holiday"
              to="/holiday/listing"
              icon={<EventIcon />}
              selected={selected}
              rolePriority={rolePriority}
              menuVisibility={5}
            />
            <SidebarItem
              title="Marksheet"
              to="/marksheet/listing"
              icon={<FormatListBulletedIcon />}
              selected={selected}
              rolePriority={rolePriority}
              menuVisibility={4}
            />
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
                icon={<img src={amenityIcon} height={35} width={35} />}
                selected={selected}
                rolePriority={rolePriority}
                menuVisibility={1}
              />
              <SidebarItem
                title="Class"
                to="/class/listing"
                icon={<img src={classIcon} height={25} width={25} />}
                selected={selected}
                rolePriority={rolePriority}
                menuVisibility={1}
              />
              <SidebarItem
                title="Section"
                to="/section/listing"
                icon={<img src={sectionIcon} height={25} width={25} />}
                selected={selected}
                rolePriority={rolePriority}
                menuVisibility={1}
              />
              <SidebarItem
                title="Subject"
                to="/subject/listing"
                icon={<img src={subjectIcon} height={25} width={25} />}
                selected={selected}
                rolePriority={rolePriority}
                menuVisibility={1}
              />
              <SidebarItem
                title="Role"
                to="/role/listing"
                icon={<img src={roleIcon} height={25} width={25} />}
                selected={selected}
                rolePriority={rolePriority}
                menuVisibility={1}
              />
            </>}
          </Box>
        </Menu>
      </ProSidebar>
    </Box >
  );
};

export default Sidebar;
