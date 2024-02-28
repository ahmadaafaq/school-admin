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
import TimeTableFormComponent from "./TimeTableFormComponent";

import { setAllSubjects } from "../../redux/actions/SubjectAction";
import { setMenuItem } from "../../redux/actions/NavigationAction";
import { tokens, themeSettings } from "../../theme";
import { useCommon } from "../hooks/common";
import { Utility } from "../utility";

import formBg from "../assets/formBg.png";

const FormComponent = () => {
    const [title, setTitle] = useState("Create");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        timeTableData: { values: null, validated: false }
    });
    const [updatedValues, setUpdatedValues] = useState(null);
    const [dirty, setDirty] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [reset, setReset] = useState(false);
    const [classData, setClassData] = useState([]);

    const formSubjectsInRedux = useSelector(state => state.allSubjects);
    const selected = useSelector(state => state.menuItems.selected);
    const toastInfo = useSelector(state => state.toastInfo);

    const timeTableFormRef = useRef();


    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const userParams = useParams();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { typography } = themeSettings(theme.palette.mode);
    const { state } = useLocation();
    const { getPaginatedData } = useCommon();
    const { getLocalStorage, getIdsFromObject, findMultipleById, formatImageName, fetchAndSetAll,
        isObjEmpty, toastAndNavigate } = Utility();

    //after page refresh the id in router state becomes undefined, so getting TimeTable id from url params
    let id = state?.id || userParams?.id;

    useEffect(() => {
        const selectedMenu = getLocalStorage("menu");
        dispatch(setMenuItem(selectedMenu.selected));
    }, []);

    const updateTimeTable = useCallback(formData => {
        const dataFields = [
            { ...formData.timeTableData.values },
        ];
        const paths = ["/update-time-table"];
        setLoading(true);

        API.CommonAPI.multipleAPICall("PATCH", paths, dataFields)
            .then(responses => {
                let status = true;
                responses.forEach(response => {
                    if (response.data.status !== "Success") {
                        status = false;
                    };
                });
                if (status) {
                    setLoading(false);
                    toastAndNavigate(dispatch, true, "info", "Successfully Updated", navigateTo, `/time-table/listing`);
                };
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                toastAndNavigate(dispatch, true, "error", err?.response?.data?.msg);
                throw err;
            });
    }, [formData]);

    const populateTimeTableData = (id) => {
        setLoading(true);
        const paths = [`/get-by-pk/timetable/${id}`];
        API.CommonAPI.multipleAPICall("GET", paths)
            .then(response => {
                // if (response[0]?.data?.data) {
                    
                // }
                const dataObj = {
                    timeTableData: response[0].data.data,
                };
                setUpdatedValues(dataObj);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                toastAndNavigate(dispatch, true, "error", err?.response?.data?.msg);
            });
    };


    const createTimeTable = () => {
        setLoading(true);
        API.TimeTableAPI.createTimeTable({ ...formData.timeTableData.values })
            .then(({ data: timeTable }) => {
                if (timeTable?.status === 'Success') {
                    setLoading(false);
                    toastAndNavigate(dispatch, true, "success", "Successfully Created", navigateTo, `/time-table/listing`);
                } else {
                    setLoading(false);
                    toastAndNavigate(dispatch, true, err ? err : "An Error Occurred");
                }
            })
            .catch(err => {
                setLoading(false);
                toastAndNavigate(dispatch, true, "error", err?.response?.data?.msg);
            });
    };

    useEffect(() => {
        if (!formSubjectsInRedux?.listData?.length) {
            fetchAndSetAll(dispatch, setAllSubjects, API.SubjectAPI);
        }
    }, [formSubjectsInRedux?.listData?.length]);

    //Create/Update/Populate TimeTable
    useEffect(() => {
        if (id && !submitted) {
            setTitle("Update");
            populateTimeTableData(id);
        }
        if (formData.timeTableData.validated) {
            formData.timeTableData.values?.id ? updateTimeTable(formData) : createTimeTable();
        } else {
            setSubmitted(false);
        }
    }, [id, submitted]);

    const handleSubmit = async () => {
        await timeTableFormRef.current.Submit();
        setSubmitted(true);
    };

    const handleFormChange = (data, form) => {
        form == 'timeTable' ? setFormData({ ...formData, timeTableData: data }) : '';
    }

    return (
        <Box ml="10px"
            sx={{
                backgroundImage: theme.palette.mode == "light" ? `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url(${formBg})`
                    : `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${formBg})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "start",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
                height: "100%"
            }}
        >
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
            <TimeTableFormComponent
                onChange={(data) => {
                    handleFormChange(data, 'timeTable');
                }}
                refId={timeTableFormRef}
                setDirty={setDirty}
                reset={reset}
                setReset={setReset}
                classData={classData}
                setClassData={setClassData}
                allSubjects={formSubjectsInRedux?.listData}
                userId={id}
                updatedValues={updatedValues?.timeTableData}
            />

            <Box display="flex" justifyContent="end" m="20px">
                {   //hide reset button on TimeTable update
                    title === "Update" ? null :
                        <Button type="reset" color="warning" variant="contained" sx={{ mr: 3 }}
                            disabled={!dirty || submitted}
                            onClick={() => {
                                if (window.confirm("Do You Really Want To Reset?")) {
                                    setReset(true);
                                };
                            }}
                        >
                            Reset
                        </Button>
                }
                <Button color="error" variant="contained" sx={{ mr: 3 }}
                    onClick={() => navigateTo(`/time-table/listing/${getLocalStorage('class') || ''}`)}>
                    Cancel
                </Button>
                <Button type="submit" onClick={() => handleSubmit()} disabled={!dirty}
                    color={title === "Update" ? "info" : "success"} variant="contained"
                >
                    Submit
                </Button>
                <Toast alerting={toastInfo.toastAlert}
                    severity={toastInfo.toastSeverity}
                    message={toastInfo.toastMessage}
                />
            </Box>
            {loading === true ? <Loader /> : null}
        </Box>
    );
};

export default FormComponent;
