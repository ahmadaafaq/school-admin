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

export const datagridColumns = () => {
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

    // useEffect(() => {
    //     if (!classesInRedux?.listData?.rows?.length) {
    //         getPaginatedData(0, 20, setClasses, API.ClassAPI);
    //     }
    // }, [classesInRedux?.listData?.rows?.length]);

    // useEffect(() => {
    //     if (!sectionsInRedux?.listData?.rows?.length) {
    //         getPaginatedData(0, 20, setSections, API.SectionAPI);
    //     }
    // }, [sectionsInRedux?.listData?.rows?.length]);

    const columns = [
        {
            field: "fullname",
            headerName: "NAME",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 120,
            // this function combines the values of firstname and lastname into one string
            valueGetter: (params) => `${params.row.firstname || ''} ${params.row.lastname || ''}`
        },
        {
            field: "email",
            headerName: "Email",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 100
        },
        {
            field: "contact_no",
            headerName: "Contact No",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 100
        },
        {
            field: "role",
            headerName: "Role",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 100
        },
        {
            field: "dob",
            headerName: "DATE OF BIRTH",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 100
        },
        {
            field: "gender",
            headerName: "Gender",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 100
        },
        {
            field: "status",
            headerName: "STATUS",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 120,
            renderCell: ({ row: { status } }) => {
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                            status === "active"
                                ? colors.greenAccent[600]
                                : status === "inactive"
                                    ? colors.redAccent[700]
                                    : colors.redAccent[700]
                        }
                        borderRadius="4px"
                    >
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            {status}
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
