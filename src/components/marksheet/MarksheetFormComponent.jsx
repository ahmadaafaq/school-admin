/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import React, { useState, useEffect } from "react";

import { Box, InputLabel, MenuItem, FormHelperText, FormControl, FormControlLabel, colors } from "@mui/material";
import { Checkbox, Select, TextField, useMediaQuery } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useFormik } from "formik";

import API from "../../apis";
import marksheetValidation from "./Validation";
import { useSelector } from "react-redux";
import { Utility } from "../utility";

const initialValues = {
    class: "",
    section: "",
    name: "",
    subjects: [],
    term: "",
    marks_obtained: "",
    total_marks: "",
    grade: "",
    remark: "",
    result: "",

};

const UserFormComponent = ({
    onChange,
    refId,
    setDirty,
    reset,
    setReset,
    userId,
    updatedValues = null,
}) => {

    const { cls, section } = useSelector(state => state.allMarksheets);
    const [initialState, setInitialState] = useState(initialValues);
    const [subjects, setSubjects] = useState([]);
    const [filteredSubjects, setFilteredSubjects] = useState([]);

    const { listData } = useSelector(state => state.allClasses);
    const checkboxLabel = { inputProps: { 'aria-label': 'Checkboxes' } };
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isMobile = useMediaQuery("(max-width:480px)");
    const { findSubjectById } = Utility();

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: marksheetValidation,
        enableReinitialize: true,
        onSubmit: () => watchForm()
    });

    React.useImperativeHandle(refId, () => ({
        Submit: async () => {
            await formik.submitForm();
        }
    }));

    const watchForm = () => {
        if (onChange) {
            onChange({
                values: formik.values,
                validated: formik.isSubmitting
                    ? Object.keys(formik.errors).length === 0
                    : false
            });
        };
    };

    useEffect(() => {
        if (reset) {
            formik.resetForm();
            setReset(false);
        }
    }, [reset]);

    useEffect(() => {
        if (formik.dirty) {
            setDirty(true);
        }
    }, [formik.dirty]);

    useEffect(() => {
        if (updatedValues) {
            setInitialState(updatedValues);
        }
    }, [updatedValues]);

    useEffect(() => {
        const getsubjects = () => {
            API.SubjectAPI.getAll(false, 0, 30)
                .then(subjects => {
                    if (subjects.status === 'Success') {
                        setSubjects(subjects.data.rows);
                    } else {
                        console.log("Error, Please Try Again");
                    }
                })
                .catch(err => {
                    throw err;
                });
        };
        getsubjects();
    }, []);

    useEffect(() => {
        let yes = [];
        cls[0]?.subjects.split(',').map(sub => {
            yes.push(findSubjectById(parseInt(sub), subjects));
            console.log('selected sujects are=>', yes)
        })
        if (yes.length) {
            setFilteredSubjects(yes);
        }
    }, [subjects]);
    console.log(filteredSubjects, 'filter')

    return (
        <Box m="20px">
            <form ref={refId}>
                <Box
                    display="grid"
                    gap="10px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },marginBottom:"10px"
                    }}
                >
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="name"
                        label="Name*"
                        autoComplete="new-name"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        error={!!formik.touched.name && !!formik.errors.name}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="class"
                        label="Class"
                        autoComplete="new-class"
                        value={cls[0]?.name}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}

                    // value={formik.values.section}
                    // error={!!formik.touched.section && !!formik.errors.section}
                    // helperText={formik.touched.section && formik.errors.section}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="section"
                        label="Section"
                        autoComplete="new-section"
                        value={section}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    // value={formik.values.section}
                    // error={!!formik.touched.section && !!formik.errors.section}
                    // helperText={formik.touched.section && formik.errors.section}
                    />
                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.term && !!formik.errors.term}
                    >
                        <InputLabel id="termField">Term</InputLabel>
                        <Select
                            variant="filled"
                            labelId="termField"
                            label="Term"
                            name="term"
                            autoComplete="new-term"
                            value={formik.values.term}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value={"active"}>I</MenuItem>
                            <MenuItem value={"inactive"}>II</MenuItem>
                        </Select>
                        <FormHelperText>{formik.touched.result && formik.errors.term}</FormHelperText>
                    </FormControl>
                    <Box style={{ display: 'grid', gap: '10px', width:"84vh",  gridTemplateColumns:"repeat(2, minmax(0, 1fr))"  }}>
                        {filteredSubjects?.length && filteredSubjects.map((subject, index) => (
                            <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
                                <div>{subject}</div>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    autoComplete={`marks-${index}`}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.marks && formik.values.marks[index]}
                                />
                            </div>
                        ))}
                    </Box>
                </Box>
                <Box
                    display="grid"
                    gap="10px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                    }}
                >
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="marks_obtained"
                        label="Marks obtained*"
                        autoComplete="new-marks"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.marks_obtained}
                        error={!!formik.touched.marks_obtained && !!formik.errors.marks_obtained}
                        helperText={formik.touched.marks_obtained && formik.errors.marks_obtained}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="total_marks"
                        label="total marks*"
                        autoComplete="new-marks"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.total_marks}
                        error={!!formik.touched.total_marks && !!formik.errors.total_marks}
                        helperText={formik.touched.total_marks && formik.errors.total_marks}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="grade"
                        label="grade*"
                        autoComplete="new-grades"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.grade}
                        error={!!formik.touched.grade && !!formik.errors.grade}
                        helperText={formik.touched.grade && formik.errors.grade}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="remark"
                        label="remark"
                        autoComplete="new-remarks"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.remark}
                        error={!!formik.touched.remark && !!formik.errors.remark}
                        helperText={formik.touched.remark && formik.errors.remark}
                    />
                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.result && !!formik.errors.result}
                    >
                        <InputLabel id="resultField">result</InputLabel>
                        <Select
                            variant="filled"
                            labelId="resultField"
                            label="Result"
                            name="result"
                            autoComplete="new-result"
                            value={formik.values.result}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value={"active"}>Pass</MenuItem>
                            <MenuItem value={"inactive"}>Fail</MenuItem>
                        </Select>
                        <FormHelperText>{formik.touched.result && formik.errors.result}</FormHelperText>
                    </FormControl>
                </Box>
            </form >
        </Box >

    );
}

export default UserFormComponent;
