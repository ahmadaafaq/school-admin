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
import TeacherFormComponent from "./TeacherFormComponent";

import { setMenuItem } from "../../redux/actions/NavigationAction";
import { tokens, themeSettings } from "../../theme";
import { Utility } from "../utility";

const ENV = import.meta.env;

const FormComponent = () => {
    const [title, setTitle] = useState("Create");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        teacherData: { values: null, validated: false },
        addressData: { values: null, validated: false },
        imageData: { values: null, validated: true }
    });
    const [updatedValues, setUpdatedValues] = useState(null);
    const [deletedImage, setDeletedImage] = useState([]);
    const [preview, setPreview] = useState([]);
    const [dirty, setDirty] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [reset, setReset] = useState(false);
    const [combinedClass, setCombinedClass] = useState([]);     //for teacher form component

    const teacherFormRef = useRef();
    const addressFormRef = useRef();
    const imageFormRef = useRef();

    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const userParams = useParams();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { typography } = themeSettings(theme.palette.mode);

    const selected = useSelector(state => state.menuItems.selected);
    const toastInfo = useSelector(state => state.toastInfo);
    const { state } = useLocation();
    const { formatImageName, getLocalStorage, toastAndNavigate } = Utility();

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
        const paths = [`/get-by-pk/teacher/${id}`, `/get-address/teacher/${id}`, `/get-teacher-detail/${id}`, `/get-image/teacher/${id}`];
        API.CommonAPI.multipleAPICall("GET", paths)
            .then(responses => {
                console.log('res=>', responses)
                if (responses[0].data.data) {
                    responses[0].data.data.dob = dayjs(responses[0].data.data.dob);
                }
                const dataObj = {
                    teacherData: {
                        teacherData: responses[0].data.data,
                        selectedClass: responses[2]?.data?.data,
                    },
                    addressData: responses[1]?.data?.data,
                    imageData: responses[3]?.data?.data
                };
                console.log('teacher dataobj', dataObj)
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
        let promise1;
        let promise2;
        let promise3;
        setLoading(true);

        API.TeacherAPI.createTeacher({ ...formData.teacherData.values })
            .then(({ data: teacher }) => {
                if (teacher?.status === 'Success') {
                    promise1 = API.AddressAPI.createAddress({
                        ...formData.addressData.values,
                        parent_id: teacher.data.id,
                        parent: 'teacher',
                    });

                    promise2 = formData.teacherData.values.combinedClsSect.map((innerArray, index) => {
                        const class_subject = formData.teacherData.values?.subject[index] || 0;
                        // Associating each inner array with a subject
                        innerArray.map(classData => {
                            console.log('got', classData.class_id, classData.section_id, class_subject);
                            API.TeacherAPI.insertIntoMappingTable(
                                [teacher.data.id, classData.class_id, classData.section_id, class_subject]
                            )
                        })
                    });

                    if (formData.imageData.values.Teacher?.length) {
                        promise3 = Array.from(formData.imageData.values.Teacher).map(async (image) => {
                            let formattedName = formatImageName(image.name);
                            API.ImageAPI.uploadImage({ image: image, imageName: formattedName });
                            API.ImageAPI.createImage({
                                image_src: formattedName,
                                parent_id: teacher.data.id,
                                parent: 'teacher',
                                type: 'normal'
                            })
                        });
                    }

                    return Promise.all([promise1, promise2, promise3])
                        .then(data => {
                            setLoading(false);
                            toastAndNavigate(dispatch, true, "success", "Successfully Created", navigateTo, `/${selected.toLowerCase()}/listing`);
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
                toastAndNavigate(dispatch, true, "error", err?.response?.data?.msg);
                throw err;
            });
    };

    useEffect(() => {
        API.ClassAPI.getClassSectionList()
            .then(data => {
                if (data.status === 'Success') {
                    data.data.map(item => {
                        delete item.class_subjects;
                    })
                    console.log('joined classData', data.data);
                    setCombinedClass(data.data);
                } else {
                    console.error("Error fetching classes. Please Try Again");
                }
            })
            .catch(err => {
                console.error("Error fetching classes:", err);
            });
    }, []);

    //Create/Update/Populate teacher
    useEffect(() => {
        if (id && !submitted && combinedClass) {
            setTitle("Update");
            populateTeacherData(id);
        }
        if (formData.teacherData.validated && formData.addressData.validated) {
            formData.teacherData.values?.id ? updateTeacherAndAddress(formData) : createTeacher();
        } else {
            setSubmitted(false);
        }
    }, [id, submitted, combinedClass]);

    const handleSubmit = async () => {
        await teacherFormRef.current.Submit();
        await addressFormRef.current.Submit();
        await imageFormRef.current.Submit();
        setSubmitted(true);
    };

    const handleFormChange = (data, form) => {
        if (form === 'teacher') {
            setFormData({ ...formData, teacherData: data });
        } else if (form === 'address') {
            setFormData({ ...formData, addressData: data });
        } else if (form === 'image') {
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
            <TeacherFormComponent
                onChange={(data) => {
                    handleFormChange(data, 'teacher');
                }}
                refId={teacherFormRef}
                setDirty={setDirty}
                reset={reset}
                setReset={setReset}
                teacherId={id}
                combinedClass={combinedClass}
                setCombinedClass={setCombinedClass}
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
            <ImagePicker
                key="image"
                onChange={data => handleFormChange(data, 'image')}
                refId={imageFormRef}
                reset={reset}
                setReset={setReset}
                setDirty={setDirty}
                preview={preview}
                setPreview={setPreview}
                updatedValues={updatedValues?.imageData}
                deletedImage={deletedImage}
                setDeletedImage={setDeletedImage}
                imageType="Teacher"
                ENV={ENV}
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
