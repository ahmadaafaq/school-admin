/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";

import { Box, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, FormHelperText, Divider } from "@mui/material";
import { Autocomplete, Select, TextField, useMediaQuery } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import AddCircleIcon from '@mui/icons-material/AddCircle';

import API from "../../apis";
import teacherValidation from "./Validation";

import { setFormClasses } from "../../redux/actions/ClassAction";
import { setFormSections } from "../../redux/actions/SectionAction";
import { setFormSubjects } from "../../redux/actions/SubjectAction";
import { Utility } from "../utility";
import { useCommon } from "../hooks/common";

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

const TeacherFormComponent = ({
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
    const [fields, setFields] = useState([{ id: 1 }]);
    const [updatedArr, setUpdatedArr] = useState({});

    const formClassesInRedux = useSelector(state => state.allFormClasses);
    const formSectionsInRedux = useSelector(state => state.allFormSections);
    const formSubjectsInRedux = useSelector(state => state.allFormSubjects);

    const dispatch = useDispatch();
    const checkboxLabel = { inputProps: { 'aria-label': 'Checkboxes' } };
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isMobile = useMediaQuery("(max-width:480px)");
    const { getPaginatedData } = useCommon();
    const { appendSuffix, customSort, createUniqueDataArray } = Utility();

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

    console.log('formik.values.combinedclssect', formik.values.combinedClsSect)

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
                delete obj.subject_id;
                delete obj.subject_name;
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(obj);
                return acc;
            }, {});
            setUpdatedArr(updatedArrHelper);
            console.log('updatedArrHelper', updatedArrHelper, Object.values(updatedArrHelper));

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
        if (!formClassesInRedux?.listData?.length || !formSectionsInRedux?.listData?.length) {
            API.SchoolAPI.getSchoolClasses(5)
                .then(classData => {
                    if (classData.status === 'Success') {
                        classData.data.sort(customSort);

                        const uniqueClassDataArray = createUniqueDataArray(classData.data, 'class_id', 'class_name');
                        dispatch(setFormClasses(uniqueClassDataArray));

                        const uniqueSectionDataArray = createUniqueDataArray(classData.data, 'id', 'name');
                        dispatch(setFormSections(uniqueSectionDataArray));
                    } else {
                        console.log("Error Fetching ClassData, Please Try Again");
                    }
                })
                .catch(err => {
                    console.log("Error Fetching ClassData:", err);
                });
        }
    }, [formClassesInRedux.listData.length, formSectionsInRedux.listData.length]);

    useEffect(() => {
        if (!formSubjectsInRedux?.listData?.rows?.length) {
            getPaginatedData(0, 50, setFormSubjects, API.SubjectAPI);
        }
    }, [formSubjectsInRedux?.listData?.rows?.length]);

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
                        marginBottom: '40px'
                    }}
                >
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
                        label="Email"
                        name="email"
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
                                name="class"
                                value={formik.values.class}
                                onChange={formik.handleChange}
                            >
                                {formClassesInRedux?.listData?.length && formClassesInRedux.listData.map(cls => (
                                    <MenuItem value={cls.class_id} name={cls.class_name} key={cls.class_name}>
                                        {cls.class_name}
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
                                name="section"
                                value={formik.values.section}
                                onChange={event => formik.setFieldValue("section", event.target.value)}
                            >
                                {formSectionsInRedux?.listData?.length && formSectionsInRedux.listData.map(section => (
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
                            name="gender"
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
                            name="status"
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
                    <Box
                        onClick={handleAddClick}
                        sx={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                        }}
                    >
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
                                    name={`subject_${field.id}`}
                                    value={formik.values.subject[field.id - 1]}
                                    onChange={(event, value) => {
                                        const subArr = [...formik.values.subject];
                                        subArr[field.id - 1] = value.props.value;
                                        formik.setFieldValue("subject", subArr)
                                    }}
                                >
                                    {formSubjectsInRedux?.listData?.rows?.length && formSubjectsInRedux.listData.rows.map(subject => (
                                        <MenuItem value={subject.id} name={subject.name} key={subject.name}>
                                            {subject.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{formik.touched.subject && formik.errors.subject}</FormHelperText>
                            </FormControl>

                            <Autocomplete
                                multiple
                                options={combinedClass || []}
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
                        console.log(field, 'inside combined class loop')
                        return (
                            <React.Fragment key={key}>
                                <FormControl variant="filled" sx={{ minWidth: 120 }}
                                    error={!!formik.touched.subject && !!formik.errors.subject}
                                >
                                    <InputLabel id={`subjectField_${key}`}>Subject {key}</InputLabel>
                                    <Select
                                        variant="filled"
                                        labelId={`subjectField_${key}`}
                                        name={`subject_${key}`}
                                        value={formik.values.subject[index] || []}
                                        onChange={(event, value) => {
                                            const subArr = [...formik.values.subject];
                                            subArr[key - 1] = value.props.value;
                                            formik.setFieldValue("subject", subArr)
                                        }}
                                    >
                                        {formSubjectsInRedux?.listData?.rows?.length && formSubjectsInRedux.listData.rows.map(subject => (
                                            <MenuItem value={subject.id} name={subject.name} key={subject.name}>
                                                {subject.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>{formik.touched.subject && formik.errors.subject}</FormHelperText>
                                </FormControl>

                                <Autocomplete
                                    multiple
                                    options={combinedClass || []}
                                    getOptionLabel={option => `${appendSuffix(option.class_name)} ${option.section_name}`}
                                    disableCloseOnSelect
                                    value={formik.values?.combinedClsSect[index] || []}
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

export default TeacherFormComponent;
