/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { MenuItem } from "react-pro-sidebar/dist";
import { Typography, useTheme, Divider } from "@mui/material";

import { setMenuItem } from "../../redux/actions/NavigationAction";
import { tokens } from "../../theme";
import { Utility } from "../utility";

export const SidebarItem = ({
    title,
    to,
    icon,
    selected,
    rolePriority,
    menuVisibility,
    className,
    handleClassClick = null,
    isSubMenu = false
}) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const colors = tokens(theme.palette.mode);
    const { setLocalStorage } = Utility();

    if (rolePriority > menuVisibility) { // 2 > 2
        return false;
    }

    return (
        <>
            <MenuItem
                active={title === selected}
                style={{
                    color: colors.grey[100],
                    marginLeft: className ? '-15px' : 'auto',
                    marginRight: className ? '-15px' : 'auto'
                }}
                onClick={(e) => {
                    if (isSubMenu) {
                        e.stopPropagation();
                    }
                    handleClassClick ? handleClassClick() : null;
                    dispatch(setMenuItem(title));
                    setLocalStorage("menu", { selected: title });
                }
                }
                icon={icon}
            >
                <Typography>{title}</Typography>
                <Link to={to} />
            </MenuItem>
            <Divider />
        </>
    );
};

SidebarItem.propTypes = {
    onChange: PropTypes.func,
    refId: PropTypes.shape({
        current: PropTypes.any
    }),
    setDirty: PropTypes.func,
    reset: PropTypes.bool,
    setReset: PropTypes.func,
    amenities: PropTypes.array,
    subjectsInRedux: PropTypes.array,
    updatedValues: PropTypes.object
};
