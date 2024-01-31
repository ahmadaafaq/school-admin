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
import ImagePicker from "../image/ImagePicker";
import Loader from "../common/Loader";
import Toast from "../common/Toast";
import EmployeeFormComponent from "./EmployeeFormComponent";

import { setMenuItem } from "../../redux/actions/NavigationAction";
// import { setSubjects } from "../../redux/actions/SubjectAction";
import { tokens, themeSettings } from "../../theme";
import { useCommon } from "../hooks/common";
import { Utility } from "../utility";

const FormComponent = () => {
    const [title, setTitle] = useState("Create");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        employeeData: { values: null, validated: false },
        addressData: { values: null, validated: false },
        imageData: { values: null, validated: true }
    });
    const [updatedValues, setUpdatedValues] = useState(null);
    const [deletedImage, setDeletedImage] = useState([]);
    const [preview, setPreview] = useState([]);
    const [dirty, setDirty] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [reset, setReset] = useState(false);

    //  const subjectsInRedux = useSelector(state => state.allSubjects);
    const selected = useSelector(state => state.menuItems.selected);
    const toastInfo = useSelector(state => state.toastInfo);

    const employeeFormRef = useRef();
    const addressFormRef = useRef();
    const imageFormRef = useRef();

    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const userParams = useParams();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { typography } = themeSettings(theme.palette.mode);
    const { state } = useLocation();
    const { getPaginatedData } = useCommon();
    const { toastAndNavigate, getLocalStorage, getIdsFromObjects, findMultipleById } = Utility();

    //after page refresh the id in router state becomes undefined, so getting employee id from url params
    let id = state?.id || userParams?.id;

    useEffect(() => {
        const selectedMenu = getLocalStorage("menu");
        dispatch(setMenuItem(selectedMenu.selected));
    }, []);

    const updateEmployeeAndAddress = useCallback(formData => {
        console.log("formdataABCD", formData)
        const dataFields = [
            { ...formData.employeeData.values },
            { ...formData.addressData.values }
        ];
        const paths = ["/update-employee", "/update-address"];
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
                    toastAndNavigate(dispatch, true, "info", "Successfully Updated", navigateTo, `/employee/listing/${getLocalStorage('class')}`);
                };
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                toastAndNavigate(dispatch, true, "error", err?.response?.data?.msg);
                throw err;
            });
    }, [formData]);

    const populateEmployeeData = (id) => {
        setLoading(true);
        const paths = [`/get-by-pk/employee/${id}`, `/get-address/employee/${id}`];
        API.CommonAPI.multipleAPICall("GET", paths)
            .then(responses => {
                if (responses[0].data.data) {
                    // responses[0].data.data.subjects = findMultipleById(responses[0].data.data.subjects, subjectsInRedux?.listData?.rows)
                    responses[0].data.data.dob = dayjs(responses[0].data.data.dob);
                    responses[0].data.data.admission_date = dayjs(responses[0].data.data.admission_date);
                }
                const dataObj = {
                    employeeData: responses[0].data.data,
                    addressData: responses[1]?.data?.data
                };
                setUpdatedValues(dataObj);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                toastAndNavigate(dispatch, true, "error", err?.response?.data?.msg);
                throw err;
            });
    };

    const createEmployee = () => {
        setLoading(true);
        API.EmployeeAPI.createEmployee({ ...formData.employeeData.values })
            .then(({ data: employee }) => {
                if (employee?.status === 'Success') {
                    API.AddressAPI.createAddress({
                        ...formData.addressData.values,
                        parent_id: employee.data.id,
                        parent: 'employee',
                    })
                        .then(address => {
                            setLoading(false);
                            toastAndNavigate(dispatch, true, "success", "Successfully Created", navigateTo, `/employee/listing`);
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

    // useEffect(() => {
    //     if (!subjectsInRedux?.listData?.rows?.length) {
    //         getPaginatedData(0, 50, setSubjects, API.SubjectAPI);
    //     }
    // }, [subjectsInRedux?.listData?.rows?.length]);

    //Create/Update/Populate employee
    useEffect(() => {
        if (id && !submitted) {
            setTitle("Update");
            populateEmployeeData(id);
        }
        if (formData.employeeData.validated && formData.addressData.validated) {
            formData.employeeData.values?.id ? updateEmployeeAndAddress(formData) : createEmployee();
        } else {
            setSubmitted(false);
        }
    }, [id, submitted]);

    const handleSubmit = async () => {
        await employeeFormRef.current.Submit();
        await addressFormRef.current.Submit();
        // await imageFormRef.current.Submit();
        setSubmitted(true);
    };

    const handleFormChange = (data, form) => {
        if (form === 'employee') {
            setFormData({ ...formData, employeeData: data });
        } else if (form === 'address') {
            setFormData({ ...formData, addressData: data });
        }
        // } else if (form === 'parent') {
        //     setFormData({ ...formData, imageData: data });
        // }
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
            <EmployeeFormComponent
                onChange={(data) => {
                    handleFormChange(data, 'employee');
                }}
                refId={employeeFormRef}
                setDirty={setDirty}
                reset={reset}
                setReset={setReset}
                userId={id}
                updatedValues={updatedValues?.employeeData}
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
            {/* <ImagePicker
                key="image"
                onChange={data => handleFormChange(data, 'parent')}
                refId={imageFormRef}
                reset={reset}
                setReset={setReset}
                setDirty={setDirty}
                preview={preview}
                setPreview={setPreview}
                // updatedValues={updatedValues?.imageData.filter(img => img.type === "normal")}
                deletedImage={deletedImage}
                setDeletedImage={setDeletedImage}
                imageType="Guardian"
            // azurePath={`${ENV.VITE_SAS_URL}/${ENV.VITE_PARENT_SALON}`}
            // ENV={ENV}
            /> */}

            <Box display="flex" justifyContent="end" m="20px">
                {   //hide reset button on employee update
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
                    onClick={() => navigateTo(`/employee/listing/${getLocalStorage('class') || ''}`)}>
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
