/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { useCallback, useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Box, Button, Typography, useTheme } from "@mui/material";

import AWS from "aws-sdk";
import { Buffer } from 'buffer';

import API from "../../apis";
import AddressFormComponent from "../address/AddressFormComponent";
import ImagePicker from "../image/ImagePicker";
import Loader from "../common/Loader";
import Toast from "../common/Toast";
import SchoolFormComponent from "./SchoolFormComponent";

import { setAllClasses } from "../../redux/actions/ClassAction";
import { setAllSections } from "../../redux/actions/SectionAction";
import { setAllSubjects } from "../../redux/actions/SubjectAction";
import { setAllPaymentMethods } from "../../redux/actions/PaymentMethodAction";
import { setFormAmenities } from "../../redux/actions/AmenityAction";
import { setMenuItem } from "../../redux/actions/NavigationAction";
import { tokens, themeSettings } from "../../theme";
import { useCommon } from "../hooks/common";
import { Utility } from "../utility";

import formBg from "../assets/formBg.png";

const ENV = import.meta.env;

const FormComponent = () => {
    const [title, setTitle] = useState("Create");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        schoolData: { values: null, validated: false },
        addressData: { values: null, validated: false },
        imageData: { values: null, validated: true },
        bannerImageData: { values: null, validated: true }
    });
    const [updatedValues, setUpdatedValues] = useState(null);
    const [deletedImage, setDeletedImage] = useState([]);
    const [previewDisplay, setPreviewDisplay] = useState([]);
    const [deletedBannerImage, setDeletedBannerImage] = useState([]);
    const [previewBanner, setPreviewBanner] = useState([]);
    const [updatedDisplayImage, setUpdatedDisplayImage] = useState([]);
    const [updatedBannerImage, setUpdatedBannerImage] = useState([]);

    const [dirty, setDirty] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [reset, setReset] = useState(false);

    const allClasses = useSelector(state => state.allClasses);
    const allSections = useSelector(state => state.allSections);
    const allSubjects = useSelector(state => state.allSubjects);
    const formAmenitiesInRedux = useSelector(state => state.allFormAmenities);
    const allPaymentMethods = useSelector(state => state.allPaymentMethods);
    const selected = useSelector(state => state.menuItems.selected);
    const toastInfo = useSelector(state => state.toastInfo);

    const schoolFormRef = useRef();
    const addressFormRef = useRef();
    const imageFormRef = useRef();
    const bannerImageFormRef = useRef();

    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const userParams = useParams();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { typography } = themeSettings(theme.palette.mode);
    const { state } = useLocation();
    const { getPaginatedData } = useCommon();
    const { createSchoolCode, formatImageName, getLocalStorage, getIdsFromObject, findMultipleById,
        fetchAndSetAll, toastAndNavigate } = Utility();

    //after page refresh the id in router state becomes undefined, so getting school id from url params
    let id = state?.id || userParams?.id;

    useEffect(() => {
        const selectedMenu = getLocalStorage("menu");
        dispatch(setMenuItem(selectedMenu.selected));
    }, []);

    //  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< upload in aws bucket >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    const uploadFile = async (image, formattedName) => {
        console.log("Starting upload process");

        // S3 Bucket Name
        const S3_BUCKET = "theskolar";

        // S3 Region
        const REGION = "ap-south-1";

        // S3 Credentials (Ensure these are stored securely in environment variables in production)
        AWS.config.update({
            accessKeyId: "AKIAYS2NU3DQ2WEADGHU",
            secretAccessKey: "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",
            region: REGION
        });

        const s3 = new AWS.S3();

        // Files Parameters
        const params = {
            Bucket: S3_BUCKET,
            Key: formattedName,
            Body: image
        };

        // Uploading file to S3
        try {
            const upload = s3.upload(params).on("httpUploadProgress", (evt) => {
                console.log("Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%");
            }).promise();

            const data = await upload;
            console.log("File uploaded successfully.");
            alert("File uploaded successfully.");
            return data;

        } catch (error) {
            console.error("Error uploading file: ", error);
            alert("Error uploading file.");
        }
    };

    const updateSchoolAndAddress = useCallback(async formData => {
        setLoading(true);
        const paths = [];
        const dataFields = [];

        if (formData.schoolData.dirty) {
            paths.push("/update-school");
            dataFields.push({
                ...formData.schoolData.values,
                amenities: getIdsFromObject(formData.schoolData.values.amenities),
                payment_methods: getIdsFromObject(formData.schoolData.values.payment_methods)
            });
        }

        if (formData.addressData.dirty) {
            paths.push("/update-address");
            dataFields.push({ ...formData.addressData.values });
        }

        try {
            const responses = await API.CommonAPI.multipleAPICall("PATCH", paths, dataFields);
            if (responses) {        //due to this if schoolform or address form is dirty, then other forms are also manipulated
                updateImageAndClassData(formData);
            }
        } catch (err) {
            setLoading(false);
            toastAndNavigate(dispatch, true, "error", err ? err?.response?.data?.msg : "An Error Occurred", navigateTo, 0);
            throw err;
        }
    }, [formData]);

    console.log("updatedDisplayImage>>",updatedDisplayImage);

    const updateImageAndClassData = useCallback(async formData => {
        // delete the selected (removed) images from Azure which are in deletedImage state
        // if (deletedImage.length) {
        //     deletedImage.forEach(image => {
        //         deleteFileFromAzure("school", image);
        //         console.log("Deleted normal image from azure");
        //     });
        // }
        // delete the selected (removed) images from Azure which are in deletedBannerImage state
        // if (deletedBannerImage.length) {
        //     deletedBannerImage.forEach(image => {
        //         deleteFileFromAzure("school/banner", image);
        //         console.log("Deleted  banner image from azure");
        //     });
        // }
        let status = null;

        if (formData.schoolData.dirty) {
            // Delete all class sections from the mapping table
            await API.SchoolAPI.deleteFromMappingTable({ school_id: id });

            const updatedClassData = formData.schoolData.values.sections.map(async (innerArray, classIndex) => {
                // Get class-related data or default to 0 if not available
                const schoolClass = formData.schoolData.values.classes[classIndex] || 0;
                const classFee = formData.schoolData.values.classes_fee[classIndex] || 0;
                const classCapacity = formData.schoolData.values.classes_capacity[classIndex] || 0;
                const classLateFee = formData.schoolData.values.classes_late_fee[classIndex] || 0;
                const classLateFeeDuration = formData.schoolData.values.classes_late_fee_duration[classIndex] || 0;

                // Iterating through each section in the class then associating subject ids for each section of class
                return Promise.all(innerArray.map(async (sectionData, sectionIndex) => {
                    const subjectArray = formData.schoolData.values.subjects[classIndex][sectionIndex] || [];
                    await API.SchoolAPI.insertIntoMappingTable(
                        [formData.schoolData.values.id, schoolClass, sectionData.section_id,
                        getIdsFromObject(subjectArray, allSubjects?.listData), classFee, classCapacity, classLateFee,
                            classLateFeeDuration]
                    );
                }));
            });
            await Promise.all(updatedClassData);
        }

        try {
            let formattedName;
            // delete all images from db on every update and later insert new and old again
            await API.ImageAPI.deleteImage({
                parent: "school",
                parent_id: id
            });
            // upload new images to backend folder and insert in db
            if (formData.imageData?.values?.image) {
                Array.from(formData.imageData.values?.image).map(async image => {
                    formattedName = formatImageName(image.name);
                    try {
                        const res = await uploadFile(image, formattedName);
                        console.log("res", res);
                        if (res.key) {
                            API.ImageAPI.createImage({
                                image_src: res.Location,
                                school_id: school.data.id,
                                parent_id: school.data.id,
                                parent: 'school',
                                type: 'display'
                            });
                        }
                    } catch (error) {
                        console.error("Error uploading file:", error);
                    }
                });
                status = true;
            }
            // insert old images only in db & not on azure
            if (formData.imageData?.values?.constructor === Array) {
                formData.imageData.values.map(image => {
                    API.ImageAPI.createImage({
                        image_src: image.image_src,
                        school_id: image.school_id,
                        parent_id: image.parent_id,
                        parent: image.parent,
                        type: image.type
                    });
                });
                status = true;
            }

            // upload new parent images to azure and insert in db
            if (formData.bannerImageData?.values?.image) {
                Array.from(formData.bannerImageData.values.image).map(async image => {
                    let formattedName = formatImageName(image.name);
                    try {
                        const res = await uploadFile(image, formattedName);
                        console.log("res", res);
                        if (res.key) {
                            API.ImageAPI.createImage({
                                image_src: res.Location,
                                school_id: school.data.id,
                                parent_id: school.data.id,
                                parent: 'school',
                                type: 'display'
                            });
                        }
                    } catch (error) {
                        console.error("Error uploading file:", error);
                    }
                });
                status = true;
            }
            // insert old images parent only in db & not on azure
            if (formData.bannerImageData?.values?.constructor === Array) {
                formData.bannerImageData.values.map(image => {
                    API.ImageAPI.createImage({
                        image_src: image.image_src,
                        school_id: image.school_id,
                        parent_id: image.parent_id,
                        parent: image.parent,
                        type: image.type
                    });
                });
                status = true;
            }
            if (status) {
                setLoading(false);
                toastAndNavigate(dispatch, true, "info", "Successfully Updated", navigateTo, '/school/listing');
            }
        } catch (err) {
            setLoading(false);
            toastAndNavigate(dispatch, true, "error", err ? err?.response?.data?.msg : "An Error Occurred", navigateTo, 0);
            console.log("Error in School Update", err);
        }
    }, [formData]);

    const populateSchoolData = useCallback(id => {
        setLoading(true);
        const paths = [`/get-by-pk/school/${id}`, `/get-address/school/${id}`, `/get-image/school/${id}`];

        API.CommonAPI.multipleAPICall("GET", paths)
            .then(responses => {
                if (responses[0]?.data?.data) {
                    responses[0].data.data.amenities = findMultipleById(responses[0].data.data?.amenities, formAmenitiesInRedux?.listData?.rows);
                    responses[0].data.data.payment_methods = findMultipleById(responses[0].data.data?.payment_methods, allPaymentMethods?.listData);
                }
                API.SchoolAPI.getSchoolClasses(id)
                    .then(res => {
                        const dataObj = {
                            schoolData: {
                                schoolData: responses[0].data.data,
                                selectedClass: res?.data
                            },
                            addressData: responses[1]?.data?.data,
                            imageData: responses[2]?.data?.data
                        };

                        console.log("dataobj",dataObj);

                        setUpdatedValues(dataObj);
                        setUpdatedDisplayImage(dataObj?.imageData?.filter(img => img.type === "display"));
                        setUpdatedBannerImage(dataObj?.imageData?.filter(img => img.type === "banner"));
                        setLoading(false);
                    })
                    .catch(err => {
                        setLoading(false);
                        toastAndNavigate(dispatch, true, "error", err?.response?.data?.msg || "Error fetching school classes", navigateTo, 0);
                    });
            })
            .catch(err => {
                setLoading(false);
                toastAndNavigate(dispatch, true, "error", err?.response?.data?.msg || "Error in MultipleApiCall", navigateTo, 0);
            });
    }, [formAmenitiesInRedux?.listData?.rows, allPaymentMethods?.listData?.length]);

    const createSchool = useCallback(formData => {
        let promise1;
        let promise2;
        let promise3;
        let promise4;
        setLoading(true);

        formData.schoolData.values = {
            ...formData.schoolData.values,
            school_code: createSchoolCode(formData.schoolData.values?.name),
            amenities: getIdsFromObject(formData.schoolData.values?.amenities),
            payment_methods: getIdsFromObject(formData.schoolData.values?.payment_methods)
        };

        API.SchoolAPI.createSchool({ ...formData.schoolData.values })
            .then(({ data: school }) => {
                if (school?.status === 'Success') {
                    promise1 = API.AddressAPI.createAddress({
                        ...formData.addressData.values,
                        school_id: school.data.id,
                        parent_id: school.data.id,
                        parent: 'school'
                    });

                    promise2 = formData.schoolData.values.sections.map((innerArray, classIndex) => {
                        // Get class-related data or default to 0 if not available
                        const schoolClass = formData.schoolData.values.classes[classIndex] || 0;
                        const classFee = formData.schoolData.values.classes_fee[classIndex] || 0;
                        const classCapacity = formData.schoolData.values.classes_capacity[classIndex] || 0;
                        const classLateFee = formData.schoolData.values.classes_late_fee[classIndex] || 0;
                        const classLateFeeDuration = formData.schoolData.values.classes_late_fee_duration[classIndex] || 0;

                        // Iterating through each section in the class then associating subject ids for each section of class
                        innerArray.map((sectionData, sectionIndex) => {
                            // Get subject array for the current section or default to empty array
                            const subjectArray = formData.schoolData.values.subjects[classIndex][sectionIndex] || [];
                            API.SchoolAPI.insertIntoMappingTable(
                                [school.data.id, schoolClass, sectionData.section_id,
                                getIdsFromObject(subjectArray, allSubjects?.listData), classFee, classCapacity, classLateFee,
                                    classLateFeeDuration]
                            );
                        });
                    });
                    if (formData.imageData.values?.image?.length) {
                        promise3 = Array.from(formData.imageData.values.image).map(async (image) => {
                            let formattedName = formatImageName(image.name);

                            try {
                                const res = await uploadFile(image, formattedName);
                                console.log("res", res);
                                if (res.key) {
                                    API.ImageAPI.createImage({
                                        image_src: res.Location,
                                        school_id: school.data.id,
                                        parent_id: school.data.id,
                                        parent: 'school',
                                        type: 'display'
                                    });
                                }
                            } catch (error) {
                                console.error("Error uploading file:", error);
                            }
                        });
                    }

                    if (formData.bannerImageData.values.image?.length) {
                        promise4 = Array.from(formData.bannerImageData.values.image).map(async (image) => {
                            let formattedName = formatImageName(image.name);
                            try {
                                const res = await uploadFile(image, formattedName);
                                console.log("res", res);
                                if (res.key) {
                                    API.ImageAPI.createImage({
                                        image_src: res.Location,
                                        school_id: school.data.id,
                                        parent_id: school.data.id,
                                        parent: 'school',
                                        type: 'banner'
                                    });
                                }
                            } catch (error) {
                                console.error("Error uploading file:", error);
                            }
                        });
                    }

                    return Promise.all([promise1, promise2, promise3, promise4])
                        .then(() => {
                            setLoading(false);
                            toastAndNavigate(dispatch, true, "success", "Successfully Created", navigateTo, 0, true);
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
    }, [formData]);

    useEffect(() => {
        if (!formAmenitiesInRedux?.listData?.rows?.length) {
            getPaginatedData(0, 50, setFormAmenities, API.AmenityAPI);
        }
    }, []);

    useEffect(() => {
        if (!allPaymentMethods?.listData?.length) {
            fetchAndSetAll(dispatch, setAllPaymentMethods, API.PaymentMethodAPI);
        }
    }, []);

    useEffect(() => {
        if (!allSubjects?.listData?.length) {
            fetchAndSetAll(dispatch, setAllSubjects, API.SubjectAPI);
        }
    }, []);

    useEffect(() => {
        if (!allClasses?.listData?.length) {
            fetchAndSetAll(dispatch, setAllClasses, API.ClassAPI);
        }
    }, []);

    useEffect(() => {
        if (!allSections?.listData?.length) {
            fetchAndSetAll(dispatch, setAllSections, API.SectionAPI);
        }
    }, []);

    //Create/Update/Populate School
    useEffect(() => {
        if (id && !submitted && formAmenitiesInRedux?.listData?.rows && allSubjects?.listData) {
            setTitle("Update");
            populateSchoolData(id);
        }
        if (formData.schoolData.validated && formData.addressData.validated) {
            formData.schoolData.values?.id ? updateSchoolAndAddress(formData) : createSchool(formData);
        } else {
            setSubmitted(false);
        }
    }, [id, submitted, formAmenitiesInRedux?.listData?.rows, allSubjects?.listData]);


    const handleSubmit = async () => {
        await schoolFormRef.current.Submit();
        await addressFormRef.current.Submit();
        await imageFormRef.current?.Submit();
        await bannerImageFormRef.current?.Submit();
        setSubmitted(true);
    };

    const handleFormChange = (data, form) => {
        if (form === 'school') {
            setFormData({ ...formData, schoolData: data });
        } else if (form === 'address') {
            setFormData({ ...formData, addressData: data });
        } else if (form === 'display') {
            setFormData({ ...formData, imageData: data });
        } else if (form === 'banner') {
            setFormData({ ...formData, bannerImageData: data });
        }
    };

    return (
        <Box m="10px"
            sx={{
                backgroundImage: theme.palette.mode == "light" ? `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url(${formBg})`
                    : `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${formBg})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "start",
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
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
            <SchoolFormComponent
                onChange={(data) => {
                    handleFormChange(data, 'school');
                }}
                refId={schoolFormRef}
                setDirty={setDirty}
                reset={reset}
                setReset={setReset}
                schoolId={id}
                allClasses={allClasses?.listData}
                allSections={allSections?.listData}
                subjectsInRedux={allSubjects?.listData}
                amenities={formAmenitiesInRedux?.listData?.rows}
                paymentMethods={allPaymentMethods?.listData}
                updatedValues={updatedValues?.schoolData}
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
                onChange={data => handleFormChange(data, 'display')}
                refId={imageFormRef}
                reset={reset}
                setReset={setReset}
                setDirty={setDirty}
                preview={previewDisplay}
                setPreview={setPreviewDisplay}
                updatedImage={updatedDisplayImage}            //these are updated Values
                setUpdatedImage={setUpdatedDisplayImage}
                deletedImage={deletedImage}
                setDeletedImage={setDeletedImage}
                imageType="Display"
                ENV={ENV}
            />
            <ImagePicker
                key="banner"
                onChange={data => handleFormChange(data, 'banner')}
                refId={bannerImageFormRef}
                reset={reset}
                setReset={setReset}
                setDirty={setDirty}
                preview={previewBanner}
                setPreview={setPreviewBanner}
                updatedImage={updatedBannerImage}             //these are updated Values
                setUpdatedImage={setUpdatedBannerImage}
                deletedImage={deletedBannerImage}
                setDeletedImage={setDeletedBannerImage}
                imageType="Banner"
                multiple={true}
                ENV={ENV}
            />

            <Box display="flex" justifyContent="end" m="20px">
                {   //hide reset button on school update
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
