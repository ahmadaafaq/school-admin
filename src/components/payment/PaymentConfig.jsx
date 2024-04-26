/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { useNavigate } from "react-router-dom";

import { Box, Button, Typography, useTheme } from '@mui/material';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

import { tokens } from "../../theme";
import { Utility } from "../utility";

export const datagridColumns = (rolePriority = null) => {
    const navigateTo = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { capitalizeEveryWord } = Utility();


    const handleActionEdit = (id) => {
        navigateTo(`/payment/update/${id}`, { state: { id: id } });
    };

    const columns = [
        {
            field: "fullname",
            headerName: " Name",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 120,
            valueGetter: (params) => {
                
                const firstName = params.row["student.firstname"] || "";
                const lastName = params.row["student.lastname"] || "";

                const capitalizedFirstName = capitalizeEveryWord(firstName);
                const capitalizedLastName = capitalizeEveryWord(lastName);

                const fullName = `${capitalizedFirstName} ${capitalizedLastName}`.trim();

                console.log(params.row);
                return fullName;
            }


        },
        {
            field: "academic_year",
            headerName: "Academic Year",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 120
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
                        <Typography color={colors.grey[100]} >
                        {capitalizeEveryWord(type) || ''}

                        </Typography>
                    </Box>
                );
            }
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
                        width="100%"
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
                        <Typography color={colors.grey[100]} >
                            {capitalizeEveryWord(payment_status) || ''}
                        </Typography>
                    </Box>
                );
            }
        },
        // {
        //     field: "payment_method",
        //     headerName: "Payment Method",
        //     headerAlign: "center",
        //     align: "center",
        //     flex: 1,
        //     minWidth: 120,
        //     renderCell: ({ row: { payment_method } }) => {
        //         return (
        //             <Box
        //                 width="100%"
        //                 m="0 auto"
        //                 p="5px"
        //                 display="flex"
        //                 justifyContent="center"
        //                 borderRadius="4px"
        //                 backgroundColor={
        //                     payment_method === "cash"
        //                         ? colors.greenAccent[600]
        //                         : payment_method === "credit card"
        //                             ? colors.redAccent[700]
        //                             : payment_method === "online transfer"
        //                                 ? colors.blueAccent[800]
        //                                 : colors.blueAccent[800]
        //                 }
        //             >
        //                 <Typography color={colors.grey[100]}>
        //                     {payment_method.charAt(0).toUpperCase() + payment_method.slice(1) || ''}
        //                 </Typography>
        //             </Box>
        //         );
        //     }
        // },
        rolePriority !== 1 && {
            field: "action",
            headerName: "Action",
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
            }
        }
    ];
    return columns;
};
