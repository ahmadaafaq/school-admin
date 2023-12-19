/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import React, { useState, useEffect } from "react";

import { Box, Checkbox, InputLabel, MenuItem, FormHelperText, FormControl, FormControlLabel } from "@mui/material";
import { Select, TextField, useMediaQuery } from "@mui/material";
import { useFormik } from "formik";

import API from "../../apis";
import schoolValidation from "./Validation";
import { useSelector } from "react-redux";

const initialValues = {
    name: "",
    email: "",
    contact_no_1: "",
    contact_no_2: "",
    director: "",
    principal: "",
    board: "",
    area: "",
    amenities: [],
    is_boarding: false,
    boarding_capacity: 0,
    capacity: 0,
    founding_year: 0,
    affiliation_no: 0,
    type: "",
    sub_type: "",
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
    const checkboxLabel = { inputProps: { 'aria-label': 'Checkboxes' } };
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isMobile = useMediaQuery("(max-width:480px)");

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: schoolValidation,
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
                        name="name"
                        label="Name*"
                        autoComplete="new-name"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        error={!!formik.touched.name && !!formik.errors.name}
                        helperText={formik.touched.name && formik.errors.name}
                        sx={{ gridColumn: "span 2", marginBottom: "20px" }}
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
                        name="contact_no_1"
                        autoComplete="new-contact"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.contact_no_1}
                        error={!!formik.touched.contact_no_1 && !!formik.errors.contact_no_1}
                        helperText={formik.touched.contact_no_1 && formik.errors.contact_no_1}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Optional Contact Number"
                        name="contact_no_2"
                        autoComplete="new-contact"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.contact_no_2}
                        error={!!formik.touched.contact_no_2 && !!formik.errors.contact_no_2}
                        helperText={formik.touched.contact_no_2 && formik.errors.contact_no_2}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="director"
                        label="Director*"
                        autoComplete="new-director"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.director}
                        error={!!formik.touched.director && !!formik.errors.director}
                        helperText={formik.touched.director && formik.errors.director}
                        sx={{ gridColumn: "span 2", marginBottom: "20px" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="principal"
                        label="Principal*"
                        autoComplete="new-principal"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.principal}
                        error={!!formik.touched.principal && !!formik.errors.principal}
                        helperText={formik.touched.principal && formik.errors.principal}
                        sx={{ gridColumn: "span 2", marginBottom: "20px" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="board"
                        label="Board"
                        autoComplete="new-board"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.board}
                        error={!!formik.touched.board && !!formik.errors.board}
                        helperText={formik.touched.board && formik.errors.board}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="area"
                        label="Area"
                        autoComplete="new-area"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.area}
                        error={!!formik.touched.area && !!formik.errors.area}
                        helperText={formik.touched.area && formik.errors.area}
                    />
                    {/* <Autocomplete
                        multiple
                        options={amenities}
                        getOptionLabel={option => option.name}
                        disableCloseOnSelect
                        value={formik.values.amenities}
                        onChange={(event, value) => formik.setFieldValue("amenities", value)}
                        sx={{ gridColumn: "span 2" }}
                        renderInput={params => (
                            <TextField
                                {...params}
                                variant="filled"
                                type="text"
                                name="amenities"
                                label="Amenities"
                                error={!!formik.touched.amenities && !!formik.errors.amenities}
                                helperText={formik.touched.amenities && formik.errors.amenities}
                            />
                        )}
                    /> */}
                    <FormControlLabel label="Is Boarding" sx={{ gridColumn: isMobile ? "span 2" : "" }}
                        control={
                            <Checkbox {...checkboxLabel} color="default"
                                checked={formik.values.is_boarding ? true : false}
                                name="is_boarding"
                                onChange={(event, value) => formik.setFieldValue("is_boarding", value)}
                                value={formik.values.is_boarding}
                            />
                        } />
                    {formik.values.is_boarding &&
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            name="boarding_capacity"
                            label="Boarding Capacity"
                            autoComplete="new-boarding_capacity"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.boarding_capacity}
                            error={!!formik.touched.boarding_capacity && !!formik.errors.boarding_capacity}
                            helperText={formik.touched.boarding_capacity && formik.errors.boarding_capacity}
                            sx={{ gridColumn: "span 2" }}
                        />}
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="capacity"
                        label="Capacity"
                        autoComplete="new-capacity"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.capacity}
                        error={!!formik.touched.capacity && !!formik.errors.capacity}
                        helperText={formik.touched.capacity && formik.errors.capacity}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="founding_year"
                        label="Founding Year"
                        autoComplete="new-founding_year"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.founding_year}
                        error={!!formik.touched.founding_year && !!formik.errors.founding_year}
                        helperText={formik.touched.founding_year && formik.errors.founding_year}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="affiliation_no"
                        label="Affiliation No"
                        autoComplete="new-affiliation_no"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.affiliation_no}
                        error={!!formik.touched.affiliation_no && !!formik.errors.affiliation_no}
                        helperText={formik.touched.affiliation_no && formik.errors.affiliation_no}
                    />

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
                            <MenuItem value={"co-ed"}>Co-Ed</MenuItem>
                            <MenuItem value={"boys"}>Boys</MenuItem>
                            <MenuItem value={"girls"}>Girls</MenuItem>
                        </Select>
                        <FormHelperText>{formik.touched.type && formik.errors.type}</FormHelperText>
                    </FormControl>
                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.sub_type && !!formik.errors.sub_type}
                    >
                        <InputLabel id="sub_typeField">Sub Type</InputLabel>
                        <Select
                            variant="filled"
                            labelId="sub_typeField"
                            label="sub_type"
                            name="sub_type"
                            autoComplete="new-sub_type"
                            value={formik.values.sub_type}
                            onChange={event => formik.setFieldValue("sub_type", event.target.value)}
                        >
                            <MenuItem value={"playgroup"}>Playgroup</MenuItem>
                            <MenuItem value={"junior"}>Junior</MenuItem>
                            <MenuItem value={"senior"}>Senior</MenuItem>
                            <MenuItem value={"senior-sec"}>Senior-Sec</MenuItem>
                        </Select>
                        <FormHelperText>{formik.touched.sub_type && formik.errors.sub_type}</FormHelperText>
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
                    </FormControl>
                </Box>
            </form>
        </Box>
    );
}

export default UserFormComponent;
