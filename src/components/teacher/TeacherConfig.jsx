/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box, Button, Typography, useTheme } from '@mui/material';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

import API from "../../apis";
import { tokens } from "../../theme";
import { Utility } from "../utility";

export const datagridColumns = () => {
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [teacherDetail, setTeacherDetail] = useState([]);
    const [teacherIds, setTeacherIds] = useState([]);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const selected = useSelector(state => state.menuItems.selected);
    const navigateTo = useNavigate();
    const { appendSuffix, findClassById, findSectionById } = Utility();

    const handleActionEdit = (id) => {
        navigateTo(`/${selected.toLowerCase()}/update/${id}`, { state: { id: id } });
    };

    useEffect(() => {
        API.ClassAPI.getAll(false, 0, 20)
            .then(data => {
                if (data.status === 'Success') {
                    setClasses(data.data.rows);
                } else {
                    console.error("Error fetching classes. Please Try Again");
                }
            })
            .catch(err => {
                console.error("Error fetching classes:", err);
            });
    }, []);

    useEffect(() => {
        API.SectionAPI.getAll(false, 0, 20)
            .then(data => {
                if (data.status === 'Success') {
                    setSections(data.data.rows);
                } else {
                    console.error("Error fetching classes. Please Try Again");
                }
            })
            .catch(err => {
                console.error("Error fetching classes:", err);
            });
    }, []);

    // console.log(teacherIds, 'teacher');

    // const getTeacherDetailById = (teacherId) => {
    //     console.log('id', teacherId)
    //     API.TeacherAPI.getTeacherDetail(teacherId)
    //         .then(data => {
    //             if (data.status === 'Success' && data.data.length) {
    //                 console.log(data.data, 'teacher')
    //                 setTeacherDetail(data.data);
    //             } else {
    //                 console.error("Error fetching classes. Please Try Again");
    //             }
    //         })
    //         .catch(err => {
    //             console.error("Error fetching classes:", err);
    //         });
    // };

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
            field: "class",
            headerName: "CLASS",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 100,
            renderCell: (params) => {
                let className = params?.row?.class !== 0 ? findClassById(params?.row?.class, classes) : '/';
                let sectionName = findSectionById(params?.row?.section, sections);
                // params?.row?.class === 0 ? getTeacherDetailById(params.row.id) : null;
                return (
                    <div>
                        {appendSuffix(className)} {sectionName}
                    </div>
                );
            }
        },
        {
            field: "contact_no",
            headerName: "CONTACT",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 100
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
