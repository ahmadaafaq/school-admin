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

import API from "../../apis";
import AddressFormComponent from "../address/AddressFormComponent";
import ImagePicker from "../image/ImagePicker";
import Loader from "../common/Loader";
import Toast from "../common/Toast";
import SchoolFormComponent from "./SchoolFormComponent";

import { setMenuItem } from "../../redux/actions/NavigationAction";
import { tokens, themeSettings } from "../../theme";
import { Utility } from "../utility";

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
    const [preview, setPreview] = useState([]);
    const [deletedBannerImage, setDeletedBannerImage] = useState([]);
    const [previewBanner, setPreviewBanner] = useState([]);

    const [dirty, setDirty] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [reset, setReset] = useState(false);
    const [amenities, setAmenities] = useState([]);     //for amenities table data from db

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

    const selected = useSelector(state => state.menuItems.selected);
    const toastInfo = useSelector(state => state.toastInfo);
    const { state } = useLocation();
    const { createSchoolCode, getLocalStorage, toastAndNavigate } = Utility();

    //after page refresh the id in router state becomes undefined, so getting school id from url params
    let id = state?.id || userParams?.id;

    useEffect(() => {
        const selectedMenu = getLocalStorage("menu");
        dispatch(setMenuItem(selectedMenu.selected));
    }, []);

    const updateSchoolAndAddress = useCallback(formData => {
        setLoading(true);

        const paths = ["/update-school", "/update-address"];
        const dataFields = [
            {
                ...formData.schoolData.values,
                amenities: getSelectedAmenities(formData.schoolData.values.amenities)
            },
            { ...formData.addressData.values }
        ];

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

    const populateSchoolData = (id) => {
        setLoading(true);
        const paths = [`/get-by-pk/school/${id}`, `/get-address/school/${id}`];
        API.CommonAPI.multipleAPICall("GET", paths)
            .then(responses => {
                if (responses[0].data.data) {
                    responses[0].data.data.amenities = getSelectedAmenitiesByName(responses[0].data.data?.amenities);
                }
                const dataObj = {
                    schoolData: responses[0].data.data,
                    addressData: responses[1]?.data?.data
                };
                console.log('form component', dataObj)
                setUpdatedValues(dataObj);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                toastAndNavigate(dispatch, true, "error", err?.response?.data?.msg);
                throw err;
            });
    };

    const createSchool = () => {
        setLoading(true);

        formData.schoolData.values = {
            ...formData.schoolData.values,
            school_code: createSchoolCode(formData.schoolData.values.name),
            amenities: getSelectedAmenities(formData.schoolData.values?.amenities)
        };

        API.SchoolAPI.createSchool({ ...formData.schoolData.values })
            .then(({ data: school }) => {
                if (school?.status === 'Success') {
                    API.AddressAPI.createAddress({
                        ...formData.addressData.values,
                        school_id: school.data.id,
                        parent_id: school.data.id,
                        parent: 'school',
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

    //taking out only the id from amenities object from formData.salonData.values.amenities
    function getSelectedAmenities(amenities) {
        let amenityId = [];         //using traditional function statement for hoisting
        amenities?.forEach(amenity => {
            amenityId.push(amenity.id);
        });
        return amenityId.toString();
    };

    const getSelectedAmenitiesByName = (dataObj) => {
        const objId = dataObj?.split(",");
        if (objId) {
            return amenities.filter(amenity => objId.includes(amenity.id.toString()));
        }
    };

    //get all amenities from amenity table stored in the db before populating data
    useEffect(() => {
        const getAmenities = () => {
            API.AmenityAPI.getAll(false, 0, 30)
                .then(amenities => {
                    if (amenities.status === 'Success') {
                        setAmenities(amenities.data.rows);
                    } else {
                        console.log("Error, Please Try Again");
                    }
                })
                .catch(err => {
                    throw err;
                });
        };
        getAmenities();
    }, []);

    //Create/Update/Populate School
    useEffect(() => {
        if (id && !submitted && amenities) {
            setTitle("Update");
            populateSchoolData(id);
        }
        if (formData.schoolData.validated && formData.addressData.validated) {
            formData.schoolData.values?.id ? updateSchoolAndAddress(formData) : createSchool();
        } else {
            setSubmitted(false);
        }
    }, [id, submitted, amenities]);

    const handleSubmit = async () => {
        await schoolFormRef.current.Submit();
        await addressFormRef.current.Submit();
        await imageFormRef.current.Submit();
        await bannerImageFormRef.current.Submit();
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
            <SchoolFormComponent
                onChange={(data) => {
                    handleFormChange(data, 'school');
                }}
                refId={schoolFormRef}
                setDirty={setDirty}
                reset={reset}
                setReset={setReset}
                userId={id}
                amenities={amenities}
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
                preview={preview}
                setPreview={setPreview}
                // updatedValues={updatedValues?.imageData.filter(img => img.type === "normal")}
                deletedImage={deletedImage}
                setDeletedImage={setDeletedImage}
                imageType="Display"
            // azurePath={`${ENV.VITE_SAS_URL}/${ENV.VITE_PARENT_SALON}`}
            // ENV={ENV}
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
                // updatedValues={updatedValues?.imageData.filter(img => img.type === "banner")}
                deletedImage={deletedBannerImage}
                setDeletedImage={setDeletedBannerImage}
                imageType="Banner"
            // azurePath={`${ENV.VITE_SAS_URL}/${ENV.VITE_PARENT_SALON}/banner`}
            // ENV={ENV}
            />

            <Box display="flex" justifyContent="end" m="20px">
                {   //hide reset button on school update
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
