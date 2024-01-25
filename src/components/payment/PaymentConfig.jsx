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
        navigateTo(`/payment/update/${id}`, { state: { id: id } });
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
            field: "academic_year",
            headerName: "Academic Year",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 120,
        },
        {
            field: "amount",
            headerName: "Amount",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 100
        },
        {
            field: "due_date",
            headerName: "Due Date",
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
                            type === "school"
                                ? colors.greenAccent[600]
                                : type === "event"
                                    ? colors.redAccent[700]
                                    : type === "cycle stand"
                                        ? colors.blueAccent[800]
                                        : type === "bus"
                                            ? colors.blueAccent[900]
                                            : colors.blueAccent[900]
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
            field: "payment_status",
            headerName: "Payment Status",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 120,
            renderCell: ({ row: { payment_status } }) => {
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                            payment_status === "pending"
                                ? colors.greenAccent[600]
                                : payment_status === "partial"
                                    ? colors.redAccent[700]
                                    : payment_status === "full"
                                        ? colors.blueAccent[800]
                                        : colors.blueAccent[800]
                        }
                        borderRadius="4px"
                    >
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            {payment_status}
                        </Typography>
                    </Box>
                );
            },
        },
        {
            field: "payment_method",
            headerName: "Payment Method",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 120,
            renderCell: ({ row: { payment_method } }) => {
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                            payment_method === "cash"
                                ? colors.greenAccent[600]
                                : payment_method === "credit card"
                                    ? colors.redAccent[700]
                                    : payment_method === "online transfer"
                                        ? colors.blueAccent[800]
                                        : colors.blueAccent[800]
                        }
                        borderRadius="4px"
                    >
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            {payment_method}
                        </Typography>
                    </Box>
                );
            },
        },
        {
            field: "payment_date",
            headerName: "Payment Date",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 100
        },
        {
            field: "late_fee",
            headerName: "Late Fee",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 100
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
