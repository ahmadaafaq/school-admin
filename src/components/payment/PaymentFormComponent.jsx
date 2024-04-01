/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import {
  Box,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
} from "@mui/material";
import { Select, TextField, useMediaQuery } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useFormik } from "formik";

import API from "../../apis";
import config from '../config';
import paymentValidation from "./Validation";
import Toast from "../common/Toast";

import { setSchoolClasses } from "../../redux/actions/ClassAction";
import { setSchoolSections } from "../../redux/actions/SectionAction";
import { setAllStudents } from "../../redux/actions/StudentAction";
import { useCommon } from "../hooks/common";
import { Utility } from "../utility";

const initialValues = {
  class_id: "",
  section: "",
  student_id: "",
  academic_year: "",
  amount: "",
  due_date: null,
  type: "school",
  payment_status: "pending",
  payment_method: "cash",
  payment_date: null,
  late_fee: "",
};

const PaymentFormComponent = ({
  onChange,
  refId,
  setDirty,
  reset,
  setReset,
  updatedValues = null,
}) => {
  const [initialState, setInitialState] = useState(initialValues);
  const [classData, setClassData] = useState([]);
  const schoolClasses = useSelector((state) => state.schoolClasses);
  const schoolSections = useSelector((state) => state.schoolSections);
  const allStudents = useSelector((state) => state.allFormStudents);
  const toastInfo = useSelector((state) => state.toastInfo);

  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  // const isMobile = useMediaQuery("(max-width:480px)");
  const { getStudents } = useCommon();
  const { toastAndNavigate, fetchAndSetSchoolData } = Utility();

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: paymentValidation,
    enableReinitialize: true,
    onSubmit: () => watchForm(),
  });

  React.useImperativeHandle(refId, () => ({
    Submit: async () => {
      await formik.submitForm();
    },
  }));

  const watchForm = () => {
    if (onChange) {
      onChange({
        values: formik.values,
        validated: formik.isSubmitting
          ? Object.keys(formik.errors).length === 0
          : false,
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
      setInitialState(updatedValues);
    }
  }, [updatedValues]);

  useEffect(() => {
    if (!schoolClasses?.listData?.length || !schoolSections?.listData?.length) {
      fetchAndSetSchoolData(
        dispatch,
        setSchoolClasses,
        setSchoolSections,
        setClassData
      );
    }
  }, []);

  // filter out class section from the classData object
  useEffect(() => {
    const getAndSetSections = () => {
      const classSections =
        classData?.filter((obj) => obj.class_id === formik.values?.class_id) ||
        [];
      const selectedSections = classSections.map(
        ({ section_id, section_name }) => ({ section_id, section_name })
      );
      dispatch(setSchoolSections(selectedSections));
    };
    getAndSetSections();
  }, [formik.values?.class_id, classData?.length]);

  useEffect(() => {
    getStudents(
      formik.values.class_id,
      formik.values.section,
      setAllStudents,
      API
    );
  }, [formik.values.class_id, formik.values.section]);

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
          <FormControl
            variant="filled"
            sx={{ minWidth: 120 }}
            error={!!formik.touched.class_id && !!formik.errors.class_id}
          >
            <InputLabel>--Class*--</InputLabel>
            <Select
              name="class_id"
              variant="filled"
              value={formik.values.class_id}
              onChange={(event) => {
                formik.setFieldValue("class_id", event.target.value);
                if (formik.values.section) {
                  //if old values are there, clean them according to change
                  formik.setFieldValue("section", "");
                }
                if (formik.values.student_id) {
                  formik.setFieldValue("student_id", "");
                }
              }}
            >
              {!schoolClasses?.listData?.length
                ? null
                : schoolClasses.listData.map((cls) => (
                  <MenuItem
                    value={cls.class_id}
                    name={cls.class_name}
                    key={cls.class_id}
                  >
                    {cls.class_name}
                  </MenuItem>
                ))}
            </Select>
            <FormHelperText>
              {formik.touched.class_id && formik.errors.class_id}
            </FormHelperText>
          </FormControl>
          <FormControl
            variant="filled"
            sx={{ minWidth: 120 }}
            error={!!formik.touched.section && !!formik.errors.section}
          >
            <InputLabel>--Section*--</InputLabel>
            <Select
              name="section"
              variant="filled"
              value={formik.values.section}
              onChange={(event) =>
                formik.setFieldValue("section", event.target.value)
              }
              onFocus={() => {
                if (!formik.values.class_id) {
                  toastAndNavigate(
                    dispatch,
                    true,
                    "info",
                    "Please Select a Class First"
                  );
                }
              }}
            >
              {!schoolSections?.listData?.length
                ? null
                : schoolSections.listData.map((section) => (
                  <MenuItem
                    value={section.section_id}
                    name={section.section_name}
                    key={section.section_id}
                  >
                    {section.section_name}
                  </MenuItem>
                ))}
            </Select>
            <FormHelperText>
              {formik.touched.section && formik.errors.section}
            </FormHelperText>
          </FormControl>
          <FormControl
            variant="filled"
            sx={{ minWidth: 120 }}
            error={!!formik.touched.student_id && !!formik.errors.student_id}
          >
            <InputLabel>--Student*--</InputLabel>
            <Select
              name="student_id"
              variant="filled"
              value={formik.values.student_id}
              onChange={(event) =>
                formik.setFieldValue("student_id", event.target.value)
              }
              onFocus={() => {
                if (!formik.values.class_id) {
                  toastAndNavigate(
                    dispatch,
                    true,
                    "info",
                    "Please Select a Class First"
                  );
                }
              }}
            >
              {!allStudents?.listData?.rows?.length
                ? null
                : allStudents.listData.rows.map((item) => (
                  <MenuItem
                    value={item.id}
                    name={`${item.firstname} ${item.lastname}`}
                    key={item.id}
                  >
                    {`${item.firstname.charAt(0).toUpperCase() +
                      item.firstname.slice(1)
                      } ${item.lastname.charAt(0).toUpperCase() +
                      item.lastname.slice(1)
                      }`}
                  </MenuItem>
                ))}
            </Select>
            <FormHelperText>
              {formik.touched.student_id && formik.errors.student_id}
            </FormHelperText>
          </FormControl>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            name="academic_year"
            label="Academic Year"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.academic_year}
            error={
              !!formik.touched.academic_year && !!formik.errors.academic_year
            }
            helperText={
              formik.touched.academic_year && formik.errors.academic_year
            }
          />
          <TextField
            fullWidth
            variant="filled"
            type="number"
            name="amount"
            label="Amount"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.amount}
            error={!!formik.touched.amount && !!formik.errors.amount}
            helperText={formik.touched.amount && formik.errors.amount}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="DD MMMM YYYY" //ex - 25 July 2023
              views={["day", "month", "year"]}
              label="Select Due Date"
              name="due_date"
              required
              value={formik.values.due_date}
              onChange={(newDue_Date) => {
                formik.setFieldValue("date", newDue_Date);
              }}
            />
          </LocalizationProvider>

          <FormControl
            variant="filled"
            sx={{ minWidth: 120 }}
            error={!!formik.touched.type && !!formik.errors.type}
          >
            <InputLabel>Type</InputLabel>
            <Select
              name="type"
              variant="filled"
              value={formik.values.type}
              onChange={formik.handleChange}
            >
              {Object.keys(config.type).map(item => (
                <MenuItem key={item} value={item}>
                  {config.type[item]}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {formik.touched.type && formik.errors.type}
            </FormHelperText>
          </FormControl>
          <FormControl
            variant="filled"
            sx={{ minWidth: 120 }}
            error={
              !!formik.touched.payment_method && !!formik.errors.payment_method
            }
          >
            <InputLabel>Payment Method</InputLabel>
            <Select
              variant="filled"
              name="payment_method"
              value={formik.values.payment_method}
              onChange={formik.handleChange}
            >
              {Object.keys(config.payment_method).map(item => (
                <MenuItem key={item} value={item}>
                  {config.payment_method[item]}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {formik.touched.payment_method && formik.errors.payment_method}
            </FormHelperText>
          </FormControl>
          <FormControl
            variant="filled"
            sx={{ minWidth: 120 }}
            error={
              !!formik.touched.payment_status && !!formik.errors.payment_status
            }
          >
            <InputLabel>Payment Status</InputLabel>
            <Select
              variant="filled"
              name="payment_status"
              autoComplete="new-payment_status"
              value={formik.values.payment_status}
              onChange={formik.handleChange}
            >
              {Object.keys(config.payment_status).map(item => (
                <MenuItem key={item} value={item}>
                  {config.payment_status[item]}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {formik.touched.payment_status && formik.errors.payment_status}
            </FormHelperText>
          </FormControl>
          

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="DD MMMM YYYY" //ex - 25 July 2023
              views={["day", "month", "year"]}
              label="Select Payment Date"
              name="payment_date"
              value={formik.values.payment_date}
              onChange={(newPayment_date) =>
                formik.setFieldValue("payment_date", newPayment_date)
              }
              slotProps={{
                textField: {
                  error:
                    !!formik.touched.payment_date &&
                    !!formik.errors.payment_date,
                  helperText:
                    formik.touched.payment_date && formik.errors.payment_date,
                },
              }}
            />
            <DatePicker
              format="DD MMMM YYYY" //ex - 25 July 2023
              views={["day", "month", "year"]}
              label="Due Date"
              name="due_date"
              value={formik.values.due_date}
              onChange={(newDue_Date) =>
                formik.setFieldValue("due_date", newDue_Date)
              }
              slotProps={{
                textField: {
                  error: !!formik.touched.due_date && !!formik.errors.due_date,
                  helperText: formik.touched.due_date && formik.errors.due_date,
                },
              }}
            />
          </LocalizationProvider>
          <TextField
            fullWidth
            variant="filled"
            type="number"
            label="Late Fees"
            name="late_fee"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.late_fee}
            error={!!formik.touched.late_fee && !!formik.errors.late_fee}
            helperText={formik.touched.late_fee && formik.errors.late_fee}
          />
        </Box>
        <Toast
          alerting={toastInfo.toastAlert}
          severity={toastInfo.toastSeverity}
          message={toastInfo.toastMessage}
        />
      </form>
    </Box>
  );
};

PaymentFormComponent.propTypes = {
  onChange: PropTypes.func,
  refId: PropTypes.shape({
    current: PropTypes.any,
  }),
  setDirty: PropTypes.func,
  reset: PropTypes.bool,
  setReset: PropTypes.func,
  updatedValues: PropTypes.object,
};

export default PaymentFormComponent;
