/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useContext, useEffect, useState } from "react";

import { Avatar, Box, Divider, useTheme, IconButton, Tooltip, MenuItem } from "@mui/material";
import { Menu, ListItemIcon, Typography, useMediaQuery } from "@mui/material";

import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import Logout from '@mui/icons-material/Logout';

import { ColorModeContext, tokens } from "../../theme";
import { Utility } from "../utility";

const Topbar = ({ roleName }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [schoolName, setSchoolName] = useState('');
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const isMobile = useMediaQuery("(max-width:480px)");
  const isTab = useMediaQuery("(max-width:920px)");

  const { getInitials, getNameAndType, getLocalStorage } = Utility();
  const { username, role } = getNameAndType(roleName);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    localStorage.clear();
    location.reload();
  };

  useEffect(() => {
    setSchoolName(getLocalStorage("auth")?.school);
  }, [getLocalStorage("auth")]);

  return (
    <Box
      display="flex"
      textAlign="center"
      justifyContent="space-between"
      backgroundColor={theme.palette.mode === 'light' ? `white !important` : '#141b2d'}
      boxShadow="1px 1px 10px black"
      position="sticky"
      top="0px"
      zIndex="1000"
    >
      {/* ICONS */}
      <Box>
        <Typography
          sx={{
            m: "20px",
            fontSize: isMobile ? "15px" : isTab ? "30" : "40px",
            fontWeight: "bolder",
            textAlign: "center",
            textShadow: " 1px 8px 5px #aba8a8;",
            color: theme.palette.mode === 'light' ? `rgb(51 153 254) !important` : 'white',
            wordSpacing: "5px"
          }}
        >
          {schoolName ? schoolName : ''}
        </Typography>
      </Box>
      <Box display="flex"
        textAlign="center"
        justifyContent="flex-end" p={2}
        backgroundColor={theme.palette.mode === 'light' ? `white !important` : '#141b2d'}
      >
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <Tooltip title="Dark Mode">
              <DarkModeOutlinedIcon />
            </Tooltip>
          ) : (
            <Tooltip title="Light Mode">
              <LightModeOutlinedIcon />
            </Tooltip>
          )}
        </IconButton>
        <Tooltip title="Notifications">
          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>
        </Tooltip>
        {/* <Tooltip title="Settings">
          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton>
        </Tooltip>
        <PersonOutlinedIcon /> */}
        <Tooltip title="Account">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 1 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ padding: "2px", width: 36, height: 33, bgcolor: colors.grey[100] }}>
              {getInitials()}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose} sx={{ flexDirection: 'column' }}>
          <Box textAlign="center">
            <Typography
              variant="h3"
              color={colors.blueAccent[300]}
              fontWeight="bold"
              sx={{ m: "10px 0 4px 0" }}
            >
              {username}
            </Typography>
            <Typography variant="h5" color={colors.greenAccent[1000]}> {role} </Typography>
          </Box>

        </MenuItem>
        <Divider />
        <MenuItem onClick={handleSignOut} sx={{ color: colors.blueAccent[300], justifyContent: "center" }}>
          <ListItemIcon >
            <Logout fontSize="medium" sx={{ color: colors.blueAccent[300] }} />
          </ListItemIcon>
          <Typography variant="h5"> Logout </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Topbar;
