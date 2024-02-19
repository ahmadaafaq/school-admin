/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import React, { useState, useEffect } from "react";

import { Box, InputLabel, MenuItem, FormHelperText, FormControl, Alert } from "@mui/material";
import { Select, TextField, useMediaQuery } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import Snackbar from "@mui/material/Snackbar";
import { useFormik } from "formik";

import API from "../../apis";
import marksheetValidation from "./Validation";
// import { setSubjects } from "../../redux/actions/SubjectAction";
import { setStudents } from "../../redux/actions/StudentAction";
import { useSelector } from "react-redux";
import { Utility } from "../utility";
import { useCommon } from "../hooks/common";

const initialValues = {
    class: "",
    section: "",
    student: "",
    subjects: [],
    term: "",
    marks_obtained: "",
    total_marks: "",
    grade: "",
    remark: "",
    result: ""
};

const MarksheetFormComponent = ({
    onChange,
    refId,
    setDirty,
    reset,
    setReset,
    userId,
    updatedValues = null,
    student_id = null
}) => {

    const [initialState, setInitialState] = useState(initialValues);
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const subjectsInRedux = useSelector(state => state.allSubjects);
    const { marksheetClass, marksheetSection } = useSelector(state => state.allMarksheets);
    const studentInRedux = useSelector(state => state.allStudents);

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isMobile = useMediaQuery("(max-width:480px)");
    const { getPaginatedData, getStudents } = useCommon();
    const { findById, getLocalStorage } = Utility();
    const selectedClass = getLocalStorage("dropdown class");
    const selectedSection = getLocalStorage("dropdown section");

    const [state, setState] = useState({
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal } = state;

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: marksheetValidation,
        enableReinitialize: true,
        onSubmit: () => watchForm()
    });

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

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
            let subjectIds = [];
            updatedValues.rows.map((sub, index) => {
                formik.setFieldValue(`marks_obtained_${index}`, sub.marks_obtained);
                formik.setFieldValue(`total_marks_${index}`, sub.total_marks);
                formik.setFieldValue(`grade_${index}`, sub.grade);
                formik.setFieldValue(`remark_${index}`, sub.remark);
                subjectIds.push(sub.subject_id);
            })
            let classSubjects = [];
            subjectIds?.map(sub => {
                classSubjects.push({
                    subject_id: sub,
                    subject_name: findById(parseInt(sub), subjectsInRedux?.listData?.rows)?.name
                });
            })
            if (classSubjects.length) {
                setFilteredSubjects(classSubjects);
                formik.setFieldValue("class", updatedValues?.rows[0]?.class_id);
                formik.setFieldValue("section", updatedValues?.rows[0]?.section_id);
                formik.setFieldValue("student", updatedValues?.rows[0]?.student_id);
                getStudents(selectedClass?.class_id, selectedSection?.id, setStudents, API);
            }
        }
    }, [updatedValues]);

    useEffect(() => {
        let classSubjects = [];
        selectedClass?.class_subjects?.split(',').map(sub => {
            classSubjects.push({
                subject_id: sub,
                subject_name: findById(parseInt(sub), subjectsInRedux?.listData?.rows)?.name
            });
        })
        if (classSubjects.length) {
            setFilteredSubjects(classSubjects);
            initialValues.class = selectedClass?.class_name;
            initialValues.section = selectedSection?.name;
            initialValues.subjects = selectedClass?.class_subjects?.split(',');
            initialValues.student = formik.values.student;
            getStudents(selectedClass?.class_id, selectedSection?.id, setStudents, API);
        }

    }, [subjectsInRedux?.listData?.rows, selectedClass?.class_id]);

    if (updatedValues?.rows[0]?.term) {
        formik.values.term = updatedValues?.rows[0]?.term;
    }


    return (
        <Box m="20px">
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                key={vertical + horizontal}
            >
                <Alert sx={{ width: '100%' }} icon={<CheckIcon fontSize="inherit" />} severity="error" >
                    No Student Data
                </Alert>
            </Snackbar>
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
                        label="Class"
                        value={formik.values.class}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Section"
                        value={formik.values.section}
                    />
                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.student && !!formik.errors.student}
                    >
                        <InputLabel id="studentField">Student</InputLabel>
                        <Select
                            labelId="studentField"
                            name="student"
                            value={formik.values.student || student_id}
                            onChange={event => {
                                formik.setFieldValue("student", event.target.value);
                            }}
                        >
                            {studentInRedux?.listData?.rows?.length && studentInRedux.listData.rows.map(item => (
                                <MenuItem value={item.id} name={`${item.firstname} ${item.lastname}`} key={item.id}>
                                    {`${item.firstname} ${item.lastname}`}
                                </MenuItem>
                            ))}
                            {/* {students?.data?.map(student => {
                                return (
                                    <MenuItem key={student.id} value={student.id}>
                                        {student.firstname} {student.lastname}
                                    </MenuItem>
                                )
                            })} */}
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
                            name="term"
                            value={formik.values.term}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value={"I"}>I</MenuItem>
                            <MenuItem value={"II"}>II</MenuItem>
                            <MenuItem value={"III"}>III</MenuItem>
                        </Select>
                        <FormHelperText>{formik.touched.term && formik.errors.term}</FormHelperText>
                    </FormControl>
                </Box>
                <Box style={{ display: 'grid', gap: '10px', width: '171vh', gridTemplateColumns: 'repeat(1, minmax(0, 1fr))' }}>
                    {!updatedValues && filteredSubjects?.length && filteredSubjects.map((subject, index) => (
                        <div key={index} style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '10px', }}>
                            <Box style={{ width: "28vh", marginTop: "20px" }}>{subject?.subject_name}</Box>
                            {/* Add individual fields for each subject */}
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="text"
                                name={`marks_obtained_${index}`} // Use a unique name for each subject
                                label={`Marks obtained*`}
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
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values[`remark_${index}`]} // Use the index here
                                error={!!formik.touched[`remark_${index}`] && !!formik.errors[`remark_${index}`]}
                                helperText={formik.touched[`remark_${index}`] && formik.errors[`remark_${index}`]}
                                sx={{ width: "65vh", marginLeft: "-32vh" }}
                            />
                        </div>
                    ))}

                    {updatedValues && updatedValues?.rows.map((subject, index) => {
                        return (
                            <div key={index} style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '10px', }}>
                                <Box style={{ width: "28vh", marginTop: "20px" }}>
                                    {filteredSubjects.filter(sub => sub.subject_id === subject.subject_id)[0]?.subject_name}
                                </Box>
                                {/* Add individual fields for each subject */}
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    type="text"
                                    name={`marks_obtained_${index}`} // Use a unique name for each subject
                                    label={`Marks obtained*`}
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
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values[`remark_${index}`]} // Use the index here
                                    error={!!formik.touched[`remark_${index}`] && !!formik.errors[`remark_${index}`]}
                                    helperText={formik.touched[`remark_${index}`] && formik.errors[`remark_${index}`]}
                                    sx={{ width: "65vh", marginLeft: "-32vh" }}
                                />
                            </div>
                        )
                    })}
                </Box>

                {/* <Box display="grid"
                    gap="10px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }, marginTop: "30px"
                    }}>
                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.result && !!formik.errors.result}
                    >
                        <InputLabel id="resultField">Result</InputLabel>
                        <Select
                            variant="filled"
                            labelId="resultField"
                            name="result"
                            value={formik.values.result}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value={"pass"}>Pass</MenuItem>
                            <MenuItem value={"fail"}>Fail</MenuItem>
                            <MenuItem value={"not_declared_yet"}>Not Declared Yet</MenuItem>
                        </Select>
                        <FormHelperText>{formik.touched.result && formik.errors.result}</FormHelperText>
                    </FormControl>
                </Box> */}
            </form >
        </Box >

    );
}

export default MarksheetFormComponent;