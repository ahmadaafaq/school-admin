/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import React, { useState, useEffect } from "react";

import { Box, InputLabel, MenuItem, FormHelperText, FormControl, FormControlLabel } from "@mui/material";
import { Checkbox, Select, TextField, useMediaQuery } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useFormik } from "formik";

import marksheetValidation from "./Validation";
import { useSelector } from "react-redux";
import { Utility } from "../utility";

const UserFormComponent = ({
    onChange,
    refId,
    setDirty,
    reset,
    setReset,
    userId,
    updatedValues = null,
}) => {

    const { cls, section } = useSelector(state => state.allMarksheets);
    const [initialState, setInitialState] = useState({
        class: cls || "",  // Set the initial value from the prop or an empty string
        section: section || "",  // Set the initial value from the prop or an empty string
        name: "",
        result: "pass"
    });
    const { listData } = useSelector(state => state.allClasses);
    const checkboxLabel = { inputProps: { 'aria-label': 'Checkboxes' } };
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isMobile = useMediaQuery("(max-width:480px)");
    const { findClassById } = Utility();

    const formik = useFormik({
        initialValues: initialState,
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

    console.log('cls, sect', cls, section);

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
                        name="class"
                        label="Class"
                        autoComplete="new-class"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    // value={formik.values.section}
                    // error={!!formik.touched.section && !!formik.errors.section}
                    // helperText={formik.touched.section && formik.errors.section}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="section"
                        label="Section"
                        autoComplete="new-section"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    // value={formik.values.section}
                    // error={!!formik.touched.section && !!formik.errors.section}
                    // helperText={formik.touched.section && formik.errors.section}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="name"
                        label="Name*"
                        autoComplete="new-name"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        error={!!formik.touched.name && !!formik.errors.name}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.result && !!formik.errors.result}
                    >
                        <InputLabel id="resultField">result</InputLabel>
                        <Select
                            variant="filled"
                            labelId="resultField"
                            label="Result"
                            name="result"
                            autoComplete="new-result"
                            value={formik.values.result}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value={"active"}>Pass</MenuItem>
                            <MenuItem value={"inactive"}>Fail</MenuItem>
                        </Select>
                        <FormHelperText>{formik.touched.result && formik.errors.result}</FormHelperText>
                    </FormControl>
                </Box>
            </form >
        </Box >
    );
}

export default UserFormComponent;
