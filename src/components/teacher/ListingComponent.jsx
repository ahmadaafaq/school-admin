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

import API from "../../apis";
import Search from "../common/Search";
import ServerPaginationGrid from '../common/Datagrid';

import { datagridColumns } from "./TeacherConfig";
import { setMenuItem } from "../../redux/actions/NavigationAction";
import { setTeachers } from "../../redux/actions/TeacherAction";
import { tokens } from "../../theme";
import { useCommon } from "../hooks/common";
import { Utility } from "../utility";

import listBg from "../assets/listBG.jpg";

const pageSizeOptions = [5, 10, 20];

const ListingComponent = ({ rolePriority = null }) => {
    const selected = useSelector(state => state.menuItems.selected);
    const { listData, loading } = useSelector(state => state.allTeachers);

    const theme = useTheme();
    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const isMobile = useMediaQuery("(max-width:480px)");
    const isTab = useMediaQuery("(max-width:920px)");

    //revisit for pagination
    const [searchFlag, setSearchFlag] = useState({ search: false, searching: false });
    const [oldPagination, setOldPagination] = useState();

    const { getPaginatedData } = useCommon();
    const { getLocalStorage } = Utility();
    const colors = tokens(theme.palette.mode);
    const reloadBtn = document.getElementById("reload-btn");
    const importBtn = true;
    const teacherImport = "teacher";

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //     useEffect(() => {
    //         let teacherIds = [];
    //         let updatePromises = [];
    //         if (listData?.rows) {
    //             listData.rows.map((item) => {
    //                 if (item.is_class_teacher === false) {
    //                     teacherIds.push(item.id);
    //                 }
    //             });
    //             console.log('teacher ids', teacherIds);
    //             updatePromises = teacherIds.map((id) => {
    //                 API.TeacherAPI.getTeacherDetail(id)
    //                     .then((detail) => {
    //                         if(detail.status === 'Success'){
    //                             console.log(detail, 'class sect')
    // setTeacherDetail({item.id: })
    //                         }
    //                     })
    //             });
    //         }
    //     }, [listData?.rows?.length])
    // useEffect(() => {
    //     API.TeacherAPI.getTeacherDetail()
    //         .then(classes => {
    //             if (classes?.status == "Success") {
    //                 setClassesData(classes?.data);
    //             }
    //         })
    //         .catch(err => {
    //             throw err;
    //         });
    // }, []);

    return (
        <Box m="10px" position="relative"
            sx={{
                borderRadius: "20px",
                border: "0.5px solid black",
                overflow: "hidden",
                boxShadow: "1px 1px 10px black",
                backgroundImage: theme.palette.mode === "light"
                    ? `linear-gradient(rgb(151 203 255 / 80%), rgb(151 203 255 / 80%)), url(${listBg})`
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
                        action={setTeachers}
                        api={API.TeacherAPI}
                        getSearchData={getPaginatedData}
                        oldPagination={oldPagination}
                        reloadBtn={reloadBtn}
                        setSearchFlag={setSearchFlag}
                    />
                    {rolePriority > 1 && (
                        <Button
                            type="submit"
                            color="success"
                            variant="contained"
                            onClick={() => { navigateTo(`/${selected.toLowerCase()}/create`) }}
                            sx={{ height: isTab ? "4vh" : "auto" }}
                        >
                            Create New {selected}
                        </Button>)}
                </Box>
            </Box>
            <ServerPaginationGrid
                action={setTeachers}
                api={API.TeacherAPI}
                getQuery={getPaginatedData}
                columns={datagridColumns(rolePriority)}
                rolePriority={rolePriority}
                rows={listData.rows}
                importBtn={importBtn}
                count={listData.count}
                loading={loading}
                selected={selected}
                pageSizeOptions={pageSizeOptions}
                setOldPagination={setOldPagination}
                searchFlag={searchFlag}
                setSearchFlag={setSearchFlag}
                imports={teacherImport}
            />
        </Box >
    );
};

ListingComponent.propTypes = {
    rolePriority: PropTypes.number
};

export default ListingComponent;
