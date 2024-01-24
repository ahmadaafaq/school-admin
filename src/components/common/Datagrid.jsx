/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import classNames from '../modules';
import EmptyOverlayGrid from "./EmptyOverlayGrid";
import { multipleSkeletons } from "./LoadingSkeleton";
import { tokens } from "../../theme";

const ServerPaginationGrid = ({
    action,
    api,
    getQuery,
    condition = false,
    columns,
    rows,
    count,
    loading,
    pageSizeOptions,
    searchFlag,
    setOldPagination
}) => {
    const initialState = {
        page: 0,
        pageSize: 5 || 10 || 20
    };
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [paginationModel, setPaginationModel] = useState(initialState);
    const amenityLoading = useSelector(state => state.allAmenities.loading);
    const busLoading = useSelector(state => state.allBuses.loading);
    const marksheetLoading = useSelector(state => state.allMarksheets.loading);
    const classLoading = useSelector(state => state.allClasses.loading);
    const sectionLoading = useSelector(state => state.allSections.loading);
    const schoolLoading = useSelector(state => state.allSchools.loading);
    const studentLoading = useSelector(state => state.allStudents.loading);
    const subjectLoading = useSelector(state => state.allSubjects.loading);
    const teacherLoading = useSelector(state => state.allTeachers.loading);
    const userLoading = useSelector(state => state.allUsers.loading);
    const userRoleLoading = useSelector(state => state.allUserRoles.loading);
    const employeeLoading = useSelector(state => state.allEmployees.loading);
    const selected = useSelector(state => state.menuItems.selected);
    const classes = classNames;

    useEffect(() => {
        //TO BE REFACTORED
        if (!searchFlag.search && !searchFlag.searching) {
            getQuery(paginationModel.page, paginationModel.pageSize, action, api, condition);
            setOldPagination(paginationModel);
        } else if (searchFlag.oldPagination && !searchFlag.searching) {
            getQuery(searchFlag.oldPagination.page, searchFlag.oldPagination.pageSize, action, api, condition);
            setPaginationModel({
                page: searchFlag.oldPagination.page,
                pageSize: searchFlag.oldPagination.pageSize
            });
        }
    }, [selected, paginationModel.page, paginationModel.pageSize, searchFlag.searching]);

    useEffect(() => {
        setPaginationModel(initialState);
    }, [selected]);

    // Some API clients return undefined while loading
    // Following lines are here to prevent `rowCountState` from being undefined during the loading
    const [rowCountState, setRowCountState] = useState(count || 0);

    useEffect(() => {
        setRowCountState(() =>
            count ? count : 0,
        );
    }, [count, setRowCountState]);

    // console.log('pagina=>', paginationModel);

    return (
        <Box
            m="30px 0 0 0"
            // width="100vw"
            sx={{
                "& .MuiDataGrid-root": {
                    border: "none",
                    fontSize: "1rem"
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none"
                },
                "& .MuiDataGrid-cellCheckbox": {
                    borderBottom: "none"
                },
                "& .MuiDataGrid-cell:focus-within": {
                    outline: `1px solid ${colors.greenAccent[600]}`
                },
                "& .MuiDataGrid-cell:hover": {
                    color: colors.greenAccent[300]
                },
                "& .name-column--cell": {
                    color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: "none"
                },
                "& .MuiDataGrid-columnHeader": {
                    backgroundColor: colors.blueAccent[700],
                },
                "& .MuiDataGrid-virtualScroller": {
                    minHeight: 320
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.blueAccent[700]
                },
                "& .MuiCheckbox-root": {
                    color: `${colors.greenAccent[200]} !important`
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${colors.grey[100]} !important`
                },
            }}
        >
            <DataGrid
                autoHeight
                disableRowSelectionOnClick
                rows={rows || []}
                columns={columns}
                loading={selected === "Amenity" ? amenityLoading : selected === "Bus" ? busLoading : selected === "Marksheet" ? marksheetLoading : selected === "Class" ? classLoading
                    : selected === "Section" ? sectionLoading : selected === "School" ? schoolLoading : classNames.includes(selected) ?
                        studentLoading : selected === "Teacher" ? teacherLoading : selected === "Subject" ? subjectLoading
                            : selected === "Role" ? userRoleLoading : selected === "Employee" ? employeeLoading : userLoading}
                // loading={loading}
                rowCount={rowCountState}
                components={{
                    Toolbar: GridToolbar,
                    LoadingOverlay: multipleSkeletons,
                    noRowsOverlay: EmptyOverlayGrid
                }}
                pagination
                ServerPaginationGrid
                paginationMode="server"
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={pageSizeOptions}
                keepNonExistentRowsSelected
            />
        </Box>
    );
};

export default ServerPaginationGrid;
