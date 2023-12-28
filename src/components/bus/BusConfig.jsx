/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Box, Button, Typography, useTheme } from '@mui/material';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

import { tokens } from "../../theme";

export const datagridColumns = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const selected = useSelector(state => state.menuItems.selected);
    const navigateTo = useNavigate();

    const handleActionEdit = (id) => {
        navigateTo(`/${selected.toLowerCase()}/update/${id}`, { state: { id: id } });
    };

    const columns = [
        {
            field: "fullname",
            headerName: "NAME",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 120,
            // this function combines the values of firstname and lastname into one string
            renderCell: (params) => (
                <div>
                    {params.row.gender === 'female' ? `Mrs. ${params.row.firstname}` : `Mr. ${params.row.firstname}`} {params.row.lastname}
                </div>
            )
        },
        {
            field: "class",
            headerName: "CLASS",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 100
        },
        {
            field: "contact_no",
            headerName: "CONTACT",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 100
        },
        {
            field: "updated_at",
            headerName: "UPDATED AT",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 100,
            valueFormatter: params => params?.value.substring(0, 10)
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
