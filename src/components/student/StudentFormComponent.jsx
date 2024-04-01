/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { useFormik } from "formik";
import { Box, InputLabel, MenuItem, FormHelperText, FormControl, FormControlLabel, Autocomplete } from "@mui/material";
import { Checkbox, Select, TextField, useMediaQuery } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

import API from "../../apis";
import Toast from "../common/Toast";
import studentValidation from "./Validation";

import { setSchoolClasses } from "../../redux/actions/ClassAction";
import { setSchoolSections } from "../../redux/actions/SectionAction";
import { setSchoolSubjects } from "../../redux/actions/SubjectAction";
import { Utility } from "../utility";

const initialValues = {
    session: "",
    firstname: "",
    lastname: "",
    mother_name: "",
    father_name: "",
    guardian: "",
    contact_no: "",
    email: "",
    class: "",
    section: "",
    subjects: [],
    dob: null,
    admission_date: null,
    admission_type: "regular",
    is_specially_abled: false,
    blood_group: "",
    birth_mark: "",
    religion: "",
    nationality: "",
    age: "",
    aadhaar_no: "",
    caste_group: "",
    gender: "",
    head: 0,
    status: "inactive",
    is_fee_waiver: false,
    fee_waiver_type: "",
    waived_fees: ""
};

const StudentFormComponent = ({
    onChange,
    refId,
    setDirty,
    reset,
    setReset,
    classData,
    setClassData,
    allSubjects,
    userId,
    iCardDetails,
    setICardDetails,
    updatedValues = null
}) => {
    const [initialState, setInitialState] = useState(initialValues);
    const schoolClasses = useSelector(state => state.schoolClasses);
    const schoolSections = useSelector(state => state.schoolSections);
    const schoolSubjects = useSelector(state => state.schoolSubjects);
    const toastInfo = useSelector(state => state.toastInfo);

    const dispatch = useDispatch();
    const genderRef = useRef();
    const checkboxLabel = { inputProps: { 'aria-label': 'Checkboxes' } };
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isMobile = useMediaQuery("(max-width:480px)");
    const { createSession, fetchAndSetSchoolData, getLocalStorage, getValuesFromArray, toastAndNavigate } = Utility();

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: studentValidation,
        enableReinitialize: true,
        validateOnBlur: true,        // Set to true to trigger validation on blur or on change
        validateOnChange: true,
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

    const validateHead = () => {
        const condition = { gender: formik.values.gender };
        API.StudentAPI.getAll(condition)
            .then(res => {
                if (res.status === 'Success') {
                    toastAndNavigate(dispatch, true, "warning", `Can not appoint Head ${formik.values.gender}`);
                }
            })
            .catch(err => {
                console.error("An error occurred in validate head function: ", err);
            });
    };

    const getAndSetSubjects = () => {
        const sectionSubjects = classData?.filter(obj => obj.class_id === formik.values.class && obj.section_id === formik.values?.section);
        const selectedSubjects = sectionSubjects ? getValuesFromArray(sectionSubjects[0]?.subject_ids, allSubjects) : [];
        dispatch(setSchoolSubjects(selectedSubjects));
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
        if (getLocalStorage("schoolInfo") && (!schoolSubjects?.listData?.length || !schoolClasses?.listData?.length || !schoolSections?.listData?.length)) {
            fetchAndSetSchoolData(dispatch, setSchoolClasses, setSchoolSections, setClassData);
        }
    }, []);


    useEffect(() => {
        const getAndSetSections = () => {
            const classSections = classData?.filter(obj => obj.class_id === formik.values.class) || [];
            const selectedSections = classSections.map(({ section_id, section_name }) => ({ section_id, section_name }));
            dispatch(setSchoolSections(selectedSections));
        };
        getAndSetSections();
    }, [formik.values?.class, classData?.length]);

    useEffect(() => {
        if (formik.values) {
            setICardDetails({
                ...iCardDetails,
                ...formik.values
            });
        }
    }, [formik.values]);

    useEffect(() => {
        const selectedClassId = parseInt(getLocalStorage("class"));
        if (selectedClassId) {
            formik.setFieldValue("class", selectedClassId);
        }
    }, [getLocalStorage("class")]);

    useEffect(() => {
        if (formik.values.section) {
            getAndSetSubjects();
        }
    }, [formik.values?.section, classData.length]);

    console.log("updatedvales>>>", updatedValues);

    return (
        <Box m="20px">
            <form ref={refId}>
                <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                    }}
                >
                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.session && !!formik.errors.session}
                    >
                        <InputLabel>Session*</InputLabel>
                        <Select
                            variant="filled"
                            name="session"
                            value={formik.values.session}
                            onChange={event => formik.setFieldValue("session", event.target.value)}
                        >
                            {createSession().map(session => (
                                <MenuItem value={session} name={session} key={session}>
                                    {session}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{formik.touched.session && formik.errors.session}</FormHelperText>
                    </FormControl>
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="firstname"
                        label="Firstname*"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.firstname}
                        error={!!formik.touched.firstname && !!formik.errors.firstname}
                        helperText={formik.touched.firstname && formik.errors.firstname}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="lastname"
                        label="Lastname*"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.lastname}
                        error={!!formik.touched.lastname && !!formik.errors.lastname}
                        helperText={formik.touched.lastname && formik.errors.lastname}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="mother_name"
                        label="Mother's Name*"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.mother_name}
                        error={!!formik.touched.mother_name && !!formik.errors.mother_name}
                        helperText={formik.touched.mother_name && formik.errors.mother_name}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="father_name"
                        label="Father's Name*"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.father_name}
                        error={!!formik.touched.father_name && !!formik.errors.father_name}
                        helperText={formik.touched.father_name && formik.errors.father_name}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="guardian"
                        label="Guardian If Any"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.guardian}
                        error={!!formik.touched.guardian && !!formik.errors.guardian}
                        helperText={formik.touched.guardian && formik.errors.guardian}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Contact Number*"
                        name="contact_no"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.contact_no}
                        error={!!formik.touched.contact_no && !!formik.errors.contact_no}
                        helperText={formik.touched.contact_no && formik.errors.contact_no}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Email"
                        name="email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={!!formik.touched.email && !!formik.errors.email}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="age"
                        label="Age*"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.age}
                        error={!!formik.touched.age && !!formik.errors.age}
                        helperText={formik.touched.age && formik.errors.age}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="aadhaar_no"
                        label="Aadhaar Number*"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.aadhaar_no}
                        error={!!formik.touched.aadhaar_no && !!formik.errors.aadhaar_no}
                        helperText={formik.touched.aadhaar_no && formik.errors.aadhaar_no}
                    />
                    <FormControlLabel label="Is Specially Abled" sx={{ gridColumn: isMobile ? "span 2" : "" }}
                        control={
                            <Checkbox {...checkboxLabel} color="default"
                                checked={formik.values.is_specially_abled ? true : false}
                                name="is_specially_abled"
                                onChange={(event, value) => formik.setFieldValue("is_specially_abled", value)}
                                value={formik.values.is_specially_abled}
                            />
                        } />
                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.gender && !!formik.errors.gender}
                    >
                        <InputLabel>Gender</InputLabel>
                        <Select
                            ref={genderRef}             //head ka issue hai
                            variant="filled"
                            name="gender"
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                        </Select>
                        <FormHelperText>{formik.touched.gender && formik.errors.gender}</FormHelperText>
                    </FormControl>
                    {userId && <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.head && !!formik.errors.head}
                    >
                        <InputLabel>{updatedValues?.gender === "male" ? "Head Boy" : updatedValues?.gender === "female" ? "Head Girl" : "Select Head of School"}</InputLabel>
                        <Select
                            variant="filled"
                            name="head"
                            value={formik.values.head}
                            onChange={event => {
                                if (formik.values.gender) {
                                    formik.setFieldValue("head", event.target.value);
                                    if (event.target.value == 1) {
                                        validateHead();
                                    }
                                } else {
                                    toastAndNavigate(dispatch, true, "info", "Please Select Gender");
                                }
                            }}
                        >
                            <MenuItem value={1}>Appoint</MenuItem>
                            <MenuItem value={0}>Remove</MenuItem>
                        </Select>
                        <FormHelperText>{formik.touched.head && formik.errors.head}</FormHelperText>
                    </FormControl>}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            format="DD MMMM YYYY"            //ex - 25 July 2023
                            views={['day', "month", "year"]}
                            label="Select Date Of Birth*"
                            name="dob"
                            value={formik.values.dob}
                            onChange={newDob => formik.setFieldValue("dob", newDob)}
                            slotProps={{
                                textField: {
                                    error: !!formik.touched.dob && !!formik.errors.dob,
                                    helperText: formik.touched.dob && formik.errors.dob
                                }
                            }}
                        />
                        <DatePicker
                            format="DD MMMM YYYY"
                            views={['day', "month", "year"]}
                            label="Select Admission Date*"
                            name="admission_date"
                            value={formik.values.admission_date}
                            onChange={new_admission_date => formik.setFieldValue("admission_date", new_admission_date)}
                            slotProps={{
                                textField: {
                                    error: !!formik.touched.admission_date && !!formik.errors.admission_date,
                                    helperText: formik.touched.admission_date && formik.errors.admission_date
                                }
                            }}
                        />
                    </LocalizationProvider>
                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.admission_type && !!formik.errors.admission_type}
                    >
                        <InputLabel>Admission Type*</InputLabel>
                        <Select
                            variant="filled"
                            name="admission_type"
                            value={formik.values.admission_type}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value="regular">Regular</MenuItem>
                            <MenuItem value="midsession">Midsession</MenuItem>
                        </Select>
                        <FormHelperText>{formik.touched.admission_type && formik.errors.admission_type}</FormHelperText>
                    </FormControl>
                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.class && !!formik.errors.class}
                    >
                        <InputLabel>Class*</InputLabel>
                        <Select
                            variant="filled"
                            name="class"
                            value={formik.values.class}
                            onChange={event => {
                                formik.setFieldValue("class", event.target.value);
                                if (formik.values.section) {        //if old values are there, clean them according to change
                                    formik.setFieldValue("section", '');
                                }
                                if (formik.values.subjects) {
                                    formik.setFieldValue("subjects", []);
                                }
                            }}
                        >
                            {!schoolClasses?.listData?.length ? null :
                                schoolClasses.listData.map(cls => (
                                    <MenuItem value={cls.class_id} name={cls.class_name} key={cls.class_id}>
                                        {cls.class_name}
                                    </MenuItem>
                                ))}
                        </Select>
                        <FormHelperText>{formik.touched.class && formik.errors.class}</FormHelperText>
                    </FormControl>
                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.section && !!formik.errors.section}
                    >
                        <InputLabel>Section*</InputLabel>
                        <Select
                            variant="filled"
                            name="section"
                            value={formik.values.section}
                            onChange={event => {
                                formik.setFieldValue("section", event.target.value);
                                if (formik.values.subjects) {
                                    formik.setFieldValue("subjects", []);
                                }
                            }}
                        >
                            {!schoolSections?.listData?.length ? null :
                                schoolSections.listData.map(section => (
                                    <MenuItem value={section.section_id} name={section.section_name} key={section.section_id}>
                                        {section.section_name}
                                    </MenuItem>
                                ))}
                        </Select>
                        <FormHelperText>{formik.touched.section && formik.errors.section}</FormHelperText>
                    </FormControl>
                    <Autocomplete
                        multiple
                        options={schoolSubjects?.listData || []}
                        getOptionLabel={option => option.name}
                        disableCloseOnSelect
                        value={formik.values.subjects}
                        onBlur={formik.handleBlur}
                        onChange={(event, value) => formik.setFieldValue("subjects", value)}
                        sx={{ gridColumn: "span 2" }}
                        renderInput={params => (
                            <TextField
                                {...params}
                                variant="filled"
                                type="text"
                                name="subjects"
                                label="Subjects*"
                                onBlur={formik.handleBlur}
                                error={!!formik.touched.subjects && !!formik.errors.subjects}
                                helperText={formik.touched.subjects && formik.errors.subjects}
                            />
                        )}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="blood_group"
                        label="Blood Group"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.blood_group}
                        error={!!formik.touched.blood_group && !!formik.errors.blood_group}
                        helperText={formik.touched.blood_group && formik.errors.blood_group}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="birth_mark"
                        label="Birth Mark"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.birth_mark}
                        error={!!formik.touched.birth_mark && !!formik.errors.birth_mark}
                        helperText={formik.touched.birth_mark && formik.errors.birth_mark}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="religion"
                        label="Religion"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.religion}
                        error={!!formik.touched.religion && !!formik.errors.religion}
                        helperText={formik.touched.religion && formik.errors.religion}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="nationality"
                        label="Nationality"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.nationality}
                        error={!!formik.touched.nationality && !!formik.errors.nationality}
                        helperText={formik.touched.nationality && formik.errors.nationality}
                    />
                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.caste_group && !!formik.errors.caste_group}
                    >
                        <InputLabel>Caste Group</InputLabel>
                        <Select
                            variant="filled"
                            name="caste_group"
                            value={formik.values.caste_group}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value="general">General</MenuItem>
                            <MenuItem value="obc">OBC</MenuItem>
                            <MenuItem value="sc">SC</MenuItem>
                            <MenuItem value="st">ST</MenuItem>
                        </Select>
                        <FormHelperText>{formik.touched.caste_group && formik.errors.caste_group}</FormHelperText>
                    </FormControl>
                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.status && !!formik.errors.status}
                    >
                        <InputLabel>Status</InputLabel>
                        <Select
                            variant="filled"
                            name="status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                        </Select>
                        <FormHelperText>{formik.touched.status && formik.errors.status}</FormHelperText>
                    </FormControl>

                    <Box
                        sx={{
                            border: '2px solid #BADFE7', borderRadius: '12px', display: "grid", gap: "10px", alignItems: 'center',
                            width: formik.values.fee_waiver_type === "partial" && formik.values.is_fee_waiver ? '900px' :
                                formik.values.is_fee_waiver ? '600px' : '290px', height: '70px', padding: '5px',
                            gridTemplateColumns: formik.values.fee_waiver_type === "partial" && formik.values.is_fee_waiver ? "repeat(3, minmax(0, 1fr))" :
                                formik.values.is_fee_waiver ? "repeat(2, minmax(0, 1fr))" : '1fr'
                        }}
                    >
                        <FormControlLabel
                            label="Is Fee Waiver"
                            sx={{ gridColumn: isMobile ? "span 2" : "", margin: 'auto 0px' }}
                            control={
                                <Checkbox
                                    {...checkboxLabel}
                                    color="default"
                                    checked={formik.values.is_fee_waiver}
                                    name="is_fee_waiver"
                                    onChange={(event, value) => {
                                        formik.setFieldValue("is_fee_waiver", value);
                                        if (formik.values.is_fee_waiver) {
                                            formik.setFieldValue("fee_waiver_type", "");
                                            formik.setFieldValue("waived_fees", "");
                                        }
                                    }}
                                />
                            }
                        />
                        {formik.values.is_fee_waiver && (
                            <FormControl
                                variant="filled" sx={{ minWidth: 120 }}
                                error={!!formik.touched.fee_waiver_type && !!formik.errors.fee_waiver_type}
                            >
                                <InputLabel>Fee Waiver Type</InputLabel>
                                <Select
                                    variant="filled"
                                    name="fee_waiver_type"
                                    value={formik.values.fee_waiver_type}
                                    onChange={formik.handleChange}
                                >
                                    <MenuItem value="partial">Partial</MenuItem>
                                    <MenuItem value="full">Full</MenuItem>
                                </Select>
                                <FormHelperText>{formik.touched.fee_waiver_type && formik.errors.fee_waiver_type}</FormHelperText>
                            </FormControl>
                        )}
                        {formik.values.fee_waiver_type === "partial" && formik.values.is_fee_waiver && (
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                name="waived_fees"
                                label="Waived Fees (in rupees)"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.waived_fees}
                                error={!!formik.touched.waived_fees && !!formik.errors.waived_fees}
                                helperText={formik.touched.waived_fees && formik.errors.waived_fees}
                            />
                        )}
                    </Box>
                </Box>
            </form>
            <Toast alerting={toastInfo.toastAlert}
                severity={toastInfo.toastSeverity}
                message={toastInfo.toastMessage}
            />
        </Box>
    );
};

StudentFormComponent.propTypes = {
    onChange: PropTypes.func,
    refId: PropTypes.shape({
        current: PropTypes.any
    }),
    setDirty: PropTypes.func,
    reset: PropTypes.bool,
    setReset: PropTypes.func,
    classData: PropTypes.array,
    setClassData: PropTypes.func,
    allSubjects: PropTypes.array,
    userId: PropTypes.number,
    updatedValues: PropTypes.object,
    iCardDetails: PropTypes.object,
    setICardDetails: PropTypes.func
};

export default StudentFormComponent;
