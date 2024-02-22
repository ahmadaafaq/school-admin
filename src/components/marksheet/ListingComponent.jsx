/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import PropTypes from "prop-types";
import { Box, Typography, Button, useMediaQuery, useTheme } from "@mui/material";
import ReplayIcon from '@mui/icons-material/Replay';

import API from "../../apis";
import DropDown from "../common/DropDown";
import Search from "../common/Search";
import ServerPaginationGrid from '../common/Datagrid';

import { datagridColumns } from "./MarksheetConfig";
import { setMenuItem } from "../../redux/actions/NavigationAction";
import { setMarksheets } from "../../redux/actions/MarksheetAction";
import { setMarksheetClass, setMarksheetSection } from "../../redux/actions/MarksheetAction";
import { tokens } from "../../theme";
import { useCommon } from "../hooks/common";
import { Utility } from "../utility";

import listBg from "../assets/listBG.jpg";

const pageSizeOptions = [5, 10, 20];

const ListingComponent = ({ rolePriority = null }) => {
    // const [conditionObj, setConditionObj] = useState({});
    const selected = useSelector(state => state.menuItems.selected);
    // const formClassesInRedux = useSelector(state => state.schoolClasses);
    // const formSectionsInRedux = useSelector(state => state.schoolSections);
    const { listData, loading, marksheetClass, marksheetSection } = useSelector(state => state.allMarksheets);

    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const isMobile = useMediaQuery("(max-width:480px)");
    const isTab = useMediaQuery("(max-width:920px)");

    //revisit for pagination
    const [searchFlag, setSearchFlag] = useState({ search: false, searching: false });
    const [oldPagination, setOldPagination] = useState();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const reloadBtn = document.getElementById("reload-btn");
    const { getPaginatedData } = useCommon();
    const { getLocalStorage, findById } = Utility();

    // const selectedClass = getLocalStorage("dropdown class");
    // const selectedSection = getLocalStorage("dropdown section");

    let classConditionObj = marksheetClass?.class_id ? {
        classId: marksheetClass.class_id
    } : null;

    classConditionObj = marksheetSection?.id ? {
        ...classConditionObj,
        sectionId: marksheetSection.id
    } : null;

    // useEffect(() => {
    //     console.log({ classConditionObj });
    //     if (classConditionObj?.classId && classConditionObj?.sectionId) {
    //         getPaginatedData(0, 5, setMarksheets, API.MarksheetAPI, classConditionObj);
    //         setConditionObj(classConditionObj);
    //     }
    // }, [classConditionObj?.classId, classConditionObj?.sectionId]);

    // useEffect(() => {
    //     if (listData?.rows?.length) {
    //         dispatch(setMarksheetClass(findById(listData.rows[0].class_id, formClassesInRedux?.listData)));
    //         dispatch(setMarksheetSection(findById(listData.rows[0].section_id, formSectionsInRedux?.listData)));
    //         console.log('SET CLASS AND SECTION');
    //     }
    // }, [listData?.rows]);

    const handleReload = () => {
        // getSearchData(oldPagination.page, oldPagination.pageSize, condition);
        reloadBtn.style.display = "none";
        setSearchFlag({
            search: false,
            searching: false,
            oldPagination
        });
    };

    useEffect(() => {
        const selectedMenu = getLocalStorage("menu");
        dispatch(setMenuItem(selectedMenu.selected));
    }, []);

    return (
        <Box m="8px" position="relative"
            sx={{
                borderRadius: "20px",
                border: "0.5px solid black",
                overflow: "hidden",
                boxShadow: "1px 1px 10px black",
                backgroundImage: theme.palette.mode === "light"
                    ? `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${listBg})`
                    : `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${listBg})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover"
            }}>
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
                    {/* <DropDown
                        marksheetClass={marksheetClass}
                        marksheetSection={marksheetSection}
                    /> */}
                    {rolePriority > 1 && (
                        <Button
                            type="submit"
                            color="success"
                            variant="contained"
                            onClick={() => navigateTo(`/marksheet/create`)}
                            sx={{ height: isTab ? "4vh" : "auto" }}
                        >
                            Create New {selected}
                        </Button>)}
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
                <span style={{ display: "inherit", marginRight: "5px" }}>
                    <ReplayIcon />
                </span>
                Back
            </Button>
            <ServerPaginationGrid
                action={setMarksheets}
                api={API.MarksheetAPI}
                getQuery={getPaginatedData}
                columns={datagridColumns(rolePriority)}
                rows={listData.rows}
                count={listData.count}
                loading={loading}
                selected={selected}
                pageSizeOptions={pageSizeOptions}
                setOldPagination={setOldPagination}
                searchFlag={searchFlag}
                setSearchFlag={setSearchFlag}
            // condition={conditionObj}
            />
        </Box>
    );
};

ListingComponent.propTypes = {
    rolePriority: PropTypes.number
};

export default ListingComponent;