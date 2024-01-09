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
import dayjs from "dayjs";

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
        marksheetData: { values: null, validated: false },
    });
    const [updatedValues, setUpdatedValues] = useState(null);
    const [dirty, setDirty] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [reset, setReset] = useState(false);

    const marksheetFormRef = useRef();

    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const userParams = useParams();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { typography } = themeSettings(theme.palette.mode);

    const selected = useSelector((state) => state.menuItems.selected);
    const toastInfo = useSelector((state) => state.toastInfo);
    const { state } = useLocation();
    const { toastAndNavigate, getLocalStorage } = Utility();

    let id = state?.id || userParams?.id;

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

    const populateMarksheetData = (id) => {
        setLoading(true);
        // API.MarksheetAPI.getMarksheetById(id)
        //     .then((response) => {
        //         if (response.data.data) {
        //             response.data.data.dob = dayjs(response.data.data.dob);
        //             response.data.data.admission_date = dayjs(response.data.data.admission_date);
        //         }
        //         const dataObj = {
        //             marksheetData: response.data.data,
        //         };
        //         setUpdatedValues(dataObj);
        //         setLoading(false);
        //     })
        //     .catch((err) => {
        //         setLoading(false);
        //         toastAndNavigate(dispatch, true, "error", err?.response?.data?.msg);
        //         throw err;
        //     });
    };

    const createMarksheet = () => {
        setLoading(true);
        API.MarksheetAPI.createMarksheet({ ...formData.marksheetData.values })
            .then(({ data: marksheet }) => {
                if (marksheet?.status === "Success") {
                    setLoading(false);
                    toastAndNavigate(
                        dispatch,
                        true,
                        "success",
                        "Successfully Created",
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
    };

    //Create/Update/Populate marksheet
    useEffect(() => {
        if (id && !submitted) {
            setTitle("Update");
            populateMarksheetData(id);
        }
        if (formData.marksheetData.validated) {
            formData.marksheetData.values?.id ? updateMarksheet(formData) : createMarksheet();
        } else {
            setSubmitted(false);
        }
    }, [id, submitted]);

    const handleSubmit = async () => {
        await marksheetFormRef.current.Submit();
        setSubmitted(true);
    };

    const handleFormChange = (data, form) => {
        if (form === "marksheet") {
            setFormData({ ...formData, marksheetData: data });
            console.log("submitted data",data)
        }
    };

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

