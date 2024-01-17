/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box, Button, Typography, useTheme } from '@mui/material';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

import API from "../../apis";
import { setClasses } from "../../redux/actions/ClassAction";
import { setSections } from "../../redux/actions/SectionAction";
import { tokens } from "../../theme";
import { Utility } from "../utility";
import { useCommon } from "../hooks/common";

export const datagridColumns = () => {
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const classesInRedux = useSelector(state => state.allClasses);
    const sectionsInRedux = useSelector(state => state.allSections);

    const navigateTo = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { getPaginatedData } = useCommon();
    const { appendSuffix, findStudentById, findClassById, findSectionById, findSubjectById } = Utility();

    const handleActionEdit = (id) => {
        navigateTo(`/marksheet/update/${id}`, { state: { id: id } });
    };

    useEffect(() => {
        if (!classesInRedux?.listData?.rows?.length) {
            getPaginatedData(0, 20, setClasses, API.ClassAPI);
        }
    }, [classesInRedux?.listData?.rows?.length]);

    useEffect(() => {
        if (!sectionsInRedux?.listData?.rows?.length) {
            getPaginatedData(0, 20, setSections, API.SectionAPI);
        }
    }, [sectionsInRedux?.listData?.rows?.length]);

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
                let className = params?.row?.class_id > 0 ? findClassById(params?.row?.class_id, classesInRedux?.listData?.rows) : '/';
                let sectionName = params?.row?.section_id > 0 ? findSectionById(params?.row?.section_id, sectionsInRedux?.listData?.rows) : '/';
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
