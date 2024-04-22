/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { useState } from "react";
import PropTypes from 'prop-types';

import { Box, IconButton, InputBase, useMediaQuery, useTheme, Button } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import SearchIcon from "@mui/icons-material/Search";

import { tokens } from "../../theme";

const Search = ({
    getSearchData,
    handleReload,
    condition,
    setSearchFlag,
    reloadBtn,
    action,
    api
}) => {
    const [inputValue, setInputValue] = useState("");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isMobile = useMediaQuery("(max-width:480px)");
    const isTab = useMediaQuery("(max-width:920px)");

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSearch = () => {
        getSearchData(0, 5, action, api, condition, inputValue);
        setInputValue('');
        setSearchFlag({
            search: true,
            searching: true,
        });
        reloadBtn.style.display = "inline-flex";
    };

    //Search data by pressing down the enter key
    const handleKeyDown = (event) => {
        if (event.keyCode == 13) {
            handleSearch();
        }
    };

    return (
        <Box

            backgroundColor={colors.primary[400]}
            borderRadius="10px"
            width="40vw"
            height={isTab ? "4vh" : "auto"}
            position="relative"
        >
            <InputBase
                sx={{
                    ml: 2,
                    flex: 1,
                    width: "88%",
                    position: "absolute",
                    mt: isMobile ? 0 : 1
                }}
                placeholder="Search"
                id="input"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                autoComplete="off" // Add this attribute to disable suggestions
            />


            <Button
                sx={{
                    display: "none",
                    zIndex: 1,
                    borderRadius: "20%",
                    color: colors.grey[100],
                    float: "right",
                    marginRight: "30px",
                    marginTop: "6px"
                }}
                id="reload-btn"
                type="button"
                onClick={handleReload}
            >
                <span style={{ display: "inherit", marginRight: "5px" }}>
                    <ReplayIcon />
                </span>
                Back
            </Button>

            <IconButton sx={{
                p: 1,
                position: "absolute",
                top: isTab ? "0" : "6px",
                right: isTab ? "2px" : "2px",
                "&:hover": { backgroundColor: colors.greenAccent[600] }
            }}
                onClick={handleSearch}
            >
                <SearchIcon />
            </IconButton>
        </Box>
    );
}

Search.propTypes = {
    getSearchData: PropTypes.func,
    condition: PropTypes.any,
    setSearchFlag: PropTypes.func,
    reloadBtn: PropTypes.object,
    action: PropTypes.func,
    api: PropTypes.object
};

export default Search;
