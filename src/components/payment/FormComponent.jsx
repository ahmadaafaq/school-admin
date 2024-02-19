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
import PaymentFormComponent from "./PaymentFormComponent";

import { setMenuItem } from "../../redux/actions/NavigationAction";
// import { setSubjects } from "../../redux/actions/SubjectAction";
import { tokens, themeSettings } from "../../theme";
import { useCommon } from "../hooks/common";
import { Utility } from "../utility";

import formBg from "../assets/formBg.png";

const FormComponent = () => {
    const [title, setTitle] = useState("Create");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        paymentData: { values: null, validated: false },
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

    const paymentFormRef = useRef();
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

    //after page refresh the id in router state becomes undefined, so getting Payment id from url params
    let id = state?.id || userParams?.id;

    useEffect(() => {
        const selectedMenu = getLocalStorage("menu");
        dispatch(setMenuItem(selectedMenu.selected));
    }, []);

    const updatePaymentAndAddress = useCallback(formData => {
        const dataFields = [
            { ...formData.paymentData.values },
            { ...formData.addressData.values }
        ];
        const paths = ["/update-payment", "/update-address"];
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
                    toastAndNavigate(dispatch, true, "info", "Successfully Updated", navigateTo, `/payment/listing/${getLocalStorage('class')}`);
                };
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                toastAndNavigate(dispatch, true, "error", err?.response?.data?.msg);
                throw err;
            });
    }, [formData]);

    const populatePaymentData = (id) => {
        setLoading(true);
        const paths = [`/get-by-pk/payment/${id}`, `/get-address/payment/${id}`];
        API.CommonAPI.multipleAPICall("GET", paths)
            .then(responses => {
                if (responses[0].data.data) {
                    // responses[0].data.data.subjects = findMultipleById(responses[0].data.data.subjects, subjectsInRedux?.listData?.rows)
                    responses[0].data.data.dob = dayjs(responses[0].data.data.dob);
                    responses[0].data.data.admission_date = dayjs(responses[0].data.data.admission_date);
                }
                const dataObj = {
                    paymentData: responses[0].data.data,
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

    const createPayment = () => {
        setLoading(true);
        API.PaymentAPI.createPayment({ ...formData.paymentData.values })
            .then(({ data: payment }) => {
                if (payment?.status === 'Success') {
                    API.AddressAPI.createAddress({
                        ...formData.addressData.values,
                        parent_id: payment.data.id,
                        parent: 'payment',
                    })
                        .then(address => {
                            setLoading(false);
                            toastAndNavigate(dispatch, true, "success", "Successfully Created", navigateTo, `/payment/listing`);
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

    //Create/Update/Populate Payment
    useEffect(() => {
        if (id && !submitted) {
            setTitle("Update");
            populatePaymentData(id);
        }
        if (formData.paymentData.validated && formData.addressData.validated) {
            formData.paymentData.values?.id ? updatePaymentAndAddress(formData) : createPayment();
        } else {
            setSubmitted(false);
        }
    }, [id, submitted]);

    const handleSubmit = async () => {
        await paymentFormRef.current.Submit();
        await addressFormRef.current.Submit();
        // await imageFormRef.current.Submit();
        setSubmitted(true);
    };

    const handleFormChange = (data, form) => {
        if (form === 'payment') {
            setFormData({ ...formData, paymentData: data });
        } else if (form === 'address') {
            setFormData({ ...formData, addressData: data });
        }
        // } else if (form === 'parent') {
        //     setFormData({ ...formData, imageData: data });
        // }
    };

    return (
        <Box ml="10px"
            sx={{
                backgroundImage: theme.palette.mode == "light" ? `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url(${formBg})`
                    : `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${formBg})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "start",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
                height:"100%"
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
            <PaymentFormComponent
                onChange={(data) => {
                    handleFormChange(data, 'payment');
                }}
                refId={paymentFormRef}
                setDirty={setDirty}
                reset={reset}
                setReset={setReset}
                userId={id}
                updatedValues={updatedValues?.paymentData}
            />
            {/* <AddressFormComponent
                onChange={(data) => {
                    handleFormChange(data, 'address');
                }}
                refId={addressFormRef}
                update={id ? true : false}
                setDirty={setDirty}
                reset={reset}
                setReset={setReset}
                updatedValues={updatedValues?.addressData}
            /> */}
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
                {   //hide reset button on Payment update
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
                    onClick={() => navigateTo(`/payment/listing/${getLocalStorage('class') || ''}`)}>
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
