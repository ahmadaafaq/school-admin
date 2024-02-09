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
import { setStudents } from "../../redux/actions/StudentAction";
import { setMarksheetClass, setMarksheetSection } from "../../redux/actions/MarksheetAction";
import { tokens } from "../../theme";
import { useCommon } from "../hooks/common";
import { Utility } from "../utility";

//change name of dropdown to classsecdropdown
function DropDown({ onSelectClass, onSelectSection, selectedClass, selectedSection }) {
    const formClassesInRedux = useSelector(state => state.allFormClasses);
    const formSectionsInRedux = useSelector(state => state.allFormSections);

    const theme = useTheme();
    const dispatch = useDispatch();
    const colors = tokens(theme.palette.mode);
    const { getStudents } = useCommon();
    const { customSort, createUniqueDataArray, findById } = Utility();

    const handleClassChange = (event) => {
        const selectedClass = findById(event.target.value, formClassesInRedux?.listData);
        onSelectClass(selectedClass.class_id);
        dispatch(setMarksheetClass(selectedClass));
    };

    const handleSectionChange = (event) => {
        const selectedSection = findById(event.target.value, formSectionsInRedux?.listData);
        onSelectSection(selectedSection.id);
        dispatch(setMarksheetSection(selectedSection));
    };

    //to be dicsussed
    // useEffect(() => {
    //     if (!formClassesInRedux?.listData[0]?.class_subjects || !formClassesInRedux?.listData?.length || !formSectionsInRedux?.listData?.length) {
    //         API.SchoolAPI.getSchoolClasses()
    //             .then(classData => {
    //                 if (classData.status === 'Success') {
    //                     classData.data.sort(customSort);

    //                     const uniqueClassDataArray = createUniqueDataArray(classData.data, 'class_id', 'class_name');
    //                     dispatch(setFormClasses(uniqueClassDataArray));

    //                     const uniqueSectionDataArray = createUniqueDataArray(classData.data, 'section_id', 'section_name');
    //                     dispatch(setFormSections(uniqueSectionDataArray));
    //                 }
    //             })
    //             .catch(err => {
    //                 console.log("Error Fetching ClassData:", err);
    //             });
    //     }
    // }, [formClassesInRedux.listData.length, formSectionsInRedux.listData.length]);

    useEffect(() => {
        if (selectedClass && selectedSection) {
            getStudents(selectedClass, selectedSection, setStudents, API);
        }
    }, [selectedClass, selectedSection]);
    return (
        <Box sx={{ display: "flex", marginRight: "10px", marginLeft: "10px" }}>
            <FormControl variant="filled" sx={{
                minWidth: 120, marginRight: "10px",
                "& .MuiInputBase-root": {
                    height: "44px"
                }
            }}>
                <InputLabel id="classfield">Class</InputLabel>
                <Select
                    variant="filled"
                    labelId="classfield"
                    name="class_id"
                    value={selectedClass || ''}
                    onChange={handleClassChange}
                    sx={{ backgroundColor: colors.blueAccent[800] }}>
                    {formClassesInRedux?.listData?.length && formClassesInRedux.listData.map(cls => (
                        <MenuItem value={cls.class_id} key={cls.class_id}>
                            {cls.class_name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl variant="filled" sx={{
                minWidth: 120,
                "& .MuiInputBase-root": {
                    height: "44px"
                }
            }}>
                <InputLabel id="sectionfield">Section</InputLabel>
                <Select
                    variant="filled"
                    labelId="sectionfield"
                    name="section_id"
                    value={selectedSection || ''}
                    onChange={handleSectionChange}
                    sx={{ backgroundColor: colors.greenAccent[600] }}>
                    {formSectionsInRedux?.listData?.length && formSectionsInRedux.listData.map(section => (
                        <MenuItem value={section.section_id} key={section.section_id}>
                            {section.section_name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
};

export default DropDown;
