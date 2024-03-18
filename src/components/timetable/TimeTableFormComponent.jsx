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

import { Box, useMediaQuery, FormControl, InputLabel, Select, MenuItem, FormHelperText, Divider, Chip } from "@mui/material";
import { useFormik } from "formik";

import API from "../../apis";
import TimeTableValidation from "./Validation";

import { setSchoolClasses } from "../../redux/actions/ClassAction";
import { setSchoolSections } from "../../redux/actions/SectionAction";
import { setSchoolSubjects } from "../../redux/actions/SubjectAction";
import { setSchoolDurations } from "../../redux/actions/SchoolDurationAction";
import { Utility } from "../utility";
import { useCommon } from "../hooks/common";

const initialValues = {
    dbId: "",
    period: [],
    day: "",
    class: "",
    section: "",
    subject: [],
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

    const [schoolId, setSchoolId] = useState([]);
    const schoolClasses = useSelector(state => state.schoolClasses);
    const schoolSections = useSelector(state => state.schoolSections);
    const schoolSubjects = useSelector(state => state.schoolSubjects);
    const schoolDuration = useSelector(state => state.allSchoolDurations);

    const dispatch = useDispatch();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { getPaginatedData } = useCommon();
    const { fetchAndSetSchoolData, getLocalStorage, findMultipleById } = Utility();

    const formik = useFormik({
        initialValues: initialValues,
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

    const openingTime = new Date(schoolId?.[0]?.opening_time).toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

    function convertToAMPM(timeString) {
        const [hours, minutes] = timeString.split(':');

        // Check if hours and minutes are valid numbers
        if (isNaN(hours) || isNaN(minutes)) {
            return "Invalid time format";
        }

        const parsedHours = parseInt(hours, 10);
        const parsedMinutes = parseInt(minutes, 10);

        // Check if hours and minutes are within valid range
        if (parsedHours < 0 || parsedHours > 23 || parsedMinutes < 0 || parsedMinutes > 59) {
            return "Invalid time value";
        }

        const date = new Date();
        date.setHours(parsedHours);
        date.setMinutes(parsedMinutes);

        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }


    const schoolPeriodDuration = (hours = 0, minutes = 0, condition, half_duration) => {
        const timeslots = [];
        const startTime = new Date();
        startTime.setHours(hours, minutes, 0); // set hours, minutes and seconds

        for (let i = 0; i < condition; i++) {
            let slotFrom = `${startTime.getHours()}:${startTime.getMinutes() == 0 ? '00' : startTime.getMinutes()}`;
            startTime.setMinutes(startTime.getMinutes() + half_duration);
            let slotTo = `${startTime.getHours()}:${startTime.getMinutes() == 0 ? '00' : startTime.getMinutes()}`;
            timeslots.push(`${convertToAMPM(slotFrom)}-${convertToAMPM(slotTo)}`);
        }
        return timeslots;
    };

    const firstHalfDuration = schoolPeriodDuration(openingTime.slice(0, 2).replace(':', '').padStart(2, '0'), openingTime.slice(3, 5), schoolId?.[0]?.period / schoolId?.[0]?.halves, schoolId?.[0]?.first_half_period_duration);
    let secondHalfDuration = [];
    let totalDuration = [];

    if (firstHalfDuration.length) {
        let openingTimes = firstHalfDuration[firstHalfDuration.length - 1];
        let secondOpeningTimeHr = openingTimes.split('-').splice(1).join('').slice(0, 2).replace(':', '').padStart(2, '0');
        let secondOpeningTimeMi = openingTimes.split('-').splice(1).join('').slice(3, 5);

        let secondMinTotal = parseInt(secondOpeningTimeMi, 10) + parseInt(schoolId?.[0]?.recess_time, 10);
        secondHalfDuration = schoolPeriodDuration(secondOpeningTimeHr, secondMinTotal, schoolId?.[0]?.period / schoolId?.[0]?.halves, schoolId?.[0]?.second_half_period_duration);
        if (secondHalfDuration.length) {
            totalDuration = [...firstHalfDuration, ...secondHalfDuration];
        }
    }
   

    useEffect(() => {
        if (formik.values.class && classData?.length) {
            const classSections = classData?.filter(obj => obj.class_id === formik.values.class) || [];
            const selectedSections = classSections.map(({ section_id, section_name }) => ({ section_id, section_name }));
            dispatch(setSchoolSections(selectedSections));
        }
    }, [formik.values?.class, classData?.length]);

    useEffect(() => {
        if (formik.values.section && classData?.length) {
            const sectionSubjects = classData?.filter(obj => obj.class_id === formik.values.class && obj.section_id === formik.values.section);
            const selectedSubjects = sectionSubjects ? findMultipleById(sectionSubjects[0]?.subject_ids, allSubjects) : [];
            dispatch(setSchoolSubjects(selectedSubjects));
        }
    }, [formik.values?.class, formik.values?.section, classData.length, allSubjects]);

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
            updatedValues?.map((period, index) => {
                formik.setFieldValue(`period${index + 1}`, period?.period);
                formik.setFieldValue(`duration${index + 1}`, period?.duration);
                formik.setFieldValue(`subject${index + 1}`, period?.subject_id);
                formik.setFieldValue(`dbId_${index}`, period?.id);
            });
            formik.setFieldValue(`class`, updatedValues[0]?.class_id);
            formik.setFieldValue(`section`, updatedValues[0]?.section_id);
            formik.setFieldValue(`day`, updatedValues[0]?.day);
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

    useEffect(() => {
        if (totalDuration?.length && !formik?.values?.duration?.length) {
            formik.setFieldValue('duration', totalDuration);
        }
    }, [totalDuration]);

    useEffect(() => {
        if (schoolId?.[0]?.period) {
            const totalPeriodArray = Array.from({ length: schoolId[0].period }, (_, index) => index + 1);
            formik.setFieldValue('period', totalPeriodArray);
        }
    }, [schoolId]);

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
                                if (formik.values.subject) {
                                    formik.setFieldValue("subject", []);
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
                                if (formik.values.subject) {
                                    formik.setFieldValue("subject", '');
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
                            name="day"
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
                                <Box key={index} style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', margin: '0px 100px 20px 100px ', justifyItems: "center", alignItems: "center" }}>
                                    <Box sx={{ fontWeight: "600", fontSize: "20px" }}>Period {key}</Box>

                                    <Box sx={{ fontWeight: "500", fontSize: "15px" }}>{firstHalfDuration[index]}</Box>

                                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                                        error={!!formik.touched[`subject${key}`] && !!formik.errors[`subject${key}`]}
                                    >
                                        <InputLabel id="subjectField">Subject</InputLabel>
                                        <Select
                                            sx={{ minWidth: "280px" }}
                                            variant="filled"
                                            name={`subject${key}`}
                                            value={formik.values[`subject${index + 1}`] || null}
                                            onChange={event => formik.setFieldValue(`subject${index + 1}`, event.target.value)}
                                        >
                                            {!schoolSubjects?.listData?.length ? null :
                                                schoolSubjects.listData.map(subject => (
                                                    <MenuItem value={subject.id} name={subject.name} key={subject.id}>
                                                        {subject.name}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                        <FormHelperText>{formik.touched[`subject${key}`] && formik.errors[`subject${key}`]} </FormHelperText>
                                    </FormControl>
                                </Box>
                            )
                        }
                        )}

                    </>
                )}
                <Divider sx={{ width: '99%', marginBottom: "20px" }}>
                    <Chip color='info' label={`Recess Time ${schoolId?.[0]?.recess_time} min`}
                        sx={{ fontSize: '13px', fontWeight: '600', letterSpacing: '0.2em', padding: '12px' }}
                    />
                </Divider>
                {(schoolId?.[0]?.period) / 2 > 0 && (
                    <>
                        {[...Array((schoolId[0].period) / 2)].map((_, index) => {
                            let condition = (schoolId?.[0]?.period) / 2 + 1;

                            return (
                                <Box key={index} sx={{ display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', margin: '0px 100px 20px 100px ', justifyItems: "center", alignItems: "center" }}>
                                    <Box sx={{ fontWeight: "600", fontSize: "20px" }}>Period {index + condition}</Box>

                                    <Box sx={{ fontWeight: "500", fontSize: "15px" }}>{secondHalfDuration[index]}</Box>

                                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                                        error={!!formik.touched[`subject${index + condition}`] && !!formik.errors[`subject${index + condition}`]}
                                    >
                                        <InputLabel id="subjectField">Subject</InputLabel>
                                        <Select
                                            sx={{ minWidth: "280px" }}
                                            variant="filled"
                                            name={`subject${index + condition}`}
                                            value={formik.values[`subject${index + condition}`] || null}
                                            onChange={event => formik.setFieldValue(`subject${index + condition}`, event.target.value)}
                                        >
                                            {!schoolSubjects?.listData?.length ? null :
                                                schoolSubjects.listData.map(subject => (
                                                    <MenuItem value={subject.id} name={subject.name} key={subject.id}>
                                                        {subject.name}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                        <FormHelperText>{formik.touched[`subject${index + condition}`] && formik.errors[`subject${index + condition}`]} </FormHelperText>
                                    </FormControl>
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
    classData: PropTypes.array, 
    setClassData: PropTypes.func,
    allSubjects: PropTypes.array,
    updatedValues: PropTypes.object
};

export default TimeTableFormComponent;
