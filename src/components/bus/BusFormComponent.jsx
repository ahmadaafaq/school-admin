/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import React, { useState, useEffect } from "react";

import { Box, FormControl, FormControlLabel, InputLabel, MenuItem, FormHelperText } from "@mui/material";
import { Select, TextField, useMediaQuery } from "@mui/material";
import { useFormik } from "formik";

import BusValidation from "./Validation";

const initialValues = {
    bus_reg_no: "",
    driver: "",
    contact_no: "",
    license_no: "",
    route: "",
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
        validationSchema: BusValidation,
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
                >  <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="bus_reg_no"
                        label="Bus registration no*"
                        onBlur={(e) => formik.handleBlur(e) && formik.setFieldValue("bus_reg_no", e.target.value.toUpperCase())}
                        onChange={formik.handleChange}
                        value={formik.values.bus_reg_no}
                        error={!!formik.touched.bus_reg_no && !!formik.errors.bus_reg_no}
                        helperText={formik.touched.bus_reg_no && formik.errors.bus_reg_no}
                        sx={{ gridColumn: "span 2", marginBottom: "20px" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="driver"
                        label="Driver name*"
                        autoComplete="new-name"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.driver}
                        error={!!formik.touched.driver && !!formik.errors.driver}
                        helperText={formik.touched.driver && formik.errors.driver}
                        sx={{ gridColumn: "span 2", marginBottom: "20px" }}
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
                        label="License Number*"
                        name="license_no"
                        onBlur={(e) => formik.handleBlur(e) && formik.setFieldValue("license_no", e.target.value.toUpperCase())}
                        onChange={formik.handleChange}
                        value={formik.values.license_no}
                        error={!!formik.touched.license_no && !!formik.errors.license_no}
                        helperText={formik.touched.license_no && formik.errors.license_no}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Route*"
                        name="route"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.route}
                        error={!!formik.touched.route && !!formik.errors.route}
                        helperText={formik.touched.route && formik.errors.route}
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
