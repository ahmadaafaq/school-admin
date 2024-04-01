/* eslint-disable react-hooks/rules-of-hooks */
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

export const datagridColumns = (rolePriority = null) => {
    const navigateTo = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleActionEdit = (id) => {
        navigateTo(`/school-house/update/${id}`, { state: { id: id } });
    };

    const columns = [
        {
            field: "name",
            headerName: "Name",
            headerAlign: "center",
            align: "center",
            flex: 1,
            // width: 120,
            valueGetter: (params) => `${params.row.name.charAt(0).toUpperCase() + params.row.name.slice(1) || ''}` 
            
        },
        {
            field: "captainName",
            headerName: "Captain",
            headerAlign: "center",
            align: "center",
            flex: 1,
            // minWidth: 100
            valueGetter: (params) => {
                const nameParts = params.row.captainName.split(' ');
                const capitalizedParts = nameParts.map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase());
                return capitalizedParts.join(' ');
            }
             

        },
        {
            field: "viceCaptainNname",
            headerName: "Vice Captain",
            headerAlign: "center",
            align: "center",
            flex: 1,
            // minWidth: 100
            valueGetter: (params) => {
                const nameParts = params.row.viceCaptainNname.split(' ');
                const capitalizedParts = nameParts.map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase());
                return capitalizedParts.join(' ');
            }
             

        },
        {
            field: "teacherName",
            headerName: "Teacher Incharge",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 100,
            valueGetter: (params) => {
                const nameParts = params.row.teacherName.split(' ');
                const capitalizedParts = nameParts.map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase());
                return capitalizedParts.join(' ');
            }
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
                        {status.charAt(0).toUpperCase() + status.slice(1) || ''}
                        </Typography>
                    </Box>
                );
            }
        },
        rolePriority !== 1 && {
            field: "action",
            headerName: "ACTION",
            headerAlign: "center",
            align: "center",
            flex: 1,
            // minWidth: 75,
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
