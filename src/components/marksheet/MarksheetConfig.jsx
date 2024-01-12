/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Typography, useTheme } from '@mui/material';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

import API from "../../apis";
import { tokens } from "../../theme";
import { Utility } from "../utility";

export const datagridColumns = () => {
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigateTo = useNavigate();
    const { appendSuffix, findStudentById, findClassById, findSectionById, findSubjectById } = Utility();

    const handleActionEdit = (id) => {
        navigateTo(`/marksheet/update/${id}`, { state: { id: id } });
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

    useEffect(() => {
        API.SubjectAPI.getAll(false, 0, 20)
            .then(data => {
                if (data.status === 'Success') {
                    setSubjects(data.data.rows);
                } else {
                    console.error("Error fetching classes. Please Try Again");
                }
            })
            .catch(err => {
                console.error("Error fetching classes:", err);
            });
    }, []);

    useEffect(() => {
        API.StudentAPI.getAll(false, 0, 20)
            .then(data => {
                if (data.status === 'Success') {
                    setStudents(data.data.rows);
                } else {
                    console.error("Error fetching classes. Please Try Again");
                }
            })
            .catch(err => {
                console.error("Error fetching classes:", err);
            });
    }, []);

    const columns = [
        // {
        //     field: "roll no",
        //     headerName: "ROLL NO",
        //     headerAlign: "center",
        //     align: "center",
        //     flex: 1,
        //     minWidth: 120,
        // },
        {
            field: "NAME",
            headerName: "NAME",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 100,
            renderCell: (params) => {
                let studentName = params?.row?.student_id !== 0 ? findStudentById(params?.row?.student_id, students) : '/';
                return (
                    <div>
                        {studentName}
                    </div>
                );
            }
        },
        {
            field: "class",
            headerName: "CLASS",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 100,
            renderCell: (params) => {
                let className = params?.row?.class_id > 0 ? findClassById(params?.row?.class_id, classes) : '/';
                let sectionName = params?.row?.section_id > 0 ? findSectionById(params?.row?.section_id, sections) : '/';
                return (
                    <div>
                        {appendSuffix(className)} {sectionName}
                    </div>
                );
            }
        },
        {
            field: "subjects",
            headerName: "Subjects",
            headerAlign: "center",
            align: "center",
            flex: 2,
            minWidth: 120,
            renderCell: (params) => {
                let subjectName = params?.row?.subject_id > 0 ? findSubjectById(parseInt(params?.row?.subject_id), subjects) : '/';
                return (
                    <div>
                        {subjectName}
                    </div>
                );
            }
        },
        {
            field: "term",
            headerName: "Term",
            headerAlign: "center",
            align: "center",
            flex: 2,
            minWidth: 80,
        },
        {
            field: "result",
            headerName: "RESULT",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 120,
            renderCell: ({ row: { result } }) => {
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                            result === "pass"
                                ? colors.greenAccent[600]
                                : result === "fail"
                                    ? colors.redAccent[700]
                                    : result === "Not Declared Yet"
                                        ? colors.greenAccent[400]
                                        : colors.redAccent[700]
                        }
                        borderRadius="4px"
                    >
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            {result}
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
