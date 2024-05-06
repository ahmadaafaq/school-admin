/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Autocomplete, Box, Checkbox, FormHelperText, FormControl, FormControlLabel } from "@mui/material";
import { Divider, InputLabel, MenuItem, Select, TextField, useMediaQuery } from "@mui/material";
import { useFormik } from "formik";

import config from "../config";
import schoolValidation from "./Validation";

import { Utility } from "../utility";

const initialValues = {
    name: "",
    email: "",
    contact_no_1: "",
    contact_no_2: "",
    director: "",
    principal: "",
    board: "",
    area: "",
    registered_by: "",
    registration_year: "",
    session_start: "",
    amenities: [],
    payment_methods: [],
    classes: [],
    classes_fee: [],
    classes_capacity: [],
    sections: [],
    subjects: [[]],
    is_boarding: false,
    boarding_capacity: "",
    capacity: "",
    founding_year: "",
    affiliation_no: "",
    type: "",
    sub_type: "",
    status: "inactive"
};

const SchoolFormComponent = ({
    onChange,
    refId,
    setDirty,
    reset,
    setReset,
    allClasses,
    allSections,
    amenities,
    paymentMethods,
    subjectsInRedux,
    updatedValues = null
}) => {

    const [initialState, setInitialState] = useState(initialValues);
    const checkboxLabel = { inputProps: { 'aria-label': 'Checkboxes' } };
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isMobile = useMediaQuery("(max-width:480px)");
    const { createDropdown, createDivider, findMultipleById } = Utility();

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
                    : false,
                dirty: formik.dirty
            });
        }
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
            const splittedArray = updatedValues.selectedClass.reduce((acc, obj) => {
                const key = obj.class_id;
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(obj);
                return acc;
            }, {});

            // Check if splittedArray is not empty and has keys
            const hasData = splittedArray && Object.keys(splittedArray).length > 0;

            const assignUpdatedSections = (sectionData) => {
                let filteredSectionArray = [];
                sectionData.map(sections => {

                    // Filter out sections from allSections that have matching ids in the current section
                    let filteredSection = allSections?.filter(obj =>
                        sections.some(sect => sect.section_id === obj.section_id)
                    );
                    filteredSectionArray.push(filteredSection);
                });
                return filteredSectionArray;
            };

            const assignUpdatedSubjects = (splittedArray) => {
                const subArr = [[]];
                // Iterate over each class in the splittedArray
                Object.keys(splittedArray).map((field, index) => {
                    // Iterate over each section in the current class
                    Object.values(splittedArray)[index].map((section, sectionIndex) => {
                        // Get the subjects for the current section
                        const value = findMultipleById(section.subject_ids, subjectsInRedux);
                        // If not the first class and first section, ensure subArr[index] is initialized
                        if (index > 0 && sectionIndex === 0) {
                            subArr[index] = [];
                        }
                        subArr[index][sectionIndex] = value;
                    });
                });
                return subArr;
            };

            // Helper function to extract class attribute from splittedArray
            const getClassAttribute = (splittedArray, attributeName) => {
                return hasData ? Object.values(splittedArray).map(classArray => classArray[0][attributeName]) : [];
            };

            setInitialState({
                ...initialState,
                ...updatedValues.schoolData,
                classes: hasData ? Object.keys(splittedArray) : [],
                sections: hasData ? assignUpdatedSections(Object.values(splittedArray)) : [],
                subjects: hasData ? assignUpdatedSubjects(splittedArray) : [[]],
                classes_fee: getClassAttribute(splittedArray, 'class_fee'),
                classes_capacity: getClassAttribute(splittedArray, 'class_capacity')
            });
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
                        marginBottom: '40px'
                    }}
                >
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="name"
                        label="Name*"
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
                        name="registered_by"
                        label="Registered By*"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.registered_by}
                        error={!!formik.touched.registered_by && !!formik.errors.registered_by}
                        helperText={formik.touched.registered_by && formik.errors.registered_by}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="registration_year"
                        label="Registration Year*"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.registration_year}
                        error={!!formik.touched.registration_year && !!formik.errors.registration_year}
                        helperText={formik.touched.registration_year && formik.errors.registration_year}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="affiliation_no"
                        label="Affiliation No*"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.affiliation_no}
                        error={!!formik.touched.affiliation_no && !!formik.errors.affiliation_no}
                        helperText={formik.touched.affiliation_no && formik.errors.affiliation_no}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="board"
                        label="Board*"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.board}
                        error={!!formik.touched.board && !!formik.errors.board}
                        helperText={formik.touched.board && formik.errors.board}
                    />
                    <Autocomplete
                        multiple
                        options={amenities || []}
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
                    <Autocomplete
                        multiple
                        options={paymentMethods || []}
                        getOptionLabel={option => option.name}
                        disableCloseOnSelect
                        value={formik.values.payment_methods}
                        onChange={(event, value) => formik.setFieldValue("payment_methods", value)}
                        sx={{ gridColumn: "span 2" }}
                        renderInput={params => (
                            <TextField
                                {...params}
                                variant="filled"
                                type="text"
                                name="payment_methods"
                                label="Payment Methods"
                                error={!!formik.touched.payment_methods && !!formik.errors.payment_methods}
                                helperText={formik.touched.payment_methods && formik.errors.payment_methods}
                            />
                        )}
                    />
                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.session_start && !!formik.errors.session_start}
                    >
                        <InputLabel>Session Start</InputLabel>
                        <Select
                            variant="filled"
                            name="session_start"
                            value={formik.values.session_start}
                            onChange={event => formik.setFieldValue('session_start', event.target.value)}
                        >
                            {createDropdown(createDivider('monthly')).map((period, index) => (
                                <MenuItem key={index} value={period}>
                                    {period}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{formik.touched.session_start && formik.errors.session_start}</FormHelperText>
                    </FormControl>
                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.type && !!formik.errors.type}
                    >
                        <InputLabel>Type</InputLabel>
                        <Select
                            variant="filled"
                            name="type"
                            value={formik.values.type}
                            onChange={formik.handleChange}
                        >
                            {Object.keys(config.schoolType).map(item => (
                                <MenuItem key={item} value={item}>
                                    {config.schoolType[item]}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{formik.touched.type && formik.errors.type}</FormHelperText>
                    </FormControl>
                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.sub_type && !!formik.errors.sub_type}
                    >
                        <InputLabel>Sub Type</InputLabel>
                        <Select
                            variant="filled"
                            name="sub_type"
                            value={formik.values.sub_type}
                            onChange={event => formik.setFieldValue("sub_type", event.target.value)}
                        >
                            {Object.keys(config.subSchoolType).map(item => (
                                <MenuItem key={item} value={item}>
                                    {config.subSchoolType[item]}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{formik.touched.sub_type && formik.errors.sub_type}</FormHelperText>
                    </FormControl>
                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.status && !!formik.errors.status}
                    >
                        <InputLabel>Status</InputLabel>
                        <Select
                            variant="filled"
                            name="status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                        >
                            {Object.keys(config.status).map(item => (
                                <MenuItem key={item} value={item}>
                                    {config.status[item]}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="area"
                        label="Area"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.area}
                        error={!!formik.touched.area && !!formik.errors.area}
                        helperText={formik.touched.area && formik.errors.area}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="capacity"
                        label="Capacity"
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
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.founding_year}
                        error={!!formik.touched.founding_year && !!formik.errors.founding_year}
                        helperText={formik.touched.founding_year && formik.errors.founding_year}
                    />
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
                    display='grid'
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    padding='10px'
                    marginBottom='40px'
                >
                    {formik.values.classes.map((field, index) => {
                        let key = index + 1;
                        return (
                            <React.Fragment key={key}>
                                <FormControl variant="filled" sx={{ minWidth: 120 }}
                                    error={!!formik.touched.classes && !!formik.errors.classes}
                                >
                                    <InputLabel>Class</InputLabel>
                                    <Select
                                        variant="filled"
                                        name={`classes.${key}`}
                                        value={formik.values.classes[index]}
                                        onChange={(event, value) => {
                                            const subArr = [...formik.values.classes];
                                            subArr[index] = value.props.value;
                                            formik.setFieldValue("classes", subArr);
                                            if (formik.values.sections) {            //If old values are there, clean them accordingly
                                                formik.setFieldValue("sections", []);
                                            }
                                            if (formik.values.subjects) {
                                                formik.setFieldValue("subjects", [[]]);
                                            }
                                        }}
                                    >
                                        {!allClasses?.length ? null :
                                            allClasses.map(cls => (
                                                <MenuItem value={cls.class_id} name={cls.class_name} key={cls.class_id}>
                                                    {cls.class_name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                    <FormHelperText>{formik.touched.classes && formik.errors.classes}</FormHelperText>
                                </FormControl>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    name={`classes_fee.${key}`}
                                    label="Class Fee"
                                    onBlur={formik.handleBlur}
                                    value={formik.values.classes_fee[index]}
                                    onChange={event => {
                                        const feeArr = [...formik.values.classes_fee];
                                        feeArr[index] = parseInt(event.target.value);
                                        formik.setFieldValue("classes_fee", feeArr);
                                    }}
                                    error={!!formik.touched.classes_fee && !!formik.errors.classes_fee}
                                    helperText={formik.touched.classes_fee && formik.errors.classes_fee}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    name={`classes_capacity.${key}`}
                                    label="Class Capacity"
                                    onBlur={formik.handleBlur}
                                    value={formik.values.classes_capacity[index]}
                                    onChange={event => {
                                        const feeArr = [...formik.values.classes_capacity];
                                        feeArr[index] = parseInt(event.target.value);
                                        formik.setFieldValue("classes_capacity", feeArr);
                                    }}
                                    error={!!formik.touched.classes_capacity && !!formik.errors.classes_capacity}
                                    helperText={formik.touched.classes_capacity && formik.errors.classes_capacity}
                                />
                                <Autocomplete
                                    multiple
                                    options={allSections || []}
                                    getOptionLabel={option => option.section_name}
                                    disableCloseOnSelect
                                    value={formik.values.sections[index]}
                                    onChange={(event, value) => {
                                        const sectArr = [...formik.values.sections];
                                        sectArr[index] = value;
                                        formik.setFieldValue("sections", sectArr);
                                    }}
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            variant="filled"
                                            type="text"
                                            name={`sections.${key}`}
                                            label="Section"
                                            error={!!formik.touched.sections && !!formik.errors.sections}
                                            helperText={formik.touched.sections && formik.errors.sections}
                                        />
                                    )}
                                />
                                {formik?.values?.sections[index]?.map((section, sectionIndex) => (
                                    <Autocomplete
                                        multiple
                                        key={key + sectionIndex}
                                        options={subjectsInRedux || []}
                                        getOptionLabel={option => option.name}
                                        disableCloseOnSelect
                                        value={formik.values.subjects[index] ?
                                            formik.values.subjects[index][sectionIndex] || [] : []}
                                        onChange={(event, value) => {
                                            const subArr = [...formik.values.subjects];
                                            if (index > 0 && sectionIndex === 0) {
                                                subArr[index] = [];
                                            }
                                            subArr[index][sectionIndex] = value;
                                            formik.setFieldValue('subjects', subArr);
                                        }}
                                        sx={{ gridColumn: "span 2" }}
                                        renderInput={params => (
                                            <TextField
                                                {...params}
                                                variant="filled"
                                                type="text"
                                                name={`subjects.${index}.${sectionIndex}`}
                                                label={`Subjects For Section ${section.section_name}`}
                                                error={!!formik.touched.subjects && !!formik.errors.subjects}
                                                helperText={formik.touched.subjects && formik.errors.subjects}
                                            />
                                        )}
                                    />
                                ))}
                                <Divider sx={{ borderBottomWidth: 0, gridColumn: 'span 4' }} />
                            </React.Fragment>)
                    })}

                    <React.Fragment key={formik.values.classes.length + 1}>
                        <FormControl variant="filled" sx={{ minWidth: 120 }}
                            error={!!formik.touched.classes && !!formik.errors.classes}
                        >
                            <InputLabel>Class</InputLabel>
                            <Select
                                variant="filled"
                                name={`classes${formik.values.classes.length + 1}`}
                                value={[]}
                                onChange={(event, value) => {
                                    const subArr = [...formik.values.classes];
                                    subArr[formik.values.classes.length] = value.props.value;
                                    formik.setFieldValue("classes", subArr);
                                }}
                            >
                                {!allClasses?.length ? null :
                                    allClasses
                                        .filter(cls => !formik.values.classes.includes(cls.class_id)) // Exclude the selected class
                                        .map(cls => (
                                            <MenuItem value={cls.class_id} name={cls.class_name} key={cls.class_id}>
                                                {cls.class_name}
                                            </MenuItem>
                                        ))}
                            </Select>
                            <FormHelperText>{formik.touched.classes && formik.errors.classes}</FormHelperText>
                        </FormControl>
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            name={`classes_fee.${formik.values.classes_fee.length + 1}`}
                            label="Class Fee"
                            onBlur={formik.handleBlur}
                            value={[]}
                            onChange={event => {
                                const subArr = [...formik.values.classes_fee];
                                subArr[formik.values.classes_fee.length] = event.target.value;
                                formik.setFieldValue("classes_fee", subArr);
                            }}
                            error={!!formik.touched.classes_fee && !!formik.errors.classes_fee}
                            helperText={formik.touched.classes_fee && formik.errors.classes_fee}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            name={`classes_capacity.${formik.values.classes_capacity.length + 1}`}
                            label="Class Capacity"
                            onBlur={formik.handleBlur}
                            value={[]}
                            onChange={event => {
                                const subArr = [...formik.values.classes_capacity];
                                subArr[formik.values.classes_capacity.length] = event.target.value;
                                formik.setFieldValue("classes_capacity", subArr);
                            }}
                            error={!!formik.touched.classes_capacity && !!formik.errors.classes_capacity}
                            helperText={formik.touched.classes_capacity && formik.errors.classes_capacity}
                        />

                        <Autocomplete
                            multiple
                            options={allSections || []}
                            getOptionLabel={option => option.section_name}
                            disableCloseOnSelect
                            value={[]}
                            onChange={(event, value) => {
                                const sectArr = [...formik.values.sections];
                                sectArr[formik.values.classes.length] = value;
                                formik.setFieldValue("sections", sectArr);
                            }}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    variant="filled"
                                    type="text"
                                    name={`sections${formik.values.classes.length + 1}`}
                                    label="Section"
                                />
                            )}
                        />
                    </React.Fragment>

                </Box>
            </form>
        </Box>
    );
};

SchoolFormComponent.propTypes = {
    onChange: PropTypes.func,
    refId: PropTypes.shape({
        current: PropTypes.any
    }),
    setDirty: PropTypes.func,
    reset: PropTypes.bool,
    setReset: PropTypes.func,
    allClasses: PropTypes.array,
    allSections: PropTypes.array,
    amenities: PropTypes.array,
    paymentMethods: PropTypes.array,
    subjectsInRedux: PropTypes.array,
    updatedValues: PropTypes.object
};

export default SchoolFormComponent;
