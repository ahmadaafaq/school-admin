/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import React, { useState, useEffect } from "react";

import { Box, InputLabel, MenuItem, FormHelperText, FormControl } from "@mui/material";
import { Select, TextField, useMediaQuery } from "@mui/material";
import { useFormik } from "formik";

import API from "../../apis";
import marksheetValidation from "./Validation";
import { useSelector } from "react-redux";
import { Utility } from "../utility";

const initialValues = {
    school_id: "",
    class_id: "",
    section_id: "",
    student: "",
    name: "",
    subjects: [],
    term: "",
    marks_obtained: "",
    total_marks: "",
    grade: "",
    remark: "",
    result: ""

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

    const { cls, section, students } = useSelector(state => state.allMarksheets);
    const [initialState, setInitialState] = useState(initialValues);
    const [subjects, setSubjects] = useState([]);
    const [filteredSubjects, setFilteredSubjects] = useState([]);

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
        })
        if (yes.length) {
            setFilteredSubjects(yes);
            console.log("datasssss",students)
            initialValues.subjects = cls[0].subjects.split(',');
            initialValues.school_id = students.data[0].school_id;
            initialValues.class_id = cls[0].id;
            initialValues.section_id = students.data[0].section;
            initialValues.student = students.data[0].id;
        }
    }, [subjects]);
    console.log('ABCD', cls, students)

    return (
        <Box m="20px">
            <form ref={refId}>
                <Box
                    display="grid"
                    gap="10px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }, marginBottom: "10px"
                    }}
                >
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="class_id"
                        label="Class"
                        autoComplete="new-class_id"
                        value={cls[0]?.name}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={!!formik.touched.class_id && !!formik.errors.class_id}
                        helperText={formik.touched.class_id && formik.errors.class_id}
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
                        error={!!formik.touched.section && !!formik.errors.section}
                        helperText={formik.touched.section && formik.errors.section}
                    />
                    <FormControl variant="filled" sx={{ minWidth: 120 }}>
                        <InputLabel id="studentField">Student</InputLabel>
                        <Select
                            labelId="studentField"
                            label="Student"
                            name="student"
                            autoComplete="new-student"
                            value={formik.values.student}
                            onChange={formik.handleChange}
                        >
                            {students?.data?.map(student => {
                                return (
                                    <MenuItem key={student.id} value={student.id}>
                                        {student.firstname} {student.lastname}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                        <FormHelperText>{formik.touched.student && formik.errors.student}</FormHelperText>
                    </FormControl>
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
                            <MenuItem value={"I"}>I</MenuItem>
                            <MenuItem value={"II"}>II</MenuItem>
                            <MenuItem value={"III"}>III</MenuItem>
                        </Select>
                        <FormHelperText>{formik.touched.result && formik.errors.term}</FormHelperText>
                    </FormControl>
                </Box>
                <Box style={{ display: 'grid', gap: '10px', width: '171vh', gridTemplateColumns: 'repeat(1, minmax(0, 1fr))' }}>
                    {filteredSubjects?.length && filteredSubjects.map((subject, index) => (
                        <div key={index} style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '10px', }}>
                            <Box style={{ width: "28vh", marginTop: "20px" }}>{subject}</Box>
                            {/* Add individual fields for each subject */}
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="text"
                                name={`marks_obtained_${index}`} // Use a unique name for each subject
                                label={`Marks obtained*`}
                                autoComplete={`new-marks-${index}`}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values[`marks_obtained_${index}`]}
                                error={!!formik.touched[`marks_obtained_${index}`] && !!formik.errors[`marks_obtained_${index}`]}
                                helperText={formik.touched[`marks_obtained_${index}`] && formik.errors[`marks_obtained_${index}`]}
                                sx={{ width: "26vh" }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="text"
                                name={`total_marks_${index}`} // Use a unique name for each subject
                                label={`Total marks *`}
                                autoComplete={`new-marks-${index}`}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values[`total_marks_${index}`]}
                                error={!!formik.touched[`total_marks_${index}`] && !!formik.errors[`total_marks_${index}`]}
                                helperText={formik.touched[`total_marks_${index}`] && formik.errors[`total_marks_${index}`]}
                                sx={{ width: "26vh", marginLeft: "-41px" }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="text"
                                name={`grade_${index}`} // Use a unique name for each grade field
                                label={`Grade*`}
                                autoComplete={`new-grades-${index}`}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values[`grade_${index}`]} // Use the index here
                                error={!!formik.touched[`grade_${index}`] && !!formik.errors[`grade_${index}`]}
                                helperText={formik.touched[`grade_${index}`] && formik.errors[`grade_${index}`]}
                                sx={{ width: "15vh", marginLeft: "-14vh" }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="text"
                                name={`remark_${index}`} // Use a unique name for each remark field
                                label={`Remark`}
                                autoComplete={`new-remarks-${index}`}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values[`remark_${index}`]} // Use the index here
                                error={!!formik.touched[`remark_${index}`] && !!formik.errors[`remark_${index}`]}
                                helperText={formik.touched[`remark_${index}`] && formik.errors[`remark_${index}`]}
                                sx={{ width: "65vh", marginLeft: "-32vh" }}
                            />
                        </div>
                    ))}
                </Box>

                <Box display="grid"
                    gap="10px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }, marginTop: "30px"
                    }}>
                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.result && !!formik.errors.result}
                    >
                        <InputLabel id="resultField">result</InputLabel>
                        <Select
                            variant="outlined"
                            labelId="resultField"
                            label="Result"
                            name="result"
                            autoComplete="new-result"
                            value={formik.values.result}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value={"pass"}>Pass</MenuItem>
                            <MenuItem value={"fail"}>Fail</MenuItem>
                            <MenuItem value={"not_declared_yet"}>Not Declared Yet</MenuItem>
                        </Select>
                        <FormHelperText>{formik.touched.result && formik.errors.result}</FormHelperText>
                    </FormControl>
                </Box>
            </form >
        </Box >

    );
}

export default UserFormComponent;
