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
import AddressFormComponent from "../address/AddressFormComponent";
import ImagePicker from "../image/ImagePicker";
import ICardModal from "../models/ICardModal";
import Loader from "../common/Loader";
import Toast from "../common/Toast";
import StudentFormComponent from "./StudentFormComponent";

import { setMenuItem } from "../../redux/actions/NavigationAction";
import { setAllSubjects } from "../../redux/actions/SubjectAction";
import { tokens, themeSettings } from "../../theme";
import { Utility } from "../utility";

import formBg from "../assets/formBg.png";

const ENV = import.meta.env;

const FormComponent = () => {
    const [title, setTitle] = useState("Create");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        studentData: { values: null, validated: false },
        addressData: { values: null, validated: false },
        imageData: { values: null, validated: true }
    });
    const [updatedValues, setUpdatedValues] = useState(null);
    const [updatedImage, setUpdatedImage] = useState([]);
    const [deletedImage, setDeletedImage] = useState([]);
    const [preview, setPreview] = useState([]);
    const [dirty, setDirty] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [reset, setReset] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [classData, setClassData] = useState([]);
    const [iCardDetails, setICardDetails] = useState({});

    const formSubjectsInRedux = useSelector(state => state.allSubjects);
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
    const { getLocalStorage, getIdsFromObject, findMultipleById, formatImageName, fetchAndSetAll, isObjEmpty, toastAndNavigate } = Utility();

    //after page refresh the id in router state becomes undefined, so getting student id from url params
    let id = state?.id || userParams?.id;
    const showIdCard = !id || (id && !updatedValues?.studentData?.id_card);

    useEffect(() => {
        const selectedMenu = getLocalStorage("menu");
        dispatch(setMenuItem(selectedMenu.selected));
    }, []);

    const updateStudentAndAddress = useCallback(formData => {
        setLoading(true);
        const paths = ["/update-student", "/update-address"];

        const dataFields = [
            {
                ...formData.studentData.values,
                subjects: getIdsFromObject(formData.studentData.values.subjects)
            },
            { ...formData.addressData.values },
            { ...formData.imageData.values }
        ];

        // delete the selected (removed) images from Azure which are in deletedImage state
        // if (deletedImage.length) {
        //     deletedImage.forEach(image => {
        //         deleteFileFromAzure("salon", image);
        //         console.log("Deleted normal image from azure");
        //     });
        // }

        // delete all images from db on every update and later insert new and old again
        API.ImageAPI.deleteImage({
            parent: "student",
            parent_id: id
        });

        API.CommonAPI.multipleAPICall("PATCH", paths, dataFields)
            .then(responses => {
                let status = null;
                let formattedName;
                if (responses) {
                    if (!isObjEmpty(dataFields[2])) {
                        // upload new images to backend folder and insert in db
                        if (formData.imageData?.values?.Student?.length) {
                            Array.from(formData.imageData.values.Student).map(image => {
                                formattedName = formatImageName(image.name);
                                API.ImageAPI.uploadImage({ image: image, imageName: formattedName });
                                API.ImageAPI.createImage({
                                    image_src: formattedName,
                                    parent_id: formData.studentData.values.id,
                                    parent: 'student',
                                    type: 'normal'
                                })
                            });
                            status = true;
                        }
                        // insert old images only in db & not on azure
                        if (formData.imageData?.values) {
                            formData.imageData.values.map(image => {
                                API.ImageAPI.createImage({
                                    image_src: image.image_src,
                                    school_id: image.school_id,
                                    parent_id: image.parent_id,
                                    parent: image.parent,
                                    type: image.type
                                })
                            });
                            status = true;
                        }
                    } else {
                        status = true;
                    }
                    if (status) {
                        setLoading(false);
                        toastAndNavigate(dispatch, true, "info", "Successfully Updated", navigateTo, `/student/listing/${getLocalStorage('class')}`);
                    }
                }
            })
            .catch(err => {
                setLoading(false);
                toastAndNavigate(dispatch, true, "error", err ? err?.response?.data?.msg : "An Error Occurred", navigateTo, 0);
                throw err;
            });
    }, [formData]);

    const populateStudentData = useCallback(id => {
        setLoading(true);
        const paths = [`/get-by-pk/student/${id}`, `/get-address/student/${id}`, `/get-image/student/${id}`];

        API.CommonAPI.multipleAPICall("GET", paths)
            .then(responses => {
                if (responses[0].data.data) {
                    responses[0].data.data.subjects = findMultipleById(responses[0].data.data.subjects, formSubjectsInRedux?.listData)
                    responses[0].data.data.dob = dayjs(responses[0].data.data.dob);
                    responses[0].data.data.admission_date = dayjs(responses[0].data.data.admission_date);
                }
                const dataObj = {
                    studentData: responses[0].data.data,
                    addressData: responses[1]?.data?.data,
                    imageData: responses[2]?.data?.data
                };
                setUpdatedValues(dataObj);
                setUpdatedImage(dataObj?.imageData);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                toastAndNavigate(dispatch, true, "error", err ? err?.response?.data?.msg : "An Error Occurred", navigateTo, 0);
                throw err;
            });
    }, [formSubjectsInRedux?.listData]);

    const createStudent = useCallback(formData => {
        let promise1;
        let promise2;
        setLoading(true);
        const username = formData.studentData.values?.father_name || formData.studentData.values?.mother_name ||
            formData.studentData.values?.guardian;
        const password = `${username}${ENV.VITE_SECRET_CODE}`;
        formData.studentData.values = {
            ...formData.studentData.values,
            subjects: getIdsFromObject(formData.studentData.values?.subjects)
        }

        API.UserAPI.register({
            username: username,
            password: password,
            email: formData.studentData.values.email,
            contact_no: formData.studentData.values.contact_no,
            role: 5,
            designation: 'parent',
            status: 'active'
        })
            .then(({ data: user }) => {
                if (user?.status === 'Success') {
                    API.StudentAPI.createStudent({
                        ...formData.studentData.values,
                        parent_id: user.data.id
                    })
                        .then(async ({ data: student }) => {
                            promise1 = API.AddressAPI.createAddress({
                                ...formData.addressData.values,
                                parent_id: student.data.id,
                                parent: 'student'
                            });

                            if (formData.imageData?.values?.Student?.length) {
                                promise2 = Array.from(formData.imageData.values.Student).map(async (image) => {
                                    let formattedName = formatImageName(image.name);
                                    API.ImageAPI.uploadImage({ image: image, imageName: formattedName });
                                    API.ImageAPI.createImage({
                                        image_src: formattedName,
                                        parent_id: student.data.id,
                                        parent: 'student',
                                        type: 'normal'
                                    })
                                });
                            }

                            try {
                                await Promise.all([promise1, promise2]);
                                setLoading(false);
                                toastAndNavigate(dispatch, true, "success", "Successfully Created", navigateTo, `/student/listing/${getLocalStorage('class')}`);
                            } catch (err) {
                                setLoading(false);
                                toastAndNavigate(dispatch, true, err ? err?.response?.data?.msg : "An Error Occurred", navigateTo, 0);
                                throw err;
                            }
                        })
                        .catch(err => {
                            setLoading(false);
                            toastAndNavigate(dispatch, true, "error", err ? err?.response?.data?.msg : "An Error Occurred", navigateTo, 0);
                            throw err;
                        });
                }
            })
            .catch(err => {
                setLoading(false);
                toastAndNavigate(dispatch, true, "error", err ? err?.response?.data?.msg : "An Error Occurred", navigateTo, 0);
                throw err;
            });
    }, []);

    useEffect(() => {
        if (!formSubjectsInRedux?.listData?.length) {
            fetchAndSetAll(dispatch, setAllSubjects, API.SubjectAPI);
        }
    }, [formSubjectsInRedux?.listData?.length]);

    //Create/Update/Populate student
    useEffect(() => {
        if (id && !submitted && formSubjectsInRedux?.listData) {
            setTitle("Update");
            populateStudentData(id);
        }
        if (formData.studentData.validated && formData.addressData.validated) {
            formData.studentData.values?.id ? updateStudentAndAddress(formData) : createStudent(formData);
        } else {
            setSubmitted(false);
        }
    }, [id, submitted, formSubjectsInRedux?.listData]);

    const handleSubmit = async () => {
        await studentFormRef.current.Submit();
        await addressFormRef.current.Submit();
        await imageFormRef.current?.Submit();
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
        <Box ml="10px"
            sx={{
                backgroundImage: theme.palette.mode == "light" ? `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url(${formBg})`
                    : `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${formBg})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "start",
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            }}>
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
                classData={classData}
                setClassData={setClassData}
                allSubjects={formSubjectsInRedux?.listData}
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
                deletedImage={deletedImage}
                setDeletedImage={setDeletedImage}
                updatedImage={updatedImage}            //these are updated Values
                setUpdatedImage={setUpdatedImage}
                iCardDetails={iCardDetails}
                setICardDetails={setICardDetails}
                imageType="Student"
                ENV={ENV}
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
                        openDialog={openDialog} setOpenDialog={setOpenDialog} />
                </>}
                {   //hide reset button on student update
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
        </Box >
    );
};

export default FormComponent;
