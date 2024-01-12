/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Box, Divider, InputLabel, MenuItem, FormControl, Typography, Autocomplete } from "@mui/material";
import { Button, Dialog, Select, TextField, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { Formik } from "formik";

import API from "../../apis";
import Loader from "../common/Loader";
import Toast from "../common/Toast";

import { setMenuItem } from "../../redux/actions/NavigationAction";
import { tokens, themeSettings } from "../../theme";
import { Utility } from "../utility";
import classValidation from "./Validation";

const initialValues = {
    name: "",
    status: "inactive",
    subjects: [],
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
    const [subjects, setSubjects] = useState([]);       //for subject table in class component

    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const selected = useSelector(state => state.menuItems.selected);
    const toastInfo = useSelector(state => state.toastInfo);

    const { state } = useLocation();
    const { typography } = themeSettings(theme.palette.mode);
    const { toastAndNavigate, getLocalStorage ,getIdsFromObjects } = Utility();

    let id = state?.id;

    useEffect(() => {
        const selectedMenu = getLocalStorage("menu");
        dispatch(setMenuItem(selectedMenu.selected));
        if (id && subjects) {
            setTitle("Update");
            populateData(id);
        } else {
            setTitle("Create");
            setInitialState(initialValues);
        }
    }, [id, subjects]);

    const updateClass = useCallback(values => {
        const dataFields = [
            {
                ...values,
                subjects: getSelectedSubjects(values.subjects),
            },
        ];
        const paths = ["/update-class"];
        setLoading(true);

        API.CommonAPI.multipleAPICall("PATCH", paths, dataFields)
            .then(responses => {
                let status = true;
                responses.forEach(response => {
                    if (response.data.status !== "Success") {
                        status = false;
                    }
                });
                if (status) {
                    setLoading(false);
                    toastAndNavigate(dispatch, true, "info", "Successfully Updated", navigateTo, `/class/listing`, location.reload());
                } else {
                    setLoading(false);
                    toastAndNavigate(dispatch, true, "error", "An Error Occurred. Please Try Again", navigateTo, location.reload());
                }
            })
            .catch(err => {
                setLoading(false);
                toastAndNavigate(dispatch, true, "error", err?.response?.data?.msg);
                throw err;
            });
    }, []);

    const getSelectedSubjectsByName = (dataObj) => {
        const objId = dataObj?.split(",");
        if (objId) {
            return subjects.filter(subjects => objId.includes(subjects.id.toString()));
        }
    };

    const populateData = (id) => {
        setLoading(true);
        const path = [`/get-by-pk/class/${id}`];

        API.CommonAPI.multipleAPICall("GET", path)
            .then(response => {
                if (response[0].data.status === "Success") {
                    response[0].data.data.subjects = getSelectedSubjectsByName(response[0].data.data?.subjects);
                    setInitialState(response[0].data.data);
                    setLoading(false);
                }
                else {
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


    const createClass = (values) => {
        console.log(values.subjects)
        setLoading(true);
        values = {
            ...values,
            subjects: getIdsFromObjects(values?.subjects),
        }
        API.ClassAPI.createClass(values)
            .then(({ data: classs }) => {
                if (classs?.status === 'Success') {
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


    //get all subjects from subject table stored in db before populating data
    useEffect(() => {
        const getsubjects = () => {
            API.SubjectAPI.getAll(false, 0, 30)
                .then(subjects => {
                    if (subjects.status === 'Success') {
                        setSubjects(subjects.data.rows);
                    } else {
                        console.log("Error, Please Try Again");
                    }
                })
                .catch(err => {
                    throw err;
                });
        };
        getsubjects();
    }, []);

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
                    validationSchema={classValidation}
                    onSubmit={values => {
                        values.id ? updateClass(values) : createClass(values);
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
                        resetForm,
                        setFieldValue
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

                                <Autocomplete
                                    multiple
                                    options={subjects}
                                    getOptionLabel={option => option.name}
                                    disableCloseOnSelect
                                    value={values.subjects}
                                    onChange={(event, value) => setFieldValue("subjects", value)}
                                    sx={{ gridColumn: "span 2" }}
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            variant="filled"
                                            type="text"
                                            name="subjects"
                                            label="subjects"
                                            error={!!touched.subjects && !!errors.subjects}
                                            helperText={touched.subjects && errors.subjects}
                                        />
                                    )}
                                />
                            </Box>
                            <Divider />
                            <Box display="flex" justifyContent="end" p="20px">
                                {   //hide reset button on class update
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
