/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/
import { useState, useEffect } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import API from "../../apis";
import { useDispatch } from "react-redux";
import { Utility } from "../utility";
import { setMarksheetClass, setMarksheetSection } from "../../redux/actions/MarksheetAction";

function DropDown({ classes, sections }) {
    const dispatch = useDispatch();
    const { findClassById , findSectionById } = Utility();

    const handleClassChange = (event) => {
        console.log("CASSES",classes,"BBBB",event.target.value )
        const selectedCl = findClassById(event.target.value, classes); // 7
        const selectedCls = classes.filter(value => value.id === event.target.value );
        dispatch(setMarksheetClass(selectedCls));
        console.log("data", selectedCls);
    };

    const handleSectionChange = (event) => {
        const selectedSection = findSectionById(event.target.value, sections);
        dispatch(setMarksheetSection(selectedSection));
        // setSelectedSection(event.target.value);
        // onClassSectionChange(selectedClass, event.target.value);
    };

    return (
        <Box sx={{ display: "flex", marginRight: "10px", marginLeft: "10px" }}>
            <FormControl variant="filled" sx={{ minWidth: 120, marginRight: "10px" }}
            // error={!!school_id && !!errors.school_id}
            >
                <InputLabel id="schoolField">Select Class</InputLabel>
                <Select
                    variant="filled"
                    labelId="classfield"
                    label="class"
                    name="school_id"
                    autoComplete="new-school_id"
                    onChange={handleClassChange}
                >
                    {classes?.map(item => (
                        <MenuItem value={item.id} name={item.name} key={item.id}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl variant="filled" sx={{ minWidth: 120 }}
            // error={!!school_id && !!errors.school_id}
            >
                <InputLabel id="schoolField">Select Section</InputLabel>
                <Select
                    variant="filled"
                    labelId="sectionfield"
                    label="section"
                    name="school_id"
                    autoComplete="new-school_id"
                    onChange={handleSectionChange}
                >
                    {sections?.map(item => (
                        <MenuItem value={item.id} name={item.name} key={item.name}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}

export default DropDown;
