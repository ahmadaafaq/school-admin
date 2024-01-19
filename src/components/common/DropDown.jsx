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
import { setClasses } from "../../redux/actions/ClassAction";
import { setSections } from "../../redux/actions/SectionAction";
import { setMarksheetClass, setMarksheetSection } from "../../redux/actions/MarksheetAction";
import { tokens } from "../../theme";
import { Utility } from "../utility";
import { useCommon } from "../hooks/common";

function DropDown({ onSelectClass, onSelectSection }) {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const classesInRedux = useSelector(state => state.allClasses);
    const sectionsInRedux = useSelector(state => state.allSections);

    const theme = useTheme();
    const dispatch = useDispatch();
    const colors = tokens(theme.palette.mode);
    const { getPaginatedData } = useCommon();
    const { findSectionById } = Utility();

    const handleClassChange = (event) => {
        const selectedClass = classesInRedux?.listData?.rows.find(cls => cls.id === event.target.value);
        setSelectedClass(event.target.value);
        onSelectSection(selectedClass);
        dispatch(setMarksheetClass(selectedClass));
    };

    const handleSectionChange = (event) => {
        const selectedSection = findSectionById(event.target.value, sectionsInRedux?.listData?.rows);
        setSelectedSection(event.target.value);
        onSelectClass(selectedSection);
        dispatch(setMarksheetSection(selectedSection));
    };

    useEffect(() => {
        getPaginatedData(0, 20, setClasses, API.ClassAPI);
        getPaginatedData(0, 20, setSections, API.SectionAPI);
    }, []);

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
                    {classesInRedux?.listData?.rows?.length && classesInRedux.listData.rows.map(item => (
                        <MenuItem value={item.id} key={item.name}>
                            {item.name}
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
                    {sectionsInRedux?.listData?.rows?.length && sectionsInRedux.listData.rows.map(item => (
                        <MenuItem value={item.id} key={item.name}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}

export default DropDown;
