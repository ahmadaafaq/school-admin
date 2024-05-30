/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import PropTypes from "prop-types";
import { Box, FormControl, MenuItem, InputLabel, Select, Typography, useMediaQuery, useTheme } from "@mui/material";

import API from "../../apis";
import PaymentModal from "./FormInModalComponent";
import Search from "../common/Search";
import ServerPaginationGrid from '../common/Datagrid';

import { datagridColumns } from "./PaymentConfig";
import { setMenuItem } from "../../redux/actions/NavigationAction";
import { setAllClasses, setSchoolClasses } from "../../redux/actions/ClassAction";
import { setAllSections, setSchoolSections } from "../../redux/actions/SectionAction";
import { setStudents } from "../../redux/actions/StudentAction";
import { tokens } from "../../theme";
import { useCommon } from "../hooks/common";
import { Utility } from "../utility";

import listBg from "../assets/listBG.jpg";

const pageSizeOptions = [5, 10, 20];

const ListingComponent = ({ rolePriority = null }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [classSectionObj, setClassSectionObj] = useState(null);
    const [classData, setClassData] = useState([]);
    const schoolClasses = useSelector((state) => state.schoolClasses);
    const allClasses = useSelector((state) => state.allClasses);
    const schoolSections = useSelector((state) => state.schoolSections);
    const allSections = useSelector((state) => state.allSections);
    const selected = useSelector(state => state.menuItems.selected);
    const { listData, loading } = useSelector(state => state.allStudents);

    const theme = useTheme();
    const dispatch = useDispatch();
    const isMobile = useMediaQuery("(max-width:480px)");
    const isTab = useMediaQuery("(max-width:920px)");

    //revisit for pagination
    const [searchFlag, setSearchFlag] = useState({ search: false, searching: false });
    const [oldPagination, setOldPagination] = useState();

    const { getPaginatedData } = useCommon();
    const { fetchAndSetAll, fetchAndSetSchoolData, getLocalStorage } = Utility();
    const colors = tokens(theme.palette.mode);
    const reloadBtn = document.getElementById("reload-btn");

    let classConditionObj = classSectionObj?.class
        ? {
            classId: classSectionObj.class
        }
        : null;

    classConditionObj = classSectionObj?.section
        ? {
            ...classConditionObj,
            sectionId: classSectionObj.section
        }
        : null;

    useEffect(() => {
        const selectedMenu = getLocalStorage("menu");
        dispatch(setMenuItem(selectedMenu.selected));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!getLocalStorage("schoolInfo")) {
            if (!allClasses?.listData?.length) {
                fetchAndSetAll(dispatch, setAllClasses, API.ClassAPI);
            }
            if (!allSections?.listData?.length) {
                fetchAndSetAll(dispatch, setAllSections, API.SectionAPI);
            }
        }
        if (getLocalStorage("schoolInfo") && (!schoolClasses?.listData?.length || !schoolSections?.listData?.length || !classData?.length)) {
            fetchAndSetSchoolData(dispatch, setSchoolClasses, setSchoolSections, setClassData);
        }
    }, []);

    useEffect(() => {
        if (classSectionObj?.class && classSectionObj?.section) {
            getPaginatedData(0, 5, setStudents, API.StudentAPI, classConditionObj);
        }
    }, [classSectionObj?.class, classSectionObj?.section]);

    useEffect(() => {
        const getAndSetSections = () => {
            const classSections = classData?.filter(obj => obj.class_id === classSectionObj?.class) || [];
            const selectedSections = classSections.map(
                ({ section_id, section_name }) => ({ section_id, section_name })
            );
            console.log(classSectionObj, classConditionObj, classSections, selectedSections, classData, '5 value')
            dispatch(setSchoolSections(selectedSections));
        };
        getAndSetSections();
    }, [classSectionObj?.class, classData?.length]);

    // to set default class & section id in dropdowns
    useEffect(() => {
        if (listData?.rows?.length && !classSectionObj?.class && !classSectionObj?.section) {
            setClassSectionObj({
                ...classSectionObj,
                class: listData.rows[0].class,
                section: listData.rows[0].section
            });
        }
    }, [listData?.rows?.length]);

    return (
        <Box m="10px" position="relative"
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
                    >
                        {selected}
                    </Typography>
                    <FormControl
                        variant="filled"
                        sx={{ minWidth: 120, marginRight: "10px" }}
                    >
                        <InputLabel>Class</InputLabel>
                        <Select
                            variant="filled"
                            value={classSectionObj?.class || ""}
                            onChange={event =>
                                setClassSectionObj({
                                    ...classSectionObj,
                                    class: event.target.value
                                })
                            }
                            sx={{
                                height: "100%",
                                marginLeft: "1vh",
                                backgroundColor: colors.blueAccent[800],
                                "&:hover": {
                                    backgroundColor: colors.blueAccent[800]
                                }
                            }}
                        >
                            {allClasses?.listData?.length
                                ? allClasses.listData.map(cls => (
                                    <MenuItem value={cls.class_id} key={cls.class_id}>
                                        {cls.class_name}
                                    </MenuItem>
                                ))
                                : schoolClasses?.listData?.length
                                    ? schoolClasses.listData.map(cls => (
                                        <MenuItem value={cls.class_id} key={cls.class_id}>
                                            {cls.class_name}
                                        </MenuItem>
                                    ))
                                    : null}
                        </Select>
                    </FormControl>
                    <FormControl
                        variant="filled"
                        sx={{ minWidth: 120, height: isTab ? "4vh" : "auto" }}
                    >
                        <InputLabel>Section</InputLabel>
                        <Select
                            variant="filled"
                            value={classSectionObj?.section || ""}
                            onChange={event =>
                                setClassSectionObj({
                                    ...classSectionObj,
                                    section: event.target.value
                                })
                            }
                            sx={{
                                height: "100%",
                                marginRight: "1vh",
                                backgroundColor: colors.blueAccent[800],
                                "&:hover": {
                                    backgroundColor: colors.blueAccent[800]
                                }
                            }}
                        >
                            {allSections?.listData?.length
                                ? allSections.listData.map(section => (
                                    <MenuItem value={section.section_id} key={section.section_id}>
                                        {section.section_name}
                                    </MenuItem>
                                ))
                                : schoolSections?.listData?.length
                                    ? schoolSections.listData.map(section => (
                                        <MenuItem value={section.section_id} key={section.section_id}>
                                            {section.section_name}
                                        </MenuItem>
                                    ))
                                    : null}
                        </Select>
                    </FormControl>
                    <Search
                        action={setStudents}
                        api={API.StudentAPI}
                        getSearchData={getPaginatedData}
                        oldPagination={oldPagination}
                        reloadBtn={reloadBtn}
                        setSearchFlag={setSearchFlag}
                    />
                </Box>
            </Box>
            <ServerPaginationGrid
                action={setStudents}
                api={API.StudentAPI}
                getQuery={getPaginatedData}
                columns={datagridColumns(rolePriority, setOpenDialog)}
                condition={classConditionObj}
                rows={listData.rows}
                count={listData.count}
                loading={loading}
                selected={selected}
                pageSizeOptions={pageSizeOptions}
                setOldPagination={setOldPagination}
                searchFlag={searchFlag}
                setSearchFlag={setSearchFlag}
            />
            <PaymentModal openDialog={openDialog} setOpenDialog={setOpenDialog} />
        </Box>
    );
};

ListingComponent.propTypes = {
    rolePriority: PropTypes.number
};

export default ListingComponent;
