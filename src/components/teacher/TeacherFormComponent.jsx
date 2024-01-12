/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import React, { useState, useEffect } from "react";

import { Box, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, FormHelperText, Divider } from "@mui/material";
import { Autocomplete, Select, TextField, useMediaQuery } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useFormik } from "formik";

import './index.css';
import API from "../../apis";
import teacherValidation from "./Validation";
import { tokens } from "../../theme";
import { Utility } from "../utility";

const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    contact_no: "",
    dob: null,
    age: "",
    nationality: "",
    religion: "",
    blood_group: "",
    qualification: "",
    achievements: "",
    experience: "",
    subject: [""],
    combinedClsSect: [],
    grade: "",
    is_specially_abled: false,
    is_class_teacher: false,
    class: "",
    section: "",
    caste_group: "",
    gender: "",
    status: "inactive"
};

const UserFormComponent = ({
    onChange,
    refId,
    setDirty,
    reset,
    setReset,
    combinedClass,
    teacherId,
    updatedValues = null
}) => {
    const [initialState, setInitialState] = useState(initialValues);
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [fields, setFields] = useState([{ id: 1 }]);

    const checkboxLabel = { inputProps: { 'aria-label': 'Checkboxes' } };
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isMobile = useMediaQuery("(max-width:480px)");
    const { appendSuffix } = Utility();
    const [updatedArr, setUpdatedArr] = useState({});

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: teacherValidation,
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

    const handleAddClick = () => {
        setFields([
            ...fields,
            { id: fields.length + 1 }
        ]);
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
            const updatedArrHelper = updatedValues.selectedClass.reduce((acc, obj) => {
                const key = obj.subject_id;
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(obj);
                return acc;
            }, {});
            setUpdatedArr(updatedArrHelper);
            console.log(updatedArr, 'updated', updatedArrHelper);

            // Check if updatedArrHelper is not empty and has keys
            const hasData = updatedArrHelper && Object.keys(updatedArrHelper).length > 0;
            setInitialState({
                ...initialState,
                ...updatedValues.teacherData,
                subject: hasData ? Object.keys(updatedArrHelper) : [],
                combinedClsSect: hasData ? Object.values(updatedArrHelper) : []
            });
        }
    }, [updatedValues]);

    useEffect(() => {
        API.ClassAPI.getAll(false, 0, 20)
            .then(data => {
                if (data.status === 'Success') {
                    setClasses(data.data.rows);
                } else {
                    console.error("Error fetching classes. Please Try Again");
                }
            })
            .catch(err => {
                console.error("Error fetching classes:", err);
            });
    }, []);

    useEffect(() => {
        API.SectionAPI.getAll(false, 0, 20)
            .then(data => {
                if (data.status === 'Success') {
                    setSections(data.data.rows);
                } else {
                    console.error("Error fetching classes. Please Try Again");
                }
            })
            .catch(err => {
                console.error("Error fetching classes:", err);
            });
    }, []);

    useEffect(() => {
        API.SubjectAPI.getAll(false, 0, 30)
            .then(data => {
                if (data.status === 'Success') {
                    setSubjects(data.data.rows);
                } else {
                    console.error("Error fetching classes. Please Try Again");
                }
            })
            .catch(err => {
                console.error("Error fetching classes:", err);
            });
    }, []);

    console.log('formik.vslues=>', formik.values.combinedClsSect);

    return (
        <Box m="20px">
            <form ref={refId}>
                <Box
                    display='grid'
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    gridColumn="span 4"
                    position='relative'
                    className='box-shadow'
                    sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        transform: 'translate(0)',
                        transformStyle: 'preserve-3d',
                        marginBottom: '40px'
                    }}
                >
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="firstname"
                        label="Firstname*"
                        autoComplete="new-firstname"
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
                        autoComplete="new-lastname"
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
                        label="Email"
                        name="email"
                        autoComplete="new-email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={!!formik.touched.email && !!formik.errors.email}
                        helperText={formik.touched.email && formik.errors.email}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Contact Number*"
                        name="contact_no"
                        autoComplete="new-contact"
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
                        label="Age"
                        name="age"
                        autoComplete="new-age"
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
                        label="Nationality"
                        name="nationality"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.nationality}
                        error={!!formik.touched.nationality && !!formik.errors.nationality}
                        helperText={formik.touched.nationality && formik.errors.nationality}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Religion"
                        name="religion"
                        autoComplete="new-religion"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.religion}
                        error={!!formik.touched.religion && !!formik.errors.religion}
                        helperText={formik.touched.religion && formik.errors.religion}
                    />
                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.caste_group && !!formik.errors.caste_group}
                    >
                        <InputLabel id="castGroupField">Caste Group</InputLabel>
                        <Select
                            variant="filled"
                            labelId="castGroupField"
                            name="caste_group"
                            label="Caste Group"
                            autoComplete="new-caste_group"
                            value={formik.values.caste_group}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value={"general"}>General</MenuItem>
                            <MenuItem value={"obc"}>OBC</MenuItem>
                            <MenuItem value={"sc"}>SC</MenuItem>
                            <MenuItem value={"st"}>ST</MenuItem>
                        </Select>
                        <FormHelperText>{formik.touched.caste_group && formik.errors.caste_group}</FormHelperText>
                    </FormControl>
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Blood Group"
                        name="blood_group"
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
                        label="Qualification"
                        name="qualification"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.qualification}
                        error={!!formik.touched.qualification && !!formik.errors.qualification}
                        helperText={formik.touched.qualification && formik.errors.qualification}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Achievements"
                        name="achievements"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.achievements}
                        error={!!formik.touched.achievements && !!formik.errors.achievements}
                        helperText={formik.touched.achievements && formik.errors.achievements}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Experience"
                        name="experience"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.experience}
                        error={!!formik.touched.experience && !!formik.errors.experience}
                        helperText={formik.touched.experience && formik.errors.experience}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Grade"
                        name="grade"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.grade}
                        error={!!formik.touched.grade && !!formik.errors.grade}
                        helperText={formik.touched.grade && formik.errors.grade}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            format="DD MMMM YYYY"            //ex - 25 July 2023
                            views={['day', "month", "year"]}
                            label="Date Of Birth"
                            name="dob"
                            required
                            value={formik.values.dob}
                            onChange={newDob => formik.setFieldValue("dob", newDob)}
                        />
                    </LocalizationProvider>
                    <FormControlLabel label="Is Specially Abled" sx={{ gridColumn: isMobile ? "span 2" : "" }}
                        control={
                            <Checkbox {...checkboxLabel} color="default"
                                checked={formik.values.is_specially_abled ? true : false}
                                name="is_specially_abled"
                                onChange={(event, value) => formik.setFieldValue("is_specially_abled", value)}
                                value={formik.values.is_specially_abled}
                            />
                        } />
                    <FormControlLabel label="Is Class Teacher" sx={{ gridColumn: isMobile ? "span 2" : "" }}
                        control={
                            <Checkbox {...checkboxLabel} color="default"
                                checked={formik.values.is_class_teacher ? true : false}
                                name="is_class_teacher"
                                onChange={(event, value) => formik.setFieldValue("is_class_teacher", value)}
                                value={formik.values.is_class_teacher}
                            />
                        } />
                    {formik.values.is_class_teacher && <>
                        <FormControl variant="filled" sx={{ minWidth: 120 }}
                            error={!!formik.touched.class && !!formik.errors.class}
                        >
                            <InputLabel id="classField">Class</InputLabel>
                            <Select
                                variant="filled"
                                labelId="classField"
                                label="Class"
                                name="class"
                                autoComplete="new-class"
                                value={formik.values.class}
                                onChange={formik.handleChange}
                            >
                                {classes.length && classes.map(cls => (
                                    <MenuItem value={cls.id} name={cls.name} key={cls.name}>
                                        {cls.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{formik.touched.class && formik.errors.class}</FormHelperText>
                        </FormControl>
                        <FormControl variant="filled" sx={{ minWidth: 120 }}
                            error={!!formik.touched.section && !!formik.errors.section}
                        >
                            <InputLabel id="sectionField">Section</InputLabel>
                            <Select
                                variant="filled"
                                labelId="sectionField"
                                label="Section"
                                name="section"
                                autoComplete="new-section"
                                value={formik.values.section}
                                onChange={event => formik.setFieldValue("section", event.target.value)}
                            >
                                {sections.length && sections.map(section => (
                                    <MenuItem value={section.id} name={section.name} key={section.name}>
                                        {section.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{formik.touched.section && formik.errors.section}</FormHelperText>
                        </FormControl>
                    </>}
                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.gender && !!formik.errors.gender}
                    >
                        <InputLabel id="genderField">Gender</InputLabel>
                        <Select
                            variant="filled"
                            labelId="genderField"
                            label="Gender"
                            name="gender"
                            autoComplete="new-gender"
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value={"male"}>Male</MenuItem>
                            <MenuItem value={"female"}>Female</MenuItem>
                            <MenuItem value={"other"}>Other</MenuItem>
                        </Select>
                        <FormHelperText>{formik.touched.gender && formik.errors.gender}</FormHelperText>
                    </FormControl>

                    <FormControl variant="filled" sx={{ minWidth: 120 }}>
                        <InputLabel id="statusField">Status</InputLabel>
                        <Select
                            variant="filled"
                            labelId="statusField"
                            label="Status"
                            name="status"
                            autoComplete="new-status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            error={!!formik.touched.status && !!formik.errors.status}
                        >
                            <MenuItem value={"active"}>Active</MenuItem>
                            <MenuItem value={"inactive"}>Inactive</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box
                    border='2px solid #BADFE7'
                    borderRadius='12px'
                    padding='4px'
                    display='grid'
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    gridColumn="span 4"
                    position='relative'
                    className='box-shadow'
                    sx={{
                        transform: 'translate(0)',
                        transformStyle: 'preserve-3d',
                        marginBottom: '40px'
                    }}
                >
                    <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' onClick={handleAddClick}>
                        <AddCircleIcon sx={{ fontSize: '22px' }} />
                        <span style={{
                            color: "rgb(97,97,97)", fontWeight: "300", fontSize: "16px", lineHeight: "30px", letterSpacing: "0.015em"
                        }}> Add Subjects </span>
                    </Box>

                    {/* create */}
                    {!teacherId && fields.map(field => (
                        <React.Fragment key={field.id}>
                            <FormControl variant="filled" sx={{ minWidth: 120 }}
                                error={!!formik.touched.subject && !!formik.errors.subject}
                            >
                                <InputLabel id={`subjectField_${field.id}`}>Subject {field.id}</InputLabel>
                                <Select
                                    variant="filled"
                                    labelId={`subjectField_${field.id}`}
                                    label={`Subject ${field.id}`}
                                    name={`subject_${field.id}`}
                                    autoComplete="new-subject"
                                    value={formik.values.subject[field.id - 1]}
                                    onChange={(event, value) => {
                                        const subArr = [...formik.values.subject];
                                        subArr[field.id - 1] = value.props.value;
                                        formik.setFieldValue("subject", subArr)
                                    }}
                                >
                                    {subjects.length && subjects.map(subject => (
                                        <MenuItem value={subject.id} name={subject.name} key={subject.name}>
                                            {subject.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{formik.touched.subject && formik.errors.subject}</FormHelperText>
                            </FormControl>

                            <Autocomplete
                                multiple
                                options={combinedClass}
                                getOptionLabel={option => `${appendSuffix(option.class_name)} ${option.section_name}`}
                                disableCloseOnSelect
                                value={formik.values.combinedClsSect[field.id - 1]}
                                onChange={(event, value) => {
                                    const clsArr = [...formik.values.combinedClsSect];
                                    clsArr[field.id - 1] = value;
                                    formik.setFieldValue("combinedClsSect", clsArr)
                                }}
                                sx={{ gridColumn: "span 2" }}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        variant="filled"
                                        type="text"
                                        name={`combinedClsSect_${field.id}`}
                                        label="Class and Section"
                                    // error={`${!!formik.touched}.combinedClsSect_${field.id}` && !!formik.errors.{`combinedClsSect_${field.id}`}}
                                    // helperText={formik.touched.{`combinedClsSect_${field.id}`} && formik.errors.{`combinedClsSect_${field.id}`}}
                                    />
                                )}
                            />
                            {fields.length > 1 && <Divider sx={{ borderBottomWidth: '0px' }} />}
                        </React.Fragment>))}

                    {/* Update */}
                    {teacherId && Object.values(updatedArr).map((field, index) => {
                        let key = index + 1;
                        return (
                            <React.Fragment key={key}>
                                <FormControl variant="filled" sx={{ minWidth: 120 }}
                                    error={!!formik.touched.subject && !!formik.errors.subject}
                                >
                                    <InputLabel id={`subjectField_${key}`}>Subject {key}</InputLabel>
                                    <Select
                                        variant="filled"
                                        labelId={`subjectField_${key}`}
                                        label={`Subject ${key}`}
                                        name={`subject_${key}`}
                                        autoComplete="new-subject"
                                        value={field[index].subject_id}
                                        onChange={(event, value) => {
                                            const subArr = [...formik.values.subject];
                                            subArr[key - 1] = value.props.value;
                                            formik.setFieldValue("subject", subArr)
                                        }}
                                    >
                                        {subjects.length && subjects.map(subject => (
                                            <MenuItem value={subject.id} name={subject.name} key={subject.name}>
                                                {subject.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>{formik.touched.subject && formik.errors.subject}</FormHelperText>
                                </FormControl>

                                <Autocomplete
                                    multiple
                                    options={combinedClass}
                                    getOptionLabel={option => `${appendSuffix(option.class_name)} ${option.section_name}`}
                                    disableCloseOnSelect
                                    value={formik.values.combinedClsSect[index] || []}
                                    onChange={(event, value) => {
                                        const clsArr = [...formik.values.combinedClsSect];
                                        clsArr[key - 1] = value;
                                        formik.setFieldValue("combinedClsSect", clsArr)
                                    }}
                                    sx={{ gridColumn: "span 2" }}
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            variant="filled"
                                            type="text"
                                            name={`combinedClsSect_${key}`}
                                            label="Class and Section"
                                        // error={`${!!formik.touched}.combinedClsSect_${field.id}` && !!formik.errors.{`combinedClsSect_${field.id}`}}
                                        // helperText={formik.touched.{`combinedClsSect_${field.id}`} && formik.errors.{`combinedClsSect_${field.id}`}}
                                        />
                                    )}
                                />
                                {index > 0 && <Divider sx={{ borderBottomWidth: '0px' }} />}
                            </React.Fragment>)
                    })}
                </Box>
            </form>
        </Box>
    );
}

export default UserFormComponent;
