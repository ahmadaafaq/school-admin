/* eslint-disable react-hooks/exhaustive-deps */
// /**
//  * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
//  *
//  * This software is the confidential information of School CRM Inc., and is licensed as
//  * restricted rights software. The use,reproduction, or disclosure of this software is subject to
//  * restrictions set forth in your license agreement with School CRM.
// */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { SingleInputTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputTimeRangeField';

import { Box, TextField, useMediaQuery, FormControl, InputLabel, Select, MenuItem, FormHelperText, Autocomplete, Divider, Chip } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useFormik } from "formik";
import dayjs from "dayjs";

import API from "../../apis";
import TimeTableValidation from "./Validation";

import { setSchoolClasses } from "../../redux/actions/ClassAction";
import { setSchoolSections } from "../../redux/actions/SectionAction";
import { setSchoolSubjects } from "../../redux/actions/SubjectAction";
import { setSchoolDurations } from "../../redux/actions/SchoolDurationAction";
import { Utility } from "../utility";
import { useCommon } from "../hooks/common";

const initialValues = {
    day: "",
    class: "",
    section: "",
    subjects: [],
    duration: []
};

const TimeTableFormComponent = ({
    onChange,
    refId,
    setDirty,
    reset,
    setReset,
    classData,
    setClassData,
    allSubjects,
    updatedValues = null
}) => {

    const [initialState, setInitialState] = useState(initialValues);
    const [schoolId, setSchoolId] = useState([]);
    const schoolClasses = useSelector(state => state.schoolClasses);
    const schoolSections = useSelector(state => state.schoolSections);
    const schoolSubjects = useSelector(state => state.schoolSubjects);
    const schoolDuration = useSelector(state => state.allSchoolDurations);

    const dispatch = useDispatch();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { getPaginatedData } = useCommon();
    const { fetchAndSetSchoolData, getLocalStorage, getValuesFromArray } = Utility();

    const secondHalf = (schoolId?.[0]?.period) / 2;

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: TimeTableValidation,
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

    const getAndSetSubjects = () => {
        const sectionSubjects = classData?.filter(obj => obj.class_id === formik.values.class && obj.section_id === formik.values?.section);
        const selectedSubjects = sectionSubjects ? getValuesFromArray(sectionSubjects[0]?.subject_ids, allSubjects) : [];
        dispatch(setSchoolSubjects(selectedSubjects));
    };

    const getAndSetSections = () => {
        const classSections = classData?.filter(obj => obj.class_id === formik.values.class) || [];
        const selectedSections = classSections.map(({ section_id, section_name }) => ({ section_id, section_name }));
        dispatch(setSchoolSections(selectedSections));
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
        let schoolInfo = getLocalStorage("schoolInfo");
        if (!schoolDuration?.listData?.rows?.length) {
            getPaginatedData(0, 5, setSchoolDurations, API.SchoolDurationAPI);
        }
        if (schoolInfo?.encrypted_id) {
            API.CommonAPI.decryptText(schoolInfo)
                .then(result => {
                    if (result.status === 'Success') {
                        const schoolObj = schoolDuration?.listData?.rows?.filter(obj => `${obj.school_id}` === result.data);
                        setSchoolId(schoolObj);
                    } else if (result.status === 'Error') {
                        console.log('Error Decrypting Data');
                    }
                });
        }
    }, [schoolDuration?.listData?.rows?.length]);
    console.log(schoolId?.[0], 'filtered school obj')


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
    }, [formik.values?.section]);

    useEffect(() => {
        if (formik.values.class) {
            getAndSetSections();
        }
    }, [formik.values?.class, classData?.length]);

    return (
        <Box m="20px">
            <form ref={refId}>
                <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                    sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }, marginBottom: "50px"
                    }}
                >
                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.class && !!formik.errors.class}
                    >
                        <InputLabel id="classField">Class</InputLabel>
                        <Select
                            variant="filled"
                            labelId="classField"
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
                        <InputLabel id="sectionField">Section</InputLabel>
                        <Select
                            variant="filled"
                            labelId="sectionField"
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

                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.day && !!formik.errors.day}
                    >
                        <InputLabel id="dayField">Day</InputLabel>
                        <Select
                            variant="filled"
                            labelId="dayField"
                            name="day"
                            autoComplete="new-day"
                            value={formik.values.day}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value={"monday"}>Monday</MenuItem>
                            <MenuItem value={"tuesday"}>Tuesday</MenuItem>
                            <MenuItem value={"wednesday"}>Wednesday</MenuItem>
                            <MenuItem value={"thursday"}>Thursday</MenuItem>
                            <MenuItem value={"friday"}>Friday</MenuItem>
                            <MenuItem value={"saturday"}>Saturday</MenuItem>


                        </Select>
                        <FormHelperText>{formik.touched.day && formik.errors.day}</FormHelperText>
                    </FormControl>

                </Box>

                {schoolId?.[0]?.period > 0 && (
                    <>
                        {[...Array((schoolId[0].period) / 2)].map((_, index) => {
                            let key = index + 1;
                            return (
                                <Box key={index} style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(8, minmax(0, 1fr))', marginBottom: '20px' }}>
                                    <Box>Period {key}</Box>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <SingleInputTimeRangeField
                                            label={`Duration ${key}`}
                                            name={`duration${key}`}
                                            // value={formik.values[`duration${key}`]}
                                            value={schoolId[0].first_half_period_duration * schoolId[0].opening_time}
                                            sx={{ gridColumn: "span 2" }}
                                        // onChange={(newDuration) => formik.setFieldValue(`duration${key}`, newDuration)}
                                        />
                                    </LocalizationProvider>

                                    <Autocomplete
                                        multiple
                                        options={schoolSubjects?.listData || []}
                                        getOptionLabel={(option) => option.name}
                                        disableCloseOnSelect
                                        value={formik.values[`subjects${key}`] || []}
                                        sx={{ gridColumn: "span 2" }}
                                        onChange={(event, value) => formik.setFieldValue(`subjects${key}`, value)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="filled"
                                                type="text"
                                                name={`subjects${key}`}
                                                label={`Subjects ${key}`}
                                                error={!!formik.touched[`subjects${key}`] && !!formik.errors[`subjects${key}`]}
                                                helperText={formik.touched[`subjects${key}`] && formik.errors[`subjects${key}`]}
                                            />
                                        )}
                                    />
                                </Box>
                            )
                        }
                        )}

                    </>
                )}
                <Divider sx={{ width: '99%' }}>
                    <Chip color='info' label={`Recess Time ${schoolId?.[0]?.recess_time} min`}
                        sx={{ fontSize: '13px', fontWeight: '600', letterSpacing: '0.2em', padding: '12px' }}
                    />
                </Divider>
                {(schoolId?.[0]?.period) / 2 > 0 && (
                    <>
                        {[...Array((schoolId[0].period) / 2)].map((_, index) => {
                            let condition = (schoolId?.[0]?.period) / 2 + 1;
                            return (
                                <Box key={index} style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(8, minmax(0, 1fr))', marginBottom: '20px' }}>
                                    <Box>Period {index + condition}</Box>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <SingleInputTimeRangeField
                                            label={`Duration ${index + condition}`}
                                            name={`duration${index + condition}`}
                                            value={formik.values[`duration${index + condition}`]}
                                            sx={{ gridColumn: "span 2" }}
                                            onChange={(newDuration) => formik.setFieldValue(`duration${index + condition}`, newDuration)}
                                        />
                                    </LocalizationProvider>

                                    <Autocomplete
                                        multiple
                                        options={schoolSubjects?.listData || []}
                                        getOptionLabel={(option) => option.name}
                                        disableCloseOnSelect
                                        value={formik.values[`subjects${index + condition}`] || []}
                                        sx={{ gridColumn: "span 2" }}
                                        onChange={(event, value) => formik.setFieldValue(`subjects${index + condition}`, value)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="filled"
                                                type="text"
                                                name={`subjects${index + condition}`}
                                                label={`Subjects ${index + condition}`}
                                                error={!!formik.touched[`subjects${index + condition}`] && !!formik.errors[`subjects${index + condition}`]}
                                                helperText={formik.touched[`subjects${index + condition}`] && formik.errors[`subjects${index + condition}`]}
                                            />
                                        )}
                                    />
                                </Box>
                            )
                        }
                        )}
                    </>
                )}


            </form >
        </Box >
    );
};

TimeTableFormComponent.propTypes = {
    onChange: PropTypes.func,
    refId: PropTypes.shape({
        current: PropTypes.any
    }),
    setDirty: PropTypes.func,
    reset: PropTypes.bool,
    setReset: PropTypes.func,
    updatedValues: PropTypes.object
};

export default TimeTableFormComponent;
