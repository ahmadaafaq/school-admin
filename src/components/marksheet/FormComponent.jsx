/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import React, { useCallback, useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Box, Button, Typography, useTheme } from "@mui/material";

import API from "../../apis";
import Loader from "../common/Loader";
import Toast from "../common/Toast";
import MarksheetFormComponent from "./MarksheetFormComponent";

import { setMenuItem } from "../../redux/actions/NavigationAction";
import { setClasses } from "../../redux/actions/ClassAction";
import { tokens, themeSettings } from "../../theme";
import { Utility } from "../utility";// ... (imports)

const FormComponent = () => {
    const [title, setTitle] = useState("Create");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        marksheetData: { values: null, validated: false }
    });
    const [updatedValues, setUpdatedValues] = useState(null);
    const [dirty, setDirty] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [reset, setReset] = useState(false);

    const { marksheetClass, marksheetSection } = useSelector(state => state.allMarksheets);
    const selected = useSelector((state) => state.menuItems.selected);
    const toastInfo = useSelector((state) => state.toastInfo);
    const marksheetFormRef = useRef();

    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const userParams = useParams();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { typography } = themeSettings(theme.palette.mode);
    const { state } = useLocation();
    const { toastAndNavigate, getLocalStorage } = Utility();

    let id = state?.id || userParams?.id;
    let student_id = state?.student_id;

    useEffect(() => {
        const selectedMenu = getLocalStorage("menu");
        dispatch(setMenuItem(selectedMenu.selected));
    }, []);

    const updateMarksheet = useCallback((formData) => {
        setLoading(true);
        API.MarksheetAPI.updateMarksheet({ ...formData.marksheetData.values })
            .then(({ data: marksheet }) => {
                if (marksheet?.status === "Success") {
                    setLoading(false);
                    toastAndNavigate(
                        dispatch,
                        true,
                        "info",
                        "Successfully Updated",
                        navigateTo,
                        `/${selected.toLowerCase()}/listing`
                    );
                }
            })
            .catch((err) => {
                setLoading(false);
                toastAndNavigate(dispatch, true, "error", err?.response?.data?.msg);
                throw err;
            });
    }, []);

    const populateMarksheetData = (id, student_id) => {
        setLoading(true);
        const path = [`/get-marksheet/?page=0&size=15&student=${student_id}`];
        API.CommonAPI.multipleAPICall("GET", path)
            .then(response => {
                console.log("response>>>>", response);
                const dataObj = {
                    marksheetData: response[0].data.data
                };
                setUpdatedValues(dataObj);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                toastAndNavigate(dispatch, true, "error", err?.response?.data?.msg);
                throw err;
            });
    };

    const createMarksheet = () => {
        let promises = [];
        setLoading(true);
        console.log("submitted data", formData);

        let payload = {
            student_id: formData.marksheetData.values.student,
            class_id: marksheetClass?.class_id,
            section_id: marksheetSection?.id,
            term: formData.marksheetData.values.term
        };
        console.log('payload', payload)
        promises = formData.marksheetData.values.subjects.map((subjectId, index) => {
            payload = {
                ...payload,
                subject_id: subjectId,
                marks_obtained: formData.marksheetData.values[`marks_obtained_${index}`],
                total_marks: formData.marksheetData.values[`total_marks_${index}`],
                grade: formData.marksheetData.values[`grade_${index}`],
                remark: formData.marksheetData.values[`remark_${index}`] ? formData.marksheetData.values[`remark_${index}`] : '',
                result: formData.marksheetData.values.result
            }
            console.log('loop', subjectId, payload)
            API.MarksheetAPI.createMarksheet(payload);
        });


        return Promise.all(promises)
            .then((responses) => {
                // Check if all responses are successful
                const isSuccess = responses.every(response => response.data.status === "Success");

                if (isSuccess) {
                    setLoading(false);
                    toastAndNavigate(dispatch, true, "success", "Successfully Created", navigateTo, `/${selected.toLowerCase()}/listing`);
                } else {
                    setLoading(false);
                    toastAndNavigate(dispatch, true, "error", "Failed to create marksheet for one or more subjects");
                }
            })
            .catch((err) => {
                setLoading(false);
                toastAndNavigate(dispatch, true, "error", err?.response?.data?.msg);
                throw err;
            });
    };

    //Create/Update/Populate marksheet
    useEffect(() => {
        if (id && !submitted) {
            setTitle("Update");
            populateMarksheetData(id, student_id);
        }
        if (formData.marksheetData.validated) {
            formData.marksheetData.values?.id ? updateMarksheet(formData) : createMarksheet();
        } else {
            setSubmitted(false);
        }
    }, [id, submitted, student_id]);

    const handleSubmit = async () => {
        await marksheetFormRef.current.Submit();
        setSubmitted(true);
    };

    const handleFormChange = (data, form) => {
        if (form === "marksheet") {
            setFormData({ ...formData, marksheetData: data });
        }
    };

    console.log('updatedValues', updatedValues)

    return (
        <Box m="10px" >
            <Typography
                fontFamily={typography.fontFamily}
                fontSize={typography.h2.fontSize}
                color={colors.grey[100]}
                fontWeight="bold"
                display="inline-block"
                marginLeft="20px"
            >
                {`${title} ${selected}`}
            </Typography>
            <MarksheetFormComponent
                onChange={(data) => {
                    handleFormChange(data, "marksheet");
                }}
                refId={marksheetFormRef}
                setDirty={setDirty}
                reset={reset}
                setReset={setReset}
                userId={id}
                student_id={student_id}
                updatedValues={updatedValues?.marksheetData}
            />
            <Box display="flex" justifyContent="end" m="20px 20px 70px 0" >
                {title === "Update" ? null : (
                    <Button
                        type="reset"
                        color="warning"
                        variant="contained"
                        sx={{ mr: 3 }}
                        disabled={!dirty || submitted}
                        onClick={() => {
                            if (window.confirm("Do You Really Want To Reset?")) {
                                setReset(true);
                            }
                        }}
                    >
                        Reset
                    </Button>
                )}
                <Button
                    color="error"
                    variant="contained"
                    sx={{ mr: 3 }}
                    onClick={() => navigateTo(`/${selected.toLowerCase()}/listing`)}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    onClick={() => handleSubmit()}
                    disabled={!dirty}
                    color={title === "Update" ? "info" : "success"}
                    variant="contained"
                >
                    Submit
                </Button>
                <Toast
                    alerting={toastInfo.toastAlert}
                    severity={toastInfo.toastSeverity}
                    message={toastInfo.toastMessage}
                />
            </Box>
            {loading === true ? <Loader /> : null}
        </Box>
    );
};

export default FormComponent;

