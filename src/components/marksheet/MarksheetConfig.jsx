/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box, Button, Typography, useTheme } from '@mui/material';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

import API from "../../apis";
import { setSubjects } from "../../redux/actions/SubjectAction";
import { setStudents } from "../../redux/actions/StudentAction";
import { tokens } from "../../theme";
import { Utility } from "../utility";
import { useCommon } from "../hooks/common";

export const datagridColumns = () => {
    const formClassesInRedux = useSelector(state => state.allFormClasses);
    const formSectionsInRedux = useSelector(state => state.allFormSections);
    const subjectsInRedux = useSelector(state => state.allSubjects);
    const studentsInRedux = useSelector(state => state.allStudents);

    const dispatch = useDispatch();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigateTo = useNavigate();
    const { getPaginatedData } = useCommon();
    const { appendSuffix, findById } = Utility();

    const handleActionEdit = (id, student_id) => {
        navigateTo(`/marksheet/update/${id}`, { state: { id: id, student_id: student_id } });
    };

    // to be refactored
    // useEffect(() => {
    //     if (!formClassesInRedux?.listData?.length || !formSectionsInRedux?.listData?.length) {
    //         API.SchoolAPI.getSchoolClasses(5)
    //             .then(classData => {
    //                 if (classData.status === 'Success') {
    //                     classData.data.sort(customSort);

    //                     const uniqueClassDataArray = createUniqueDataArray(classData.data, 'class_id', 'class_name');
    //                     dispatch(setFormClasses(uniqueClassDataArray));

    //                     const uniqueSectionDataArray = createUniqueDataArray(classData.data, 'id', 'name');
    //                     dispatch(setFormSections(uniqueSectionDataArray));
    //                 }
    //             })
    //             .catch(err => {
    //                 console.log("Error Fetching ClassData:", err);
    //             });
    //     }
    // }, [formClassesInRedux.listData.length, formSectionsInRedux.listData.length]);

    useEffect(() => {
        if (!subjectsInRedux?.listData?.rows?.length) {
            getPaginatedData(0, 50, setSubjects, API.SubjectAPI);
        }
    }, [subjectsInRedux?.listData?.rows?.length]);

    useEffect(() => {
        if (!studentsInRedux?.listData?.rows?.length) {
            getPaginatedData(0, 50, setStudents, API.StudentAPI);
        }
    }, [studentsInRedux?.listData?.rows?.length]);

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
                let studentName = findById(params?.row?.student_id, studentsInRedux?.listData?.rows);
                return (
                    <div>
                        {studentName ? `${studentName.firstname} ${studentName.lastname}` : '/'}
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
                let className = findById(params?.row?.class_id, formClassesInRedux?.listData)?.class_name;
                let sectionName = findById(params?.row?.section_id, formSectionsInRedux?.listData)?.name;
                // handleClassChange(params?.row?.class_id);
                // handleSectionChange(params?.row?.section_id);
                return (
                    <div>
                        {className ? appendSuffix(className) : '/'} {sectionName}
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
                let subjectName = findById(parseInt(params?.row?.subject_id), subjectsInRedux?.listData?.rows)?.name;
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
            renderCell: ({ row: { id, student_id } }) => {
                return (
                    <Box width="30%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center">
                        <Button color="info" variant="contained"
                            onClick={() => handleActionEdit(id, student_id)}
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
