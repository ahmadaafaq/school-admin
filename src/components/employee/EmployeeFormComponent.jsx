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
import employeeValidation from "./Validation";

// import { setClasses } from "../../redux/actions/ClassAction";
// import { setSections } from "../../redux/actions/SectionAction";
import { useCommon } from "../hooks/common";

const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    contact_no: "",
    role: "",
    dob: null,
    gender: "",
    status: "inactive"
};

const EmployeeFormComponent = ({
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
        validationSchema: employeeValidation,
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
                        label="Role"
                        name="role"
                        autoComplete="new-role"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.role}
                        error={!!formik.touched.role && !!formik.errors.role}
                        helperText={formik.touched.role && formik.errors.role}
                    />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            format="DD MMMM YYYY"            //ex - 25 July 2023
                            views={['day', "month", "year"]}
                            label="Select Date Of Birth"
                            name="dob"
                            required
                            value={formik.values.dob}
                            onChange={newDob => {
                                formik.setFieldValue("dob", newDob);
                            }}
                        />
                    </LocalizationProvider>
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
                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.status && !!formik.errors.status}
                    >
                        <InputLabel id="statusField">Status</InputLabel>
                        <Select
                            variant="filled"
                            labelId="statusField"
                            label="Status"
                            name="status"
                            autoComplete="new-status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value={"active"}>Active</MenuItem>
                            <MenuItem value={"inactive"}>Inactive</MenuItem>
                        </Select>
                        <FormHelperText>{formik.touched.status && formik.errors.status}</FormHelperText>
                    </FormControl>
                </Box>
            </form >
        </Box >
    );
}

export default EmployeeFormComponent;
