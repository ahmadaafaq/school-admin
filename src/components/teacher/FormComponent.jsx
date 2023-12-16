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
import AddressFormComponent from "../address/AddressFormComponent";
import Loader from "../common/Loader";
import Toast from "../common/Toast";
import TeacherFormComponent from "./TeacherFormComponent";

import { setMenuItem } from "../../redux/actions/NavigationAction";
import { tokens, themeSettings } from "../../theme";
import { Utility } from "../utility";

const FormComponent = () => {
    const [title, setTitle] = useState("Create");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        teacherData: { values: null, validated: false },
        addressData: { values: null, validated: false },
    });
    const [updatedValues, setUpdatedValues] = useState(null);
    const [dirty, setDirty] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [reset, setReset] = useState(false);

    const teacherFormRef = useRef();
    const addressFormRef = useRef();

    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const userParams = useParams();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { typography } = themeSettings(theme.palette.mode);

    const selected = useSelector(state => state.menuItems.selected);
    const toastInfo = useSelector(state => state.toastInfo);
    const { state } = useLocation();
    const { toastAndNavigate, getLocalStorage } = Utility();

    //after page refresh the id in router state becomes undefined, so getting teacher id from url params
    let id = state?.id || userParams?.id;

    useEffect(() => {
        const selectedMenu = getLocalStorage("menu");
        dispatch(setMenuItem(selectedMenu.selected));
    }, []);

    const updateTeacherAndAddress = useCallback(formData => {
        const dataFields = [
            { ...formData.teacherData.values },
            { ...formData.addressData.values }
        ];
        const paths = ["/update-teacher", "/update-address"];
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
                    toastAndNavigate(dispatch, true, "info", "Successfully Updated", navigateTo, `/${selected.toLowerCase()}/listing`);
                };
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                toastAndNavigate(dispatch, true, "error", err?.response?.data?.msg);
                throw err;
            });
    }, [formData]);

    const populateTeacherData = (id) => {
        setLoading(true);
        const paths = [`/get-by-pk/teacher/${id}`, `/get-address/teacher/${id}`];
        API.CommonAPI.multipleAPICall("GET", paths)
            .then(responses => {
                if (responses[0].data.data) {
                    responses[0].data.data.dob = dayjs(responses[0].data.data.dob);
                }
                const dataObj = {
                    teacherData: responses[0].data.data,
                    addressData: responses[1]?.data?.data
                };
                console.log(dataObj)
                setUpdatedValues(dataObj);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                toastAndNavigate(dispatch, true, "error", err?.response?.data?.msg);
                throw err;
            });
    };

    const createTeacher = () => {
        setLoading(true);
        API.TeacherAPI.createTeacher({ ...formData.teacherData.values })
            .then(({ data: teacher }) => {
                if (teacher?.status === 'Success') {
                    API.AddressAPI.createAddress({
                        ...formData.addressData.values,
                        parent_id: teacher.data.id,
                        parent: 'teacher',
                    })
                        .then(address => {
                            setLoading(false);
                            toastAndNavigate(dispatch, true, "success", "Successfully Created", navigateTo, `/${selected.toLowerCase()}/listing`);
                        })
                        .catch(err => {
                            setLoading(false);
                            toastAndNavigate(dispatch, true, err ? err : "An Error Occurred");
                            throw err;
                        });
                };
            })
            .catch(err => {
                setLoading(false);
                toastAndNavigate(dispatch, true, "error", err?.response?.data?.msg);
                throw err;
            });
    };

    //Create/Update/Populate teacher
    useEffect(() => {
        if (id && !submitted) {
            setTitle("Update");
            populateTeacherData(id);
        }
        if (formData.teacherData.validated && formData.addressData.validated) {
            formData.teacherData.values?.id ? updateTeacherAndAddress(formData) : createTeacher();
        } else {
            setSubmitted(false);
        }
    }, [id, submitted]);

    const handleSubmit = async () => {
        await teacherFormRef.current.Submit();
        await addressFormRef.current.Submit();
        setSubmitted(true);
    };

    const handleFormChange = (data, form) => {
        form === 'teacher' ? setFormData({ ...formData, teacherData: data }) :
            setFormData({ ...formData, addressData: data });
    };

    const convertToRoman = (word) => {
        const wordMap = {
            first: 'I',
            second: 'II',
            third: 'III',
            fourth: 'IV',
            fifth: 'V',
            sixth: 'VI',
            seventh: 'VII',
            eight: 'VIII',
            nineth: 'IX',
            tenth: 'X',
            eleventh: 'XI',
            twelth: 'XII'
        };
        return wordMap[word] || 'Invalid word';
    };

    return (
        <Box m="10px">
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
            <TeacherFormComponent
                onChange={(data) => {
                    handleFormChange(data, 'teacher');
                }}
                refId={teacherFormRef}
                setDirty={setDirty}
                reset={reset}
                setReset={setReset}
                userId={id}
                updatedValues={updatedValues?.teacherData}
            />
            <AddressFormComponent
                onChange={(data) => {
                    handleFormChange(data, 'address');
                }}
                refId={addressFormRef}
                update={id ? true : false}
                setDirty={setDirty}
                reset={reset}
                setReset={setReset}
                updatedValues={updatedValues?.addressData}
            />

            <Box display="flex" justifyContent="end" m="20px">
                {   //hide reset button on teacher update
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
                    onClick={() => navigateTo(`/${selected.toLowerCase()}/listing`)}>
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
