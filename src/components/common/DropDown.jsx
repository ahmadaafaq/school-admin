/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import API from "../../apis";
import { Utility } from "../utility";
import { setMarksheetClass, setMarksheetSection , setMarksheetStudents } from "../../redux/actions/MarksheetAction";

function DropDown() {
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');

    const dispatch = useDispatch();
    const { findSectionById } = Utility();

    const handleClassChange = (event) => {
        const selectedCls = classes.filter(value => value.id === event.target.value);
        console.log(event.target.value)
        setSelectedClass(event.target.value);
        dispatch(setMarksheetClass(selectedCls));
    };

    const handleSectionChange = (event) => {
        const selectedSection = findSectionById(event.target.value, sections);
        console.log(event.target.value)
        setSelectedSection(event.target.value);
        dispatch(setMarksheetSection(selectedSection));
    };

    useEffect(() => {
        // Fetch classes from the backend
        API.ClassAPI.getAll(false, 0, 17)
            .then(data => {
                console.log("HEyy", data.data.rows)
                setClasses(data.data.rows);
            })
            .catch((error) => console.error("Error fetching classes:", error));
    }, []);

    useEffect(() => {
        // Fetch sections based on the selected class
        if (classes) {
            API.SectionAPI.getAll()
                .then((data) => {
                    console.log('mai aagaya')
                    setSections(data.data.rows);
                })
                .catch((error) => console.error("Error fetching sections:", error));
        }
    }, [classes]);

    useEffect(() => {
    
        // Fetch students based on the selected class and section
        if (selectedClass && selectedSection) {
            API.StudentAPI.getStudentsByClassAndSection(selectedClass, selectedSection)
                .then((data) => {
                    console.log('Students:', data);
                    setStudents(data);
                    dispatch(setMarksheetStudents(data));
                })
                .catch((error) => console.error('Error fetching students:', error));
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
                <InputLabel id="classfield">Select Class</InputLabel>
                <Select
                    variant="filled"
                    labelId="classfield"
                    label="class"
                    name="class"
                    autoComplete="new-class"
                    onChange={handleClassChange}
                    value={selectedClass}
                    sx={{
                        backgroundColor: "white", height: "12vh"
                    }}>
                    {classes.length ? classes.map(item => (
                        <MenuItem value={item.id} key={item.name}>
                            {item.name}
                        </MenuItem>
                    ))
                        : null}
                </Select>
            </FormControl>
            <FormControl variant="filled" sx={{
                minWidth: 120, "& .MuiInputBase-root": {
                    height: "44px"
                },
            }}
            // error={!!school_id && !!errors.school_id}
            >
                <InputLabel id="sectionfield">Select Section</InputLabel>
                <Select
                    variant="filled"
                    labelId="sectionfield"
                    label="section"
                    name="section_id"
                    autoComplete="new-section_id"
                    onChange={handleSectionChange}
                    value={selectedSection}
                    sx={{ backgroundColor: "white" }}
                >
                    {sections?.length && sections.map(item => (
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
