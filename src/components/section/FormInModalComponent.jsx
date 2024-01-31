/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Formik } from "formik";
import { Box, Divider, InputLabel, MenuItem, FormControl, Typography } from "@mui/material";
import { Button, Dialog, Select, TextField, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';

import API from "../../apis";
import Loader from "../common/Loader";
import Toast from "../common/Toast";

import { setMenuItem } from "../../redux/actions/NavigationAction";
import { tokens, themeSettings } from "../../theme";
import { Utility } from "../utility";
import sectionValidation from "./Validation";

const initialValues = {
    name: "",
    status: "inactive"
};

const FormComponent = ({ openDialog, setOpenDialog }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isMobile = useMediaQuery("(max-width:480px)");
    const isTab = useMediaQuery("(max-width:920px)");

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    //form component starts
    const [title, setTitle] = useState("Create");
    const [loading, setLoading] = useState(false);
    const [initialState, setInitialState] = useState(initialValues);

    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const selected = useSelector(state => state.menuItems.selected);
    const toastInfo = useSelector(state => state.toastInfo);

    const { state } = useLocation();
    const { typography } = themeSettings(theme.palette.mode);
    const { toastAndNavigate, getLocalStorage } = Utility();

    let id = state?.id;

    useEffect(() => {
        const selectedMenu = getLocalStorage("menu");
        dispatch(setMenuItem(selectedMenu.selected));
        if (id) {
            setTitle("Update");
            populateData(id);
        } else {
            setTitle("Create");
            setInitialState(initialValues);
        }
    }, [id]);

    const updateSection = (values) => {
        setLoading(true);
        API.SectionAPI.updateSection(values)
            .then(({ data: section }) => {
                if (section.status === 'Success') {
                    setLoading(false);
                    toastAndNavigate(dispatch, true, "info", "Successfully Updated");
                    setTimeout(() => {
                        handleDialogClose();
                        location.href = "/section/listing";     //same as location.reload()
                    }, 2000);
                } else {          //without settimeout, the page is reloaded immediately, which
                    setLoading(false);      //we do when there is error in updating, not when success
                    toastAndNavigate(dispatch, true, "error", "An Error Occurred, Please Try Again", navigateTo, location.reload());
                }
            })
            .catch(err => {
                setLoading(false);
                toastAndNavigate(dispatch, true, "error", err?.response?.data?.msg, navigateTo, location.reload());
                throw err;
            });
    };

    const populateData = (id) => {
        setLoading(true);
        const path = [`/get-by-pk/section/${id}`];
        API.CommonAPI.multipleAPICall("GET", path)
            .then(response => {
                if (response[0].data.status === "Success") {
                    setInitialState(response[0].data.data);
                    setLoading(false);
                } else {
                    setLoading(false);
                    toastAndNavigate(dispatch, true, "error", "An Error Occurred, Please Try Again", navigateTo, location.reload());
                }
            })
            .catch(err => {
                setLoading(false);
                toastAndNavigate(dispatch, true, "error", err?.response?.data?.msg, navigateTo, location.reload());
                throw err;
            });
    };

    const createSection = (values) => {
        setLoading(true);
        API.SectionAPI.createSection(values)
            .then(({ data: section }) => {
                if (section.status === 'Success') {
                    setLoading(false);
                    toastAndNavigate(dispatch, true, "success", "Successfully Created");
                    setTimeout(() => {
                        handleDialogClose();
                        navigateTo(0);      //same as location.reload()
                    }, 2000);
                } else {
                    setLoading(false);
                    toastAndNavigate(dispatch, true, "error", "An Error Occurred, Please Try Again", navigateTo, location.reload());
                }
            })
            .catch(err => {
                setLoading(false);
                toastAndNavigate(dispatch, true, err ? err.response?.data?.msg : "An Error Occurred", navigateTo, location.reload());
                throw err;
            });
    };


    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={openDialog}
                onClose={handleDialogClose}
                aria-labelledby="responsive-dialog-title"
                sx={{
                    top: isMobile ? "33%" : isTab ? "25%" : "20%", height: isMobile ? "49%" : isTab ? "39%" : "60%",
                    "& .MuiPaper-root": { width: "100%" }
                }}
            >
                <Typography
                    fontFamily={typography.fontFamily}
                    fontSize={typography.h2.fontSize}
                    color={colors.grey[100]}
                    fontWeight="600"
                    display="inline-block"
                    textAlign="center"
                    marginTop="10px"
                >
                    {`${title} ${selected}`}
                </Typography>
                <Formik
                    initialValues={initialState}
                    enableReinitialize          //to reinitialize the form when it gets stored values from backend
                    validationSchema={sectionValidation}
                    onSubmit={values => {
                        values.id ? updateSection(values) : createSection(values);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        dirty,
                        isSubmitting,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        resetForm
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Box display="grid" gap="30px" gridTemplateColumns="repeat(2, minmax(0, 1fr))" padding="20px">
                                <TextField
                                    variant="filled"
                                    type="text"
                                    name="name"
                                    label="Name*"
                                    autoComplete="new-name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.name}
                                    error={!!touched.name && !!errors.name}
                                    helperText={touched.name && errors.name}
                                />
                                <FormControl variant="filled" sx={{ minWidth: 120 }}
                                    error={!!touched.status && !!errors.status}
                                >
                                    <InputLabel id="statusField">Status</InputLabel>
                                    <Select
                                        variant="filled"
                                        labelId="statusField"
                                        label="Status"
                                        name="status"
                                        autoComplete="new-status"
                                        value={values.status}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="active">Active</MenuItem>
                                        <MenuItem value="inactive">Inactive</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Divider />
                            <Box display="flex" justifyContent="end" p="20px">
                                {   //hide reset button on section update
                                    title === "Update" ? null :
                                        <Button type="reset" color="warning" variant="contained" sx={{ mr: 3 }}
                                            disabled={!dirty || isSubmitting}
                                            onClick={() => {
                                                if (window.confirm("Do You Really Want To Reset?")) {
                                                    resetForm();
                                                }
                                            }}
                                        >
                                            Reset
                                        </Button>
                                }
                                <Button color="error" variant="contained" sx={{ mr: 3 }}
                                    onClick={() => handleDialogClose()}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={!dirty || isSubmitting}
                                    color={title === "Update" ? "info" : "success"} variant="contained"
                                >
                                    Submit
                                </Button>
                                <Toast alerting={toastInfo.toastAlert}
                                    severity={toastInfo.toastSeverity}
                                    message={toastInfo.toastMessage}
                                />
                            </Box>
                        </form>
                    )}
                </Formik>
                {loading === true ? <Loader /> : null}
            </Dialog>
        </div>
    );
}

export default FormComponent;
