/* eslint-disable react-hooks/exhaustive-deps */
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

import PropTypes from "prop-types";
import { Autocomplete, Box, Button, Paper, Typography, TextField, useMediaQuery, useTheme } from "@mui/material";
import ReplayIcon from '@mui/icons-material/Replay';

import API from "../../apis";
import classNames from "../modules";
import Search from "../common/Search";
import ServerPaginationGrid from '../common/Datagrid';

import { datagridColumns } from "./StudentConfig";
import { setAllSchools } from "../../redux/actions/SchoolAction";
import { setMenuItem } from "../../redux/actions/NavigationAction";
import { setStudents } from "../../redux/actions/StudentAction";
import { tokens } from "../../theme";
import { useCommon } from "../hooks/common";
import { Utility } from "../utility";

import listBg from "../assets/listBG.jpg"

const pageSizeOptions = [5, 10, 20];

const ListingComponent = ({ rolePriority = null }) => {
    const [schoolId, setSchoolId] = useState(null);
    const allSchools = useSelector(state => state.allSchools);
    const selected = useSelector(state => state.menuItems.selected);
    const { listData, loading } = useSelector(state => state.allStudents);

    const theme = useTheme();
    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const URLParams = useParams();
    const colors = tokens(theme.palette.mode);
    const isMobile = useMediaQuery("(max-width:480px)");
    const isTab = useMediaQuery("(max-width:920px)");

    //revisit for pagination
    const [searchFlag, setSearchFlag] = useState({ search: false, searching: false });
    const [oldPagination, setOldPagination] = useState();

    const { getPaginatedData } = useCommon();
    const { fetchAndSetAll, getLocalStorage, setLocalStorage } = Utility();
    const reloadBtn = document.getElementById("reload-btn");
    const schoolInfo = getLocalStorage("schoolInfo");
    const classId = URLParams ? URLParams.classId : null;       // grab class id from url

    let classConditionObj = classId ? {
        classId: classId
    } : null;

    const handleReload = () => {
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

    //on refresh autocomplete state gets empty so doing this
    useEffect(() => {
        if (schoolInfo?.encrypted_id) {
            API.CommonAPI.decryptText(schoolInfo)
                .then(result => {
                    if (result.status === 'Success') {
                        const selectSchool = allSchools?.listData.find(value => value.id === parseInt(result.data));
                        setSchoolId(selectSchool);
                    } else if (result.status === 'Error') {
                        console.log('Error Encrypting Data');
                    }
                });
        }
    }, [schoolInfo?.encrypted_id, allSchools?.listData]);

    useEffect(() => {
        classId ? setLocalStorage('class', classId) : null;
    }, [classId]);

    useEffect(() => {
        if (!allSchools?.listData?.length) {
            fetchAndSetAll(dispatch, setAllSchools, API.SchoolAPI);
        }
    }, [allSchools?.listData]);

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
            }}
        >
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
                    <Search
                        action={setStudents}
                        api={API.StudentAPI}
                        getSearchData={getPaginatedData}
                        oldPagination={oldPagination}
                        reloadBtn={reloadBtn}
                        setSearchFlag={setSearchFlag}
                    />

                    {rolePriority > 1 ? (
                        <Button
                            type="submit"
                            color="success"
                            variant="contained"
                            onClick={() => { navigateTo(`/student/create`) }}
                            sx={{ height: isTab ? "4vh" : "auto" }}
                        >
                            {classNames.includes(selected) ? 'Admission' : `Create New ${selected}`}
                        </Button>
                    ) : (
                        <Autocomplete
                            options={allSchools?.listData || []}
                            getOptionLabel={option => option.name}
                            disableCloseOnSelect
                            value={schoolId}
                            onChange={(event, value) => {
                                setSchoolId(value);
                                API.CommonAPI.encryptText({ data: value?.id })
                                    .then(result => {
                                        if (result.status === 'Success') {
                                            setLocalStorage("schoolInfo", result.data);
                                            getPaginatedData(0, 5, setStudents, API.StudentAPI);
                                        } else if (result.status === 'Error') {
                                            console.log('Error Encrypting Data');
                                        }
                                    });     //make decryption api for decrypting school_id .then(filter => from allachools matching schoolId to get it selected)
                            }}
                            sx={{ width: '280px', marginRight: '10px' }}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    label="Select School"
                                    sx={{
                                        fieldset: {
                                            border: "2px solid grey",
                                            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
                                        }
                                    }}
                                />
                            )}
                            PaperComponent={props => (
                                <Paper
                                    sx={{
                                        background: colors.blueAccent[700],
                                        color: colors.redAccent[400],
                                        fontSize: "25px",
                                        "&:hover": {
                                            border: "1px solid #00FF00",
                                            color: "gray",
                                            backgroundColor: "white"
                                        }
                                    }}
                                    {...props}
                                />
                            )}
                        />
                    )}
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
                action={setStudents}
                api={API.StudentAPI}
                getQuery={getPaginatedData}
                columns={datagridColumns(rolePriority)}
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
        </Box>
    );
};

ListingComponent.propTypes = {
    rolePriority: PropTypes.number
};

export default ListingComponent;
