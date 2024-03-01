/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useFormik } from "formik";
import { Box, InputLabel, MenuItem, FormHelperText, FormControl, Alert } from "@mui/material";
import { Select, TextField, useMediaQuery } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import Snackbar from "@mui/material/Snackbar";

import API from "../../apis";
import marksheetValidation from "./Validation";

import { setMarksheetClassData } from "../../redux/actions/MarksheetAction";
import { setAllSubjects } from "../../redux/actions/SubjectAction";
import { setStudents } from "../../redux/actions/StudentAction";
import { useDispatch, useSelector } from "react-redux";
import { Utility } from "../utility";
import { useCommon } from "../hooks/common";

const initialValues = {
    student: "",
    class: "",
    section: "",
    term: "",
    result: "",
    subjects: [],
    marks_obtained: "",
    total_marks: "",
    grade: "",
    remark: "",
};

const MarksheetFormComponent = ({
    onChange,
    refId,
    setDirty,
    reset,
    setReset,
    userId,
    studentId = null,
    updatedValues = null
}) => {

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const allSubjects = useSelector(state => state.allSubjects);
    const allStudents = useSelector(state => state.allStudents);
    const { marksheetClassData } = useSelector(state => state.allMarksheets);

    const dispatch = useDispatch();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isMobile = useMediaQuery("(max-width:480px)");
    const { getStudents } = useCommon();
    const { findMultipleById, fetchAndSetAll } = Utility();

    const [state, setState] = useState({
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal } = state;

    const formik = useFormik({
        initialValues: initialValues,
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
        }
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


    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {
        // this will run when creating marksheet
        if (marksheetClassData?.classDataObj) {
            formik.setFieldValue("class", marksheetClassData.classDataObj.class_name);
            formik.setFieldValue("section", marksheetClassData.classDataObj.section_name);
            formik.setFieldValue("subjects", marksheetClassData.classDataObj.subject_ids.split(","));
            getStudents(marksheetClassData.classDataObj.class_id, marksheetClassData.classDataObj.section_id, setStudents, API);
        }
    }, [marksheetClassData?.classDataObj]);
    console.log(marksheetClassData, 'marksheetClassData in form')
    console.log(updatedValues, 'updated')


    useEffect(() => {
        if (!allSubjects?.listData?.length) {
            fetchAndSetAll(dispatch, setAllSubjects, API.SubjectAPI);
        }
    }, [allSubjects?.listData?.length]);

    useEffect(() => {
        if (updatedValues) {
            let subjectIds = [];
            updatedValues.map((sub, index) => {
                formik.setFieldValue(`marks_obtained_${index}`, sub.marks_obtained);
                formik.setFieldValue(`total_marks_${index}`, sub.total_marks);
                formik.setFieldValue(`grade_${index}`, sub.grade);
                formik.setFieldValue(`remark_${index}`, sub.remark);
                subjectIds.push(sub.subject_id);
            });
            const classSubjects = subjectIds?.length ? findMultipleById(subjectIds.join(','), allSubjects?.listData) : [];
            console.log(classSubjects, 'subjects');
            dispatch(setMarksheetClassData({
                selectedSubjects: classSubjects
            }));
        }
    }, [updatedValues]);








    // useEffect(() => {
    //     if (updatedValues) {
    //         console.log(updatedValues, 'these are updated values if condition')
    //         let subjectIds = [];
    //         updatedValues.rows.map((sub, index) => {
    //             formik.setFieldValue(`marks_obtained_${index}`, sub.marks_obtained);
    //             formik.setFieldValue(`total_marks_${index}`, sub.total_marks);
    //             formik.setFieldValue(`grade_${index}`, sub.grade);
    //             formik.setFieldValue(`remark_${index}`, sub.remark);
    //             subjectIds.push(sub.subject_id);
    //         })
    //         let classSubjects = [];
    //         subjectIds?.map(sub => {
    //             classSubjects.push({
    //                 subject_id: sub,
    //                 subject_name: findById(parseInt(sub), subjectsInRedux?.listData?.rows)?.name
    //             });
    //         })
    //         if (classSubjects.length) {
    //             setFilteredSubjects(classSubjects);
    //             formik.setFieldValue("class", updatedValues?.rows[0]?.class_id);
    //             formik.setFieldValue("section", updatedValues?.rows[0]?.section_id);
    //             formik.setFieldValue("student", updatedValues?.rows[0]?.studentId);
    //             getStudents(selectedClass?.class_id, selectedSection?.id, setStudents, API);
    //         }
    //     }
    // }, [updatedValues]);


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
                        value={formik.values.class || ''}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Section"
                        value={formik.values.section || ''}
                    />
                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.student && !!formik.errors.student}
                    >
                        <InputLabel id="studentField">Student</InputLabel>
                        <Select
                            labelId="studentField"
                            name="student"
                            value={formik.values.student || ''}
                            onChange={event => formik.setFieldValue("student", event.target.value)}
                        >
                            {!allStudents?.listData?.rows?.length ? null :
                                allStudents.listData.rows.map(item => (
                                    <MenuItem value={item.id} name={`${item.firstname} ${item.lastname}`} key={item.id}>
                                        {`${item.firstname} ${item.lastname}`}
                                    </MenuItem>
                                ))}
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
                    {!marksheetClassData?.selectedSubjects ? null :
                        marksheetClassData.selectedSubjects.map((subject, index) => (
                            <div key={index} style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '10px', }}>
                                <Box style={{ width: "28vh", marginTop: "20px" }}>{subject?.name}</Box>
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
                                    value={formik.values[`grade_${index}`]}
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
                                    value={formik.values[`remark_${index}`]}
                                    error={!!formik.touched[`remark_${index}`] && !!formik.errors[`remark_${index}`]}
                                    helperText={formik.touched[`remark_${index}`] && formik.errors[`remark_${index}`]}
                                    sx={{ width: "65vh", marginLeft: "-32vh" }}
                                />
                            </div>
                        ))}
                </Box>

                <FormControl variant="filled" sx={{ minWidth: 280, mt: 5 }}
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

                {/* <Box style={{ display: 'grid', gap: '10px', width: '171vh', gridTemplateColumns: 'repeat(1, minmax(0, 1fr))' }}>
                    {!updatedValues && filteredSubjects?.length && filteredSubjects.map((subject, index) => (
                        <div key={index} style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '10px', }}>
                            <Box style={{ width: "28vh", marginTop: "20px" }}>{subject?.subject_name}</Box>
                            Add individual fields for each subject
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
                                Add individual fields for each subject
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
                </Box> */}

            </form>
        </Box>
    );
};

MarksheetFormComponent.propTypes = {
    onChange: PropTypes.func,
    refId: PropTypes.shape({
        current: PropTypes.any
    }),
    setDirty: PropTypes.func,
    reset: PropTypes.bool,
    setReset: PropTypes.func,
    userId: PropTypes.number,
    studentId: PropTypes.number,
    updatedValues: PropTypes.array
};

export default MarksheetFormComponent;