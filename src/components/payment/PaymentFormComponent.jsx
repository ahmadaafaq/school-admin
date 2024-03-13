/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, InputLabel, MenuItem, FormHelperText, FormControl, FormControlLabel, Autocomplete } from "@mui/material";
import { Checkbox, Select, TextField, useMediaQuery } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useFormik } from "formik";

import API from "../../apis";
import paymentValidation from "./Validation";

import { setSchoolClasses } from "../../redux/actions/ClassAction";
import { setSchoolSections } from "../../redux/actions/SectionAction";
import { setAllStudents, setStudents } from "../../redux/actions/StudentAction";
import { useCommon } from "../hooks/common";
import { Utility } from "../utility";


const initialValues = {
    student: "",
    academic_year: "",
    amount: "",
    due_date: null,
    type: "school",
    payment_status: "pending",
    payment_method: "cash",
    payment_date: null,
    late_fee: ""
};

const PaymentFormComponent = ({
    onChange,
    refId,
    setDirty,
    reset,
    setReset,
    userId,
    updatedValues = null
}) => {

    const [initialState, setInitialState] = useState(initialValues);
    const [classData, setClassData] = useState([]);
    const schoolClasses = useSelector(state => state.schoolClasses);
    const schoolSections = useSelector(state => state.schoolSections);
    const allStudents = useSelector(state => state.allFormStudents);

    const dispatch = useDispatch();
    const { fetchAndSetSchoolData } = Utility();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isMobile = useMediaQuery("(max-width:480px)");
    const { getPaginatedData, getStudents } = useCommon();

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: paymentValidation,
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


    useEffect(() => {
        if (!schoolClasses?.listData?.length || !schoolSections?.listData?.length) {
            fetchAndSetSchoolData(dispatch, setSchoolClasses, setSchoolSections, setClassData);
        }
    }, []);

    useEffect(() => {
        if (formik.values.class && formik.values.section) {
            getStudents(formik.values.class, formik.values.section, setAllStudents, API);
        }
    }, [formik.values.class, formik.values.section]);

    useEffect(() => {
        const getAndSetSections = () => {
            const classSections = classData?.filter(obj => obj.class_id === formik.values.class) || [];
            const selectedSections = classSections.map(({ section_id, section_name }) => ({ section_id, section_name }));
            dispatch(setSchoolSections(selectedSections));
        };
        getAndSetSections();
    }, [formik.values.class, classData?.length]);

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
                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.class && !!formik.errors.class}
                    >
                        <InputLabel>Class</InputLabel>
                        <Select
                            variant="filled"
                            name="class"
                            value={formik.values.class}
                            onChange={event => {
                                formik.setFieldValue("class", event.target.value);
                                if (formik.values.section) {        //if old values are there, clean them according to change
                                    formik.setFieldValue("section", '');
                                }
                            }}
                        >
                            {!schoolClasses?.listData?.length ? null :
                                schoolClasses.listData.map(cls => (
                                    <MenuItem value={cls.class_id} name={cls.class_name} key={cls.class_name}>
                                        {cls.class_name}
                                    </MenuItem>
                                ))}
                        </Select>
                        <FormHelperText>{formik.touched.class && formik.errors.class}</FormHelperText>
                    </FormControl>
                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.section && !!formik.errors.section}
                    >
                        <InputLabel >Section</InputLabel>
                        <Select
                            variant="filled"
                            name="section"
                            value={formik.values.section}
                            onChange={event => formik.setFieldValue("section", event.target.value)}
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
                    <FormControl variant="filled" sx={{ minWidth: 220 }}
                        error={!!formik.touched.student && !!formik.errors.student}
                    >
                        <InputLabel id="studentField">Name</InputLabel>
                        <Select
                            labelId="studentField"
                            name="student"
                            value={formik.values.student}
                            onChange={event => formik.setFieldValue("student", event.target.value)}
                        >
                            {!allStudents?.listData?.rows?.length ? null :
                                allStudents.listData.rows.map(item => (
                                    <MenuItem value={item.id} name={`${item.firstname} ${item.lastname}`} key={item.id}>
                                        {`${item.firstname} ${item.lastname}`}
                                    </MenuItem>
                                ))}
                        </Select>
                        <FormHelperText>{formik.touched.student && formik.errors.student}</FormHelperText>
                    </FormControl>

                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="academic_year"
                        label="Academic Year"
                        autoComplete="new-academic_year"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.academic_year}
                        error={!!formik.touched.academic_year && !!formik.errors.academic_year}
                        helperText={formik.touched.academic_year && formik.errors.academic_year}
                    />
                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.payment_status && !!formik.errors.payment_status}
                    >
                        <InputLabel id="payment_statusField">Payment_status</InputLabel>
                        <Select
                            variant="filled"
                            labelId="payment_statusField"
                            label="Payment_Status"
                            name="payment_status"
                            autoComplete="new-payment_status"
                            value={formik.values.payment_status}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value={"pending"}>Pending</MenuItem>
                            <MenuItem value={"partial"}>partial</MenuItem>
                            <MenuItem value={"full"}>full</MenuItem>

                        </Select>
                        <FormHelperText>{formik.touched.payment_status && formik.errors.payment_status}</FormHelperText>
                    </FormControl>
                    <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        name="amount"
                        label="Amount"
                        autoComplete="new-amount"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.amount}
                        error={!!formik.touched.amount && !!formik.errors.amount}
                        helperText={formik.touched.amount && formik.errors.amount}
                    />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            format="DD MMMM YYYY"            //ex - 25 July 2023
                            views={['day', "month", "year"]}
                            label="Select Due_Date"
                            name="due_date"
                            required
                            value={formik.values.due_date}
                            onChange={newDue_Date => {
                                formik.setFieldValue("date", newDue_Date);
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
                            <MenuItem value={"school"}>School</MenuItem>
                            <MenuItem value={"event"}>Event</MenuItem>
                            <MenuItem value={"cycle stand"}>Cycle Stand</MenuItem>
                            <MenuItem value={"bus"}>Bus</MenuItem>

                        </Select>
                        <FormHelperText>{formik.touched.type && formik.errors.type}</FormHelperText>
                    </FormControl>

                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.payment_method && !!formik.errors.payment_method}
                    >
                        <InputLabel id="payment_methodField">Payment_method</InputLabel>
                        <Select
                            variant="filled"
                            labelId="payment_methodField"
                            label="Payment Method"
                            name="payment_method"
                            autoComplete="new-payment_method"
                            value={formik.values.payment_method}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value={"cash"}>cash</MenuItem>
                            <MenuItem value={"credit card"}>credit card</MenuItem>
                            <MenuItem value={"online transfer"}>online transfer</MenuItem>

                        </Select>
                        <FormHelperText>{formik.touched.payment_method && formik.errors.payment_method}</FormHelperText>
                    </FormControl>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            format="DD MMMM YYYY"            //ex - 25 July 2023
                            views={['day', "month", "year"]}
                            label="Select Payment_date"
                            name="payment_date"
                            required
                            value={formik.values.payment_date}
                            onChange={newPayment_date => {
                                formik.setFieldValue("date", newPayment_date);
                            }}
                        />
                    </LocalizationProvider>

                    <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Late Fees"
                        name="late_fee"
                        autoComplete="new-late_fee"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.late_fee}
                        error={!!formik.touched.late_fee && !!formik.errors.late_fee}
                        helperText={formik.touched.late_fee && formik.errors.late_fee}

                    />
                </Box>
            </form >
        </Box >
    );
}

export default PaymentFormComponent;
