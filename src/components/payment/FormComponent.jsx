/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { useCallback, useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Box, Button, Typography, useTheme } from "@mui/material";
import dayjs from "dayjs";

import API from "../../apis";
import Loader from "../common/Loader";
import Toast from "../common/Toast";
import PaymentFormComponent from "./PaymentFormComponent";

import { setMenuItem } from "../../redux/actions/NavigationAction";
import { tokens, themeSettings } from "../../theme";
import { Utility } from "../utility";

import formBg from "../assets/formBg.png";

const FormComponent = () => {
    const [title, setTitle] = useState("Create");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        paymentData: { values: null, validated: false }
    });
    const [updatedValues, setUpdatedValues] = useState(null);
    const [dirty, setDirty] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [reset, setReset] = useState(false);

    const selected = useSelector(state => state.menuItems.selected);
    const toastInfo = useSelector(state => state.toastInfo);
    const paymentFormRef = useRef();

    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const userParams = useParams();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { typography } = themeSettings(theme.palette.mode);
    const { state } = useLocation();
    const { toastAndNavigate, getLocalStorage } = Utility();

    //after page refresh the id in router state becomes undefined, so getting Payment id from url params
    let id = state?.id || userParams?.id;

    useEffect(() => {
        const selectedMenu = getLocalStorage("menu");
        dispatch(setMenuItem(selectedMenu.selected));
    }, []);

    const updatePayment = useCallback(formData => {
        setLoading(true);
        // eslint-disable-next-line no-unused-vars
        const { class_id, section, ...modifiedObj } = formData.paymentData.values;

        API.PaymentAPI.updatePayment(modifiedObj)
            .then(({ data: payment }) => {
                if (payment.status === 'Success') {
                    setLoading(false);
                    toastAndNavigate(dispatch, true, "info", "Successfully Updated", navigateTo, '/payment/listing');
                }
            })
            .catch(err => {
                setLoading(false);
                toastAndNavigate(dispatch, true, "error", err ? err?.response?.data?.msg : "An Error Occurred", navigateTo, 0);
                console.log('Error in Updating Payment:', err);
            });
    }, [formData]);

    const populatePaymentData = useCallback(id => {
        const path = [`/get-by-pk/payment/${id}`];
        setLoading(true);

        API.CommonAPI.multipleAPICall("GET", path)
            .then(res => {
                const firstApiResponse = res[0].data;
                console.log(firstApiResponse, 'firstApiResponse');
                if (firstApiResponse.status === 'Success') {
                    firstApiResponse.data.payment_date = dayjs(firstApiResponse.data.payment_date);
                    if (firstApiResponse.data.due_date != null) {
                        firstApiResponse.data.due_date = dayjs(firstApiResponse.data.due_date);
                    }
                    const studentId = firstApiResponse.data.student_id;
                    API.StudentAPI.getClassOfStudent(studentId)
                        .then(result => {
                            const dataObj = {
                                ...firstApiResponse.data,
                                class_id: result.data.class,
                                section: result.data.section
                            };
                            console.log(dataObj, 'dataObj');
                            setUpdatedValues(dataObj);
                            setLoading(false);
                        })
                        .catch(error => {
                            console.log("Error in API calls of populating Payment:", error);
                        });
                }
            })
            .catch(commonAPIError => {
                setLoading(false);
                toastAndNavigate(dispatch, true, "error", commonAPIError ? commonAPIError?.response?.data?.msg : "An Error Occurred", navigateTo, 0);
            });
    }, [id]);

    const createPayment = useCallback(formData => {
        setLoading(true);
        // eslint-disable-next-line no-unused-vars
        const { class_id, section, ...modifiedObj } = formData.paymentData.values;
        console.log(modifiedObj, 'modifiedobj')

        API.PaymentAPI.createPayment(modifiedObj)
            .then(({ data: payment }) => {
                if (payment.status === 'Success') {
                    setLoading(false);
                    toastAndNavigate(dispatch, true, "success", "Successfully Created", navigateTo, '/payment/listing');
                }
            })
            .catch(err => {
                setLoading(false);
                toastAndNavigate(dispatch, true, "error", err ? err?.response?.data?.msg : "An Error Occurred", navigateTo, 0);
                console.log('Error in Creating Payment:', err);
            });
    }, [formData]);

    //Create/Update/Populate Payment
    useEffect(() => {
        if (id && !submitted) {
            setTitle("Update");
            populatePaymentData(id);
        }
        if (formData.paymentData.validated) {
            formData.paymentData.values?.id ? updatePayment(formData) : createPayment(formData);
        } else {
            setSubmitted(false);
        }
    }, [id, submitted]);

    const handleSubmit = async () => {
        await paymentFormRef.current.Submit();
        setSubmitted(true);
    };

    const handleFormChange = (data, form) => {
        form === 'payment' ? setFormData({ ...formData, paymentData: data }) : null;
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
            <PaymentFormComponent
                onChange={(data) => {
                    handleFormChange(data, 'payment');
                }}
                refId={paymentFormRef}
                setDirty={setDirty}
                reset={reset}
                setReset={setReset}
                updatedValues={updatedValues}
            />
            <Box display="flex" justifyContent="end" m="20px">
                {   //hide reset button on Payment update
                    title === "Update" ? null :
                        <Button type="reset" color="warning" variant="contained" sx={{ mr: 3 }}
                            disabled={!dirty || submitted}
                            onClick={() => {
                                if (window.confirm("Do You Really Want To Reset?")) {
                                    setReset(true);
                                }
                            }}
                        >
                            Reset
                        </Button>
                }
                <Button color="error" variant="contained" sx={{ mr: 3 }}
                    onClick={() => navigateTo('/payment/listing')}>
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
