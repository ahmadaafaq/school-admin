/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import { Box } from "@mui/material";
import { TextField, useMediaQuery } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { useFormik } from "formik";

import API from "../../apis";
import SchoolPeriodValidation from "./Validation";

import { useCommon } from "../hooks/common";

const initialValues = {
    period: "",
    halves: "",
    recess_time: "",
    first_half_period_duration: "",
    second_half_period_duration: "",
    cutoff_time:"",
    opening_time: null,
    closing_time: null
};

const SchoolPeriodFormComponent = ({
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
        validationSchema: SchoolPeriodValidation,
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

   console.log('first>>',formik.values)

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
                        type="number"
                        name="period"
                        label="Period"
                        autoComplete="new-period"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.period}
                        error={!!formik.touched.period && !!formik.errors.period}
                        helperText={formik.touched.period && formik.errors.period}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        name="halves"
                        label="Halves"
                        autoComplete="new-halves"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.halves}
                        error={!!formik.touched.halves && !!formik.errors.halves}
                        helperText={formik.touched.halves && formik.errors.halves}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        name="recess_time"
                        label="Recess Time (mintues)"
                        autoComplete="new-recess_time"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.recess_time}
                        error={!!formik.touched.recess_time && !!formik.errors.recess_time}
                        helperText={formik.touched.recess_time && formik.errors.recess_time}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        name="first_half_period_duration"
                        label="First half period duration (mintues)"
                        autoComplete="new-first_half_period_duration"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.first_half_period_duration}
                        error={!!formik.touched.first_half_period_duration && !!formik.errors.first_half_period_duration}
                        helperText={formik.touched.first_half_period_duration && formik.errors.first_half_period_duration}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        name="second_half_period_duration"
                        label="Second half period duration (mintues)"
                        autoComplete="new-second_half_period_duration"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.second_half_period_duration}
                        error={!!formik.touched.second_half_period_duration && !!formik.errors.second_half_period_duration}
                        helperText={formik.touched.second_half_period_duration && formik.errors.second_half_period_duration}
                    />
                     <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        name="cutoff_time"
                        label="CutOff Time (mintues)"
                        autoComplete="new-cutoff_time"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.cutoff_time}
                        error={!!formik.touched.cutoff_time && !!formik.errors.cutoff_time}
                        helperText={formik.touched.cutoff_time && formik.errors.cutoff_time}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                            name="opening_time"
                            label="Opening time"
                            format="hh:mm A"
                            value={formik.values.opening_time}
                            onChange={newOpeningTime => {
                                formik.setFieldValue("opening_time", newOpeningTime);
                            }}
                            viewRenderers={{
                                hours: renderTimeViewClock,
                                minutes: renderTimeViewClock,
                                seconds: renderTimeViewClock,
                            }}
                        />
                        <TimePicker
                            name="closing_time"
                            label="Closing time"
                            value={formik.values.closing_time}
                            onChange={newClosingTime => {
                                formik.setFieldValue("closing_time", newClosingTime);
                            }}
                            viewRenderers={{
                                hours: renderTimeViewClock,
                                minutes: renderTimeViewClock,
                                seconds: renderTimeViewClock,
                            }}
                        />
                    </LocalizationProvider>
                    
                </Box>
            </form >
        </Box >
    );
}

export default SchoolPeriodFormComponent;
