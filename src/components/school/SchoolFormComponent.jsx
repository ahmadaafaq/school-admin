/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import React, { useState, useEffect } from "react";

import { Box, Checkbox, InputLabel, MenuItem, FormHelperText, FormControl, FormControlLabel } from "@mui/material";
import { Autocomplete, Divider, Select, TextField, useMediaQuery } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useFormik } from "formik";

import schoolValidation from "./Validation";

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
    classes: [],
    sections: [],
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
    schoolId,
    amenities,
    classesInRedux,
    sectionsInRedux,
    updatedValues = null
}) => {

    const [initialState, setInitialState] = useState(initialValues);
    const [fields, setFields] = useState([{ id: 1 }]);
    const [updatedArr, setUpdatedArr] = useState({});

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
                const key = obj.class_id;
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
                ...updatedValues.schoolData,
                classes: hasData ? Object.keys(updatedArrHelper) : [],
                sections: hasData ? Object.values(updatedArrHelper) : []
            });
        }
    }, [updatedValues]);
    console.log('Object.values(updatedArr)=>', Object.values(updatedArr));
    return (
        <Box m="20px">
            <form ref={refId}>
                <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        marginBottom: '40px'
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
                        sx={{ gridColumn: "span 2" }}
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
                    <Autocomplete
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
                    />
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
                            label="Specify Boarding Capacity"
                            autoComplete="new-boarding_capacity"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.boarding_capacity}
                            error={!!formik.touched.boarding_capacity && !!formik.errors.boarding_capacity}
                            helperText={formik.touched.boarding_capacity && formik.errors.boarding_capacity}
                        />}
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
                        }}> Add Classes </span>
                    </Box>

                    {/* create */}
                    {!schoolId && fields.map(field => (
                        <React.Fragment key={field.id}>
                            <FormControl variant="filled" sx={{ minWidth: 120 }}
                                error={!!formik.touched.classes && !!formik.errors.classes}
                            >
                                <InputLabel id={`classesField_${field.id}`}>Class</InputLabel>
                                <Select
                                    variant="filled"
                                    labelId={`classesField_${field.id}`}
                                    name={`classes${field.id}`}
                                    autoComplete="new-classes"
                                    value={formik.values.classes[field.id - 1]}
                                    onChange={(event, value) => {
                                        const subArr = [...formik.values.classes];
                                        subArr[field.id - 1] = value.props.value;
                                        formik.setFieldValue("classes", subArr)
                                    }}
                                >
                                    {classesInRedux?.length && classesInRedux.map(cls => (
                                        <MenuItem value={cls.id} name={cls.name} key={cls.name}>
                                            {cls.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{formik.touched.classes && formik.errors.classes}</FormHelperText>
                            </FormControl>

                            <Autocomplete
                                multiple
                                options={sectionsInRedux || []}
                                getOptionLabel={option => option.name}
                                disableCloseOnSelect
                                value={formik.values.sections[field.id - 1]}
                                onChange={(event, value) => {
                                    const clsArr = [...formik.values.sections];
                                    clsArr[field.id - 1] = value;
                                    formik.setFieldValue("sections", clsArr)
                                }}
                                sx={{ gridColumn: "span 2" }}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        variant="filled"
                                        type="text"
                                        name={`sections${field.id}`}
                                        label="Section"
                                    // error={`${!!formik.touched}.combinedClsSect_${field.id}` && !!formik.errors.{`combinedClsSect_${field.id}`}}
                                    // helperText={formik.touched.{`combinedClsSect_${field.id}`} && formik.errors.{`combinedClsSect_${field.id}`}}
                                    />
                                )}
                            />
                            {fields.length > 1 && <Divider sx={{ borderBottomWidth: '0px' }} />}
                        </React.Fragment>))}

                    {/* Update */}
                    {schoolId && Object.values(updatedArr).map((field, index) => {
                        let key = index + 1;
                        // console.log(updatedArr[index])
                        return (
                            <React.Fragment key={key}>
                                <FormControl variant="filled" sx={{ minWidth: 120 }}
                                    error={!!formik.touched.classes && !!formik.errors.classes}
                                >
                                    <InputLabel id={`classesField_${key}`}>Class</InputLabel>
                                    <Select
                                        variant="filled"
                                        labelId={`classesField_${key}`}
                                        name={`classes${key}`}
                                        autoComplete="new-classes"
                                        value={field[0]?.class_id}
                                        onChange={(event, value) => {
                                            const subArr = [...formik.values.classes];
                                            subArr[key - 1] = value.props.value;
                                            formik.setFieldValue("classes", subArr)
                                        }}
                                    >
                                        {classesInRedux?.length && classesInRedux.map(cls => (
                                            <MenuItem value={cls.id} name={cls.name} key={cls.name}>
                                                {cls.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>{formik.touched.classes && formik.errors.classes}</FormHelperText>
                                </FormControl>

                                <Autocomplete
                                    multiple
                                    options={sectionsInRedux || []}
                                    getOptionLabel={option => option.name}
                                    disableCloseOnSelect
                                    value={formik.values.sections[index] || []}
                                    onChange={(event, value) => {
                                        const clsArr = [...formik.values.sections];
                                        clsArr[key - 1] = value;
                                        formik.setFieldValue("sections", clsArr)
                                    }}
                                    sx={{ gridColumn: "span 2" }}
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            variant="filled"
                                            type="text"
                                            name={`sections${key}`}
                                            label="Section"
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
