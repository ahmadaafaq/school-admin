/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, FormControl, InputLabel, Select, MenuItem, useTheme } from "@mui/material";

import API from "../../apis";
import { setFormClasses } from "../../redux/actions/ClassAction";
import { setFormSections } from "../../redux/actions/SectionAction";
import { setMarksheetClass, setMarksheetSection } from "../../redux/actions/MarksheetAction";
import { tokens } from "../../theme";
import { useCommon } from "../hooks/common";
import { Utility } from "../utility";

function DropDown({ onSelectClass, onSelectSection }) {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const formClassesInRedux = useSelector(state => state.allFormClasses);
    const formSectionsInRedux = useSelector(state => state.allFormSections);

    const theme = useTheme();
    const dispatch = useDispatch();
    const colors = tokens(theme.palette.mode);
    const { customSort, createUniqueDataArray, findById } = Utility();

    const handleClassChange = (event) => {
        const selectedClass = findById(event.target.value, formClassesInRedux?.listData);
        console.log(selectedClass, 'selected dropdown')
        setSelectedClass(event.target.value);
        onSelectClass(selectedClass);
        dispatch(setMarksheetClass(selectedClass));
    };

    const handleSectionChange = (event) => {
        const selectedSection = findById(event.target.value, formSectionsInRedux?.listData);
        setSelectedSection(event.target.value);
        onSelectSection(selectedSection?.name);
        dispatch(setMarksheetSection(selectedSection?.name));
    };

    useEffect(() => {
        if (!formClassesInRedux?.listData?.length || !formSectionsInRedux?.listData?.length || !formClassesInRedux?.listData[0]?.class_subjects) {
            console.log('inside dropdown component')
            API.SchoolAPI.getSchoolClasses(5)
                .then(classData => {
                    if (classData.status === 'Success') {
                        classData.data.sort(customSort);
                        console.log(classData.data, 'dropdown data')

                        const uniqueClassDataArray = createUniqueDataArray(classData.data, 'class_id', 'class_name', 'class_subjects');
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

    useEffect(() => {
        // Fetch students based on the selected class and section
        if (selectedClass && selectedSection) {
            API.StudentAPI.getStudentsByClass(selectedClass, selectedSection)
                .then(data => {
                    console.log(data, 'student marksheet data')
                    // dispatch(setMarksheetStudents(data));
                })
                .catch(err => {
                    console.error('Error fetching students:', err);
                })
        }
    }, [selectedClass, selectedSection]);

    return (
        <Box sx={{ display: "flex", marginRight: "10px", marginLeft: "10px" }}>
            <FormControl variant="filled" sx={{
                minWidth: 120, marginRight: "10px",
                "& .MuiInputBase-root": {
                    height: "44px",
                },
            }}>
                <InputLabel id="classfield">Class</InputLabel>
                <Select
                    variant="filled"
                    labelId="classfield"
                    label="class"
                    name="class"
                    autoComplete="new-class"
                    onChange={handleClassChange}
                    value={selectedClass}
                    sx={{
                        height: "12vh",
                        backgroundColor: colors.blueAccent[800]
                    }}>
                    {formClassesInRedux?.listData?.length && formClassesInRedux.listData.map(cls => (
                        <MenuItem value={cls.class_id} key={cls.class_name}>
                            {cls.class_name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl variant="filled" sx={{
                minWidth: 120, "& .MuiInputBase-root": {
                    height: "44px"
                },
            }}
            // error={!!school_id && !!errors.school_id}
            >
                <InputLabel id="sectionfield">Section</InputLabel>
                <Select
                    variant="filled"
                    labelId="sectionfield"
                    label="section"
                    name="section_id"
                    autoComplete="new-section_id"
                    onChange={handleSectionChange}
                    value={selectedSection}
                    sx={{
                        backgroundColor: colors.greenAccent[600]
                    }}
                >
                    {formSectionsInRedux?.listData?.length && formSectionsInRedux.listData.map(section => (
                        <MenuItem value={section.id} key={section.name}>
                            {section.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}

export default DropDown;
