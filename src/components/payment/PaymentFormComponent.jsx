/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

import { Box, InputLabel, MenuItem, FormHelperText, FormControl, FormControlLabel, Autocomplete } from "@mui/material";
import { Checkbox, Select, TextField, useMediaQuery } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useFormik } from "formik";

import API from "../../apis";
import paymentValidation from "./Validation";

import { setClasses } from "../../redux/actions/ClassAction";
import { setSections } from "../../redux/actions/SectionAction";
import { setStudents } from "../../redux/actions/StudentAction";
import { useCommon } from "../hooks/common";

const initialValues = {
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
    const [classId, setClassId] = useState(null);
    const classInRedux = useSelector(state => state.allClasses);
    const [sectionId, setSectionId] = useState(null);
    const sectionInRedux = useSelector(state => state.allSections);
    const [studentId, setStudentId] = useState(null);
    const studentInRedux = useSelector(state => state.allStudents);

    // const checkboxLabel = { inputProps: { 'aria-label': 'Checkboxes' } };
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isMobile = useMediaQuery("(max-width:480px)");
    const { getPaginatedData,getStudents } = useCommon();

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
        if (!classInRedux?.listData?.rows?.length) {
            getPaginatedData(0, 100, setClasses, API.ClassAPI);
        }
    }, [classInRedux?.listData?.rows]);

    useEffect(() => {
        if (!sectionInRedux?.listData?.rows?.length) {
            getPaginatedData(0, 100, setSections, API.SectionAPI);
        }
    }, [sectionInRedux?.listData?.rows]);

    useEffect(() => {
        getStudents(formik.values.class_id, formik.values.section_id, setStudents, API);
    }, [formik.values.class_id, formik.values.section_id]);


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
                        error={!!formik.touched.class_id && !!formik.errors.class_id}
                    >
                        <InputLabel id="classField">--Select class*--</InputLabel>
                        <Select
                            autoComplete="new-class_id"
                            name="class_id"
                            variant="filled"
                            value={formik.values.class_id}
                            onChange={event => {
                                const getClassId = event.target.value;
                                setClassId(getClassId);
                                formik.setFieldValue("class_id", event.target.value);
                            }}
                        >
                            {classInRedux?.listData?.rows?.length && classInRedux.listData.rows.map(item => (
                                <MenuItem value={item.id} name={item.name} key={item.name}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{formik.touched.class_id && formik.errors.class_id}</FormHelperText>
                    </FormControl>

                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.section_id && !!formik.errors.section_id}
                    >
                        <InputLabel id="sectionField">--Select section*--</InputLabel>
                        <Select
                            autoComplete="new-section_id"
                            name="section_id"
                            variant="filled"
                            value={formik.values.section_id}
                            onChange={event => {
                                const getSectionId = event.target.value;
                                setSectionId(getSectionId);
                                formik.setFieldValue("section_id", event.target.value);

                            }}
                        >
                            {sectionInRedux?.listData?.rows?.length && sectionInRedux.listData.rows.map(item => (
                                <MenuItem value={item.id} name={item.name} key={item.name}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{formik.touched.section_id && formik.errors.section_id}</FormHelperText>
                    </FormControl>


                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.student_id && !!formik.errors.student_id}
                    >
                        <InputLabel id="studentField">--Select student*--</InputLabel>
                        <Select
                            autoComplete="new-student_id"
                            name="student_id"
                            variant="filled"
                            value={formik.values.student_id}
                            onChange={event => {
                                const getStudentId = event.target.value;
                                setStudentId(getStudentId);
                                formik.setFieldValue("student_id", event.target.value);
                            }}
                        >
                            {studentInRedux?.listData?.rows?.length && studentInRedux.listData.rows.map(item => (
                                <MenuItem value={item.id} name={`${item.firstname} ${item.lastname}`} key={item.firstname}>
                                    {`${item.firstname} ${item.lastname}`}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{formik.touched.student_id && formik.errors.student_id}</FormHelperText>
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
