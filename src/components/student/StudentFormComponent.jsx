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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useFormik } from "formik";

import studentValidation from "./Validation";

const initialValues = {
    firstname: "",
    lastname: "",
    mother_name: "",
    father_name: "",
    class: "",
    section: "",
    contact_no: "",
    email: "",
    gender: "",
    dob: null,
    admission_date: "",
    blood_group: "",
    status: "inactive"
};

const UserFormComponent = ({
    onChange,
    refId,
    setDirty,
    reset,
    setReset,
    userId,
    updatedValues = null
}) => {
    const [initialState, setInitialState] = useState(initialValues);

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isMobile = useMediaQuery("(max-width:480px)");

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: studentValidation,
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
    }

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
                        sx={{ gridColumn: "span 2", marginBottom: "20px" }}
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
                        sx={{ gridColumn: "span 2", marginBottom: "20px" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="mother_name"
                        label="Mother's Name*"
                        autoComplete="new-mother_name"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.mother_name}
                        error={!!formik.touched.mother_name && !!formik.errors.mother_name}
                        helperText={formik.touched.mother_name && formik.errors.mother_name}
                        sx={{ gridColumn: "span 2", marginBottom: "20px" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="father_name"
                        label="Father's Name*"
                        autoComplete="new-father_name"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.father_name}
                        error={!!formik.touched.father_name && !!formik.errors.father_name}
                        helperText={formik.touched.father_name && formik.errors.father_name}
                        sx={{ gridColumn: "span 2", marginBottom: "20px" }}
                    />

                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.class && !!formik.errors.class}
                    >
                        <InputLabel id="classField">Class</InputLabel>
                        <Select
                            variant="filled"
                            labelId="classField"
                            label="class"
                            name="class"
                            autoComplete="new-class"
                            value={formik.values.class}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value={"pre-nursery"}>Pre-Nursery</MenuItem>
                            <MenuItem value={"nursery"}>Nursery</MenuItem>
                            <MenuItem value={"kg"}>KG</MenuItem>
                            <MenuItem value={"first"}>I</MenuItem>
                            <MenuItem value={"second"}>II</MenuItem>
                            <MenuItem value={"third"}>III</MenuItem>
                            <MenuItem value={"fourth"}>IV</MenuItem>
                            <MenuItem value={"fifth"}>V</MenuItem>
                            <MenuItem value={"sixth"}>VI</MenuItem>
                            <MenuItem value={"seventh"}>VII</MenuItem>
                            <MenuItem value={"eight"}>VIII</MenuItem>
                            <MenuItem value={"nineth"}>IX</MenuItem>
                            <MenuItem value={"tenth"}>X</MenuItem>
                            <MenuItem value={"eleventh"}>XI</MenuItem>
                            <MenuItem value={"twelth"}>XII</MenuItem>
                        </Select>
                        <FormHelperText>{formik.touched.class && formik.errors.class}</FormHelperText>
                    </FormControl>

                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="section"
                        label="Section"
                        autoComplete="new-section"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.section}
                        error={!!formik.touched.section && !!formik.errors.section}
                        helperText={formik.touched.section && formik.errors.section}
                    />
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            format="DD MMMM YYYY"            //ex - 25 July 2023
                            views={['day', "month", "year"]}
                            label="Select Date Of Birth"
                            name="dob"
                            required
                            value={formik.values.dob}
                            onChange={newDob => {
                                console.log("DOB=>", newDob);
                                formik.setFieldValue("dob", newDob);
                            }}
                        />
                    </LocalizationProvider>

                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="admission_date"
                        label="Admission Date"
                        autoComplete="new-admission_date"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.admission_date}
                        error={!!formik.touched.admission_date && !!formik.errors.admission_date}
                        helperText={formik.touched.admission_date && formik.errors.admission_date}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="blood_group"
                        label="Blood Group"
                        autoComplete="new-blood_group"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.blood_group}
                        error={!!formik.touched.blood_group && !!formik.errors.blood_group}
                        helperText={formik.touched.blood_group && formik.errors.blood_group}
                    />
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
            </form>
        </Box>
    );
}

export default UserFormComponent;
