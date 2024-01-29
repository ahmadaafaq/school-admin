/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Box, InputLabel, MenuItem, FormHelperText, FormControl, FormControlLabel, Autocomplete } from "@mui/material";
import { Checkbox, Select, TextField, useMediaQuery } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useFormik } from "formik";

import API from "../../apis";
import holidayValidation from "./Validation";

// import { setClasses } from "../../redux/actions/ClassAction";
// import { setSections } from "../../redux/actions/SectionAction";
import { useCommon } from "../hooks/common";

const initialValues = {
    name: "",
    date: null,
    type: "school_closure",
    notes: ""
};

const HolidayFormComponent = ({
    onChange,
    refId,
    setDirty,
    reset,
    setReset,
    userId,
    updatedValues = null
}) => {

    const [initialState, setInitialState] = useState(initialValues);
    // const [subjects, setSubjects] = useState([]);

    // const classesInRedux = useSelector(state => state.allClasses);
    // const sectionsInRedux = useSelector(state => state.allSections);

    // const checkboxLabel = { inputProps: { 'aria-label': 'Checkboxes' } };
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isMobile = useMediaQuery("(max-width:480px)");
    // const { getPaginatedData } = useCommon();

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: holidayValidation,
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

    // useEffect(() => {
    //     if (!classesInRedux?.listData?.rows?.length) {
    //         getPaginatedData(0, 20, setClasses, API.ClassAPI);
    //     }
    // }, [classesInRedux?.listData?.rows?.length]);

    // useEffect(() => {
    //     if (!sectionsInRedux?.listData?.rows?.length) {
    //         getPaginatedData(0, 20, setSections, API.SectionAPI);
    //     }
    // }, [sectionsInRedux?.listData?.rows?.length]);

    // const getSubjectsByClass = (classId) => {
    //     API.SubjectAPI.getSubjectsByClass(classId)
    //         .then(subjects => {
    //             console.log("subjects", subjects)
    //             if (subjects.status === 'Success') {
    //                 setSubjects(subjects.data);
    //             } else {
    //                 console.log("Error, Please Try Again");
    //             }
    //         })
    //         .catch(err => {
    //             console.log("Error, Fetching Subjects:", err);
    //         })
    // };

    return (
        <Box m="20px">
            <form ref={refId}>
                <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                    }}
                >
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="title"
                        label="Title*"
                        autoComplete="new-title"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        error={!!formik.touched.title && !!formik.errors.title}
                        helperText={formik.touched.title && formik.errors.title}
                    />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            format="DD MMMM YYYY"            //ex - 25 July 2023
                            views={['day', "month", "year"]}
                            label="Select Date"
                            name="date"
                            required
                            value={formik.values.date}
                            onChange={newDate => {
                                formik.setFieldValue("date", newDate);
                            }}
                        />
                    </LocalizationProvider>

                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.type && !!formik.errors.type}
                    >
                        <InputLabel id="typeField">Type</InputLabel>
                        <Select
                            variant="filled"
                            labelId="typeField"
                            label="Type"
                            name="type"
                            autoComplete="new-type"
                            value={formik.values.type}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value={"school_closure"}>School Closure</MenuItem>
                            <MenuItem value={"partial_closure"}>Partial Closure</MenuItem>
                            <MenuItem value={"staff_only"}>Staff Only</MenuItem>

                        </Select>
                        <FormHelperText>{formik.touched.type && formik.errors.type}</FormHelperText>
                    </FormControl>
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Note"
                        name="notes"
                        autoComplete="new-notes"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.notes}
                        error={!!formik.touched.notes && !!formik.errors.notes}
                        helperText={formik.touched.notes && formik.errors.notes}

                    />
                </Box>
            </form >
        </Box >
    );
}

export default HolidayFormComponent;
