/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

// import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box, Button, Typography, useTheme } from '@mui/material';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

//import API from "../../apis";
// import { setClasses } from "../../redux/actions/ClassAction";
// import { setSections } from "../../redux/actions/SectionAction";
import { tokens } from "../../theme";
import { Utility } from "../utility";
import { useCommon } from "../hooks/common";

export const datagridColumns = (rolePriority = null) => {
    const classesInRedux = useSelector(state => state.allClasses);
    const sectionsInRedux = useSelector(state => state.allSections);

    const navigateTo = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { getPaginatedData } = useCommon();
    const { appendSuffix, findById } = Utility();

    const handleActionEdit = (id) => {
        navigateTo(`/holiday/update/${id}`, { state: { id: id } });
    };

    const columns = [
        {
            field: "title",
            headerName: "Title",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 120,
        },
        {
            field: "date",
            headerName: "Date",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 100
        },
        {
            field: "note",
            headerName: "Notes",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 100
        },
        {
            field: "type",
            headerName: "Type",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 120,
            renderCell: ({ row: { type } }) => {
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                            type === "school_closure"
                                ? colors.greenAccent[600]
                                : type === "partial_closure"
                                    ? colors.redAccent[700]
                                    : type === "staff_only"
                                        ? colors.blueAccent[800]
                                        : colors.blueAccent[800]
                        }
                        borderRadius="4px"
                    >
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            {type}
                        </Typography>
                    </Box>
                );
            },
        },
        {
            field: "action",
            headerName: "ACTION",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 75,
            renderCell: ({ row: { id } }) => {
                return (
                    <Box width="30%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center">
                        <Button color="info" variant="contained"
                            disabled={rolePriority}
                            onClick={() => handleActionEdit(id)}
                            sx={{ minWidth: "50px" }}
                        >
                            <DriveFileRenameOutlineOutlinedIcon />
                        </Button>
                    </Box>
                );
            },
        }
    ];
    return columns;
};
