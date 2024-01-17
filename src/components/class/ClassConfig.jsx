/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Typography, useTheme } from '@mui/material';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

import API from "../../apis";
import { tokens } from "../../theme";
import { Utility } from "../utility";

export const datagridColumns = (handleDialogOpen) => {
    const [subjects, setSubjects] = useState([]);
    const navigateTo = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { findSubjectsById } = Utility();

    const handleActionEdit = (id) => {
        handleDialogOpen();
        navigateTo("#", { state: { id: id } });
    };

    useEffect(() => {
        const getsubjects = () => {
            API.SubjectAPI.getAll(false, 0, 30)
                .then(subjects => {
                    if (subjects.status === 'Success') {
                        setSubjects(subjects.data.rows);
                    } else {
                        console.log("Error, Please Try Again");
                    }
                })
                .catch(err => {
                    throw err;
                });
        };
        getsubjects();
    }, []);

    const columns = [
        {
            field: "name",
            headerName: "NAME",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 120
        },
        {
            field: "subjects",
            headerName: "SUBJECTS",
            headerAlign: "center",
            align: "center",
            flex: 2,
            minWidth: 120,
            renderCell: (params) => {
                const subjectIds = params?.row.subjects;
                const subjectNames = findSubjectsById(subjectIds, subjects).map(subject => subject.name);
                return (
                    <div style={{ width: '100%', height: "40px" }}>
                        {subjectNames.map((subject, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && ','}
                                {index > 0 && index % 3 === 0 && <br />}{subject}
                            </React.Fragment>
                        ))}
                    </div>
                );
            },
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
        // {
        //     field: "updated_at",
        //     headerName: "UPDATED AT",
        //     headerAlign: "center",
        //     align: "center",
        //     flex: 1,
        //     minWidth: 100,
        //     valueFormatter: params => params?.value.substring(0, 10)
        // },
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
