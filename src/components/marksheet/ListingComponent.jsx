/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Box, Typography, Button, useMediaQuery, useTheme } from "@mui/material";
import ReplayIcon from '@mui/icons-material/Replay';

import API from "../../apis";
import Search from "../common/Search";
import ServerPaginationGrid from '../common/Datagrid';

import { datagridColumns } from "./MarksheetConfig";
import { setMenuItem } from "../../redux/actions/NavigationAction";
import { setMarksheets } from "../../redux/actions/MarksheetAction";
import { tokens } from "../../theme";
import { useCommon } from "../hooks/common";
import { Utility } from "../utility";
import DropDown from "../common/DropDown";

const pageSizeOptions = [5, 10, 20];

const ListingComponent = () => {
    const theme = useTheme();
    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const URLParams = useParams();
    const isMobile = useMediaQuery("(max-width:480px)");
    const isTab = useMediaQuery("(max-width:920px)");

    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const selected = useSelector(state => state.menuItems.selected);
    const { listData } = useSelector(state => state.allMarksheets);

    //revisit for pagination
    const [searchFlag, setSearchFlag] = useState({ search: false, searching: false });
    const [oldPagination, setOldPagination] = useState();

    const { getPaginatedData } = useCommon();
    const { getLocalStorage } = Utility();
    const colors = tokens(theme.palette.mode);
    const reloadBtn = document.getElementById("reload-btn");
    const classId = URLParams ? URLParams.classId : null; // from url

    let classConditionObj = classId ? {
        key: 'classId',
        value: classId
    } : null;

    useEffect(() => {
        const selectedMenu = getLocalStorage("menu");
        dispatch(setMenuItem(selectedMenu.selected));
    }, []);

    useEffect(() => {
        // Fetch classes from the backend
        API.ClassAPI.getAll(false, 0, 17)
            .then((data) => {
                console.log("HEyy", data.data.rows)
                setClasses(data.data.rows);
            })
            .catch((error) => console.error("Error fetching classes:", error));
    }, []);

    useEffect(() => {
        // Fetch sections based on the selected class
        if (classes) {
            API.SectionAPI.getAll()
                .then((data) => {
                    setSections(data.data.rows);
                })
                .catch((error) => console.error("Error fetching sections:", error));
        }
    }, []);


    const handleReload = () => {
        // getSearchData(oldPagination.page, oldPagination.pageSize, condition);
        reloadBtn.style.display = "none";
        setSearchFlag({
            search: false,
            searching: false,
            oldPagination
        });
    };

    console.log('hjhkhj', classes, sections)
    return (
        <Box m="8px" position="relative">
            <Box
                height={isMobile ? "19vh" : isTab ? "8vh" : "11vh"}
                borderRadius="4px"
                padding={isMobile ? "1vh" : "2vh"}
                backgroundColor={colors.blueAccent[700]}
            >
                <Box
                    display="flex"
                    height={isMobile ? "16vh" : "7vh"}
                    flexDirection={isMobile ? "column" : "row"}
                    justifyContent={"space-between"}
                    alignItems={isMobile ? "center" : "normal"}
                >
                    <Typography
                        component="h2"
                        variant="h2"
                        color={colors.grey[100]}
                        fontWeight="bold"
                        marginRight="15px"
                    >
                        {selected}
                    </Typography>
                    <Search
                        action={setMarksheets}
                        api={API.MarksheetAPI}
                        getSearchData={getPaginatedData}
                        oldPagination={oldPagination}
                        reloadBtn={reloadBtn}
                        setSearchFlag={setSearchFlag}
                    />
                    {classes.length && sections.length &&
                        <DropDown classes={classes} sections={sections} />
                    }
                    <Button
                        type="submit"
                        color="success"
                        variant="contained"
                      
                        onClick={() => { navigateTo(`/marksheet/create`) }}
                        sx={{ height: isTab ? "4vh" : "auto" }}
                    >
                        Create New {selected}
                    </Button>
                </Box>
            </Box>
            <Button sx={{
                display: "none",
                position: "absolute",
                top: isMobile ? "23vh" : isTab ? "10.5vh" : "16.5vh",
                left: isMobile ? "80vw" : isTab ? "39.5vw" : "26vw",
                zIndex: 1,
                borderRadius: "20%",
                color: colors.grey[100]
            }}
                id="reload-btn"
                type="button"
                onClick={handleReload}
            >
                <span style={{ display: "inherit", marginRight: "5px", marginLeft: "-2px" }}>
                    <ReplayIcon />
                </span>
                Back
            </Button>
            <ServerPaginationGrid
                action={setMarksheets}
                api={API.MarksheetAPI}
                getQuery={getPaginatedData}
                columns={datagridColumns()}
                condition={classConditionObj}
                rows={listData.rows}
                count={listData.count}
                selected={selected}
                pageSizeOptions={pageSizeOptions}
                setOldPagination={setOldPagination}
                searchFlag={searchFlag}
                setSearchFlag={setSearchFlag}
            />

        </Box>
    );
};

export default ListingComponent;
