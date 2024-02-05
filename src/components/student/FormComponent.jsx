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
import StudentFormComponent from "./StudentFormComponent";

import { setMenuItem } from "../../redux/actions/NavigationAction";
import { setSubjects } from "../../redux/actions/SubjectAction";
import { tokens, themeSettings } from "../../theme";
import { useCommon } from "../hooks/common";
import { Utility } from "../utility";
import ICardModal from "../models/ICardModal";

const FormComponent = () => {
    const [title, setTitle] = useState("Create");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        studentData: { values: null, validated: false },
        addressData: { values: null, validated: false },
        imageData: { values: null, validated: true }
    });
    const [updatedValues, setUpdatedValues] = useState(null);
    const [deletedImage, setDeletedImage] = useState([]);
    const [preview, setPreview] = useState([]);
    const [dirty, setDirty] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [reset, setReset] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [iCardDetails, setICardDetails] = useState({});

    const subjectsInRedux = useSelector(state => state.allSubjects);
    const selected = useSelector(state => state.menuItems.selected);
    const toastInfo = useSelector(state => state.toastInfo);

    const studentFormRef = useRef();
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
    const { toastAndNavigate, getLocalStorage, getIdsFromObject, findMultipleById } = Utility();

    //after page refresh the id in router state becomes undefined, so getting student id from url params
    let id = state?.id || userParams?.id;
    const showIdCard = !id || (id && !updatedValues?.studentData?.id_card);

    useEffect(() => {
        const selectedMenu = getLocalStorage("menu");
        dispatch(setMenuItem(selectedMenu.selected));
    }, []);

    const updateStudentAndAddress = useCallback(formData => {
        console.log("formdataABCD", formData)
        const dataFields = [
            { ...formData.studentData.values },
            { ...formData.addressData.values }
        ];
        const paths = ["/update-student", "/update-address"];
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
                    toastAndNavigate(dispatch, true, "info", "Successfully Updated", navigateTo, `/student/listing/${getLocalStorage('class')}`);
                };
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                toastAndNavigate(dispatch, true, "error", err?.response?.data?.msg);
                throw err;
            });
    }, [formData]);

    const populateStudentData = (id) => {
        setLoading(true);
        const paths = [`/get-by-pk/student/${id}`, `/get-address/student/${id}`];
        API.CommonAPI.multipleAPICall("GET", paths)
            .then(responses => {
                if (responses[0].data.data) {
                    responses[0].data.data.subjects = findMultipleById(responses[0].data.data.subjects, subjectsInRedux?.listData?.rows)
                    responses[0].data.data.dob = dayjs(responses[0].data.data.dob);
                    responses[0].data.data.admission_date = dayjs(responses[0].data.data.admission_date);
                }
                const dataObj = {
                    studentData: responses[0].data.data,
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

    const createStudent = () => {
        let promises;
        setLoading(true);
        formData.studentData.values = {
            ...formData.studentData.values,
            subjects: getIdsFromObject(formData.studentData.values?.subjects)
        }
        API.StudentAPI.createStudent({ ...formData.studentData.values })
            .then(({ data: student }) => {
                if (student?.status === 'Success') {
                    API.AddressAPI.createAddress({
                        ...formData.addressData.values,
                        parent_id: student.data.id,
                        parent: 'student',
                    })
                        .then(address => {
                            if (formData.imageData.values.Student?.length) {
                                promises = Array.from(formData.imageData.values.Student).map(async (image) => {
                                    console.log(image, 'front end image')
                                    API.ImageAPI.uploadImage({ image: image });
                                });
                            }
                            return Promise.all(promises)
                                .then(data => {
                                    setLoading(false);
                                    toastAndNavigate(dispatch, true, "success", "Successfully Created", navigateTo, `/student/listing/${getLocalStorage('class')}`);
                                })
                                .catch(err => {
                                    setLoading(false);
                                    toastAndNavigate(dispatch, true, err ? err?.response?.data?.msg : "An Error Occurred", navigateTo, 0);
                                    throw err;
                                });
                        })
                        .catch(err => {
                            setLoading(false);
                            toastAndNavigate(dispatch, true, "error", err?.response?.data?.msg);
                            throw err;
                        });
                }
            })
            .catch(err => {
                setLoading(false);
                toastAndNavigate(dispatch, true, "error", err?.response?.data?.msg, navigateTo, 0);
                throw err;
            });
    };


    const handleSubmitDialog = (folderName, fileName, blobName) => {
        API.UserAPI.update({ id: auth.id, agreement: 1 });
        uploadDocumentToAzure(folderName, fileName, blobName);
    };

    useEffect(() => {
        if (!subjectsInRedux?.listData?.rows?.length) {
            getPaginatedData(0, 50, setSubjects, API.SubjectAPI);
        }
    }, [subjectsInRedux?.listData?.rows?.length]);

    //Create/Update/Populate student
    useEffect(() => {
        if (id && !submitted) {
            setTitle("Update");
            populateStudentData(id);
        }
        if (formData.studentData.validated && formData.addressData.validated) {
            formData.studentData.values?.id ? updateStudentAndAddress(formData) : createStudent();
        } else {
            setSubmitted(false);
        }
    }, [id, submitted]);

    const handleSubmit = async () => {
        await studentFormRef.current.Submit();
        await addressFormRef.current.Submit();
        await imageFormRef.current.Submit();
        setSubmitted(true);
    };

    const handleFormChange = (data, form) => {
        if (form === 'student') {
            setFormData({ ...formData, studentData: data });
        } else if (form === 'address') {
            setFormData({ ...formData, addressData: data });
        } else if (form === 'student_image') {
            setFormData({ ...formData, imageData: data });
        }
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
            <StudentFormComponent
                onChange={(data) => {
                    handleFormChange(data, 'student');
                }}
                refId={studentFormRef}
                setDirty={setDirty}
                reset={reset}
                setReset={setReset}
                userId={id}
                updatedValues={updatedValues?.studentData}
                iCardDetails={iCardDetails}
                setICardDetails={setICardDetails}
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
                iCardDetails={iCardDetails}
                setICardDetails={setICardDetails}
            />
            <ImagePicker
                key="image"
                onChange={data => handleFormChange(data, 'student_image')}
                refId={imageFormRef}
                reset={reset}
                setReset={setReset}
                setDirty={setDirty}
                preview={preview}
                setPreview={setPreview}
                updatedValues={updatedValues?.imageData}
                iCardDetails={iCardDetails}
                setICardDetails={setICardDetails}
                deletedImage={deletedImage}
                setDeletedImage={setDeletedImage}
                imageType="Student"
            />

            <Box display="flex" justifyContent="end" m="20px" pb="20px">

                {showIdCard && <>
                    <Button color="info" variant="contained" sx={{ mr: 30 }}
                        disabled={!dirty}
                        onClick={() => setOpenDialog(!openDialog)}
                    >
                        Generate ICard
                    </Button>
                    <ICardModal iCardDetails={iCardDetails} setICardDetails={setICardDetails}
                        handleSubmitDialog={handleSubmitDialog} openDialog={openDialog} setOpenDialog={setOpenDialog} />
                </>}
                {   //hide reset button on student update
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
                    onClick={() => navigateTo(`/student/listing/${getLocalStorage('class') || ''}`)}>
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
