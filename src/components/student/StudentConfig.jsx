/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box, Button, Typography, useTheme } from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

import API from "../../apis";
import BasicModal from "../common/CustomModal";

import { setFormClasses } from "../../redux/actions/ClassAction";
import { setFormSections } from "../../redux/actions/SectionAction";
import { tokens } from "../../theme";
import { Utility } from "../utility";

export const datagridColumns = () => {
    const [open, setOpen] = useState(false);
    const formClassesInRedux = useSelector(state => state.allFormClasses);
    const formSectionsInRedux = useSelector(state => state.allFormSections);

    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { appendSuffix, findById, customSort, createUniqueDataArray } = Utility();

    const handleActionEdit = (id) => {
        navigateTo(`/student/update/${id}`, { state: { id: id } });
    };

    const handleActionShow = (id) => {
        setOpen(true);
        navigateTo("#", { state: { id: id } });
    };

    useEffect(() => {
        if (!formClassesInRedux?.listData?.length || !formSectionsInRedux?.listData?.length) {
            API.SchoolAPI.getSchoolClasses(5)
                .then(classData => {
                    if (classData.status === 'Success') {
                        classData.data.sort(customSort);

                        const uniqueClassDataArray = createUniqueDataArray(classData.data, 'class_id', 'class_name');
                        dispatch(setFormClasses(uniqueClassDataArray));

                        const uniqueSectionDataArray = createUniqueDataArray(classData.data, 'id', 'name');
                        dispatch(setFormSections(uniqueSectionDataArray));
                    }
                })
                .catch(err => {
                    console.log("Error Fetching ClassData:", err);
                });
        }
    }, [formClassesInRedux.listData.length, formSectionsInRedux.listData.length]);

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
                let className = findById(params?.row?.class, formClassesInRedux?.listData)?.class_name;
                let sectionName = findById(params?.row?.section, formSectionsInRedux?.listData)?.name;
                return (
                    <div>
                        {className ? appendSuffix(className) : '/'} {sectionName}
                    </div>
                );
            }
        },
        {
            field: "blood_group",
            headerName: "Blood Group",
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
                    <Box width="85%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="space-around">
                        <Button color="info" variant="contained"
                            onClick={() => handleActionEdit(id)}
                            sx={{ minWidth: "50px" }}
                        >
                            <DriveFileRenameOutlineOutlinedIcon />
                        </Button>

                        <Button color="info" variant="contained"
                            onClick={() => handleActionShow(id)}
                            sx={{ minWidth: "50px" }}
                        >
                            <PreviewIcon />
                        </Button>
                        <BasicModal open={open} setOpen={setOpen} />
                    </Box>
                );
            },
        }
    ];
    return columns;
};
