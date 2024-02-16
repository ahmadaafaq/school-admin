/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Box, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar, GridToolbarContainer } from "@mui/x-data-grid";
import PostAddIcon from '@mui/icons-material/PostAdd';
import ImportComponent from "../models/ImportModel";

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
    selected,
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
    const [openImport, setOpenImport] = useState(false);

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

    // console.log({rows});

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
                    borderBottom: "none",
                    // minHeight: "100px !important"
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
                getRowId={row => selected === 'Class' ? row.class_id : (selected === 'Section' ? row.section_id : row.id)}
                rows={rows || []}
                columns={columns}
                loading={classNames.includes(selected) ? loading : loading}
                rowCount={rowCountState}
                components={{
                    Toolbar: () => (
                        <Box display="flex" >
                            <GridToolbar />
                            <GridToolbarContainer>
                                <Button sx={{ padding: "0px" }} onClick={() => setOpenImport(true)}>
                                    <PostAddIcon sx={{ marginRight: "5px" }} />Import
                                </Button>
                            </GridToolbarContainer>
                        </Box>
                    ),
                    LoadingOverlay: multipleSkeletons,
                    noRowsOverlay: EmptyOverlayGrid

                    // ... other components
                }}
                pagination
                ServerPaginationGrid
                paginationMode="server"
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={pageSizeOptions}
                keepNonExistentRowsSelected
            />

            {openImport && <ImportComponent openDialog={openImport} setOpenDialog={setOpenImport} />}
        </Box>
    );
};

export default ServerPaginationGrid;
