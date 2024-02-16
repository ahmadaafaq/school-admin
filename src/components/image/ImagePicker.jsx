/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useFormik } from "formik";
import { Box, IconButton, TextField } from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import PreviewImage from "./PreviewImage";

const ImagePicker = ({
    onChange,
    refId,
    setDirty,
    reset,
    setReset,
    preview,
    setPreview,
    iCardDetails = null,
    setICardDetails = null,
    updatedImage = [],
    setUpdatedImage,
    deletedImage = [],
    setDeletedImage,
    imageType,
    ENV
}) => {
    const initialValues = {};
    initialValues[`${imageType}`] = null;

    const [initialState, setInitialState] = useState(initialValues);

    const formik = useFormik({
        initialValues: initialState,
        enableReinitialize: true,
        onSubmit: () => watchForm()
    });

    React.useImperativeHandle(refId, () => ({
        Submit: async () => {
            await formik.submitForm();
        }
    }));

    const watchForm = () => {
        if (onChange) {
            onChange({
                values: formik.values,
                validated: formik.isSubmitting
                    ? Object.keys(formik.errors).length === 0
                    : false
            });
        }
    };

    useEffect(() => {
        if (reset) {
            formik.resetForm();
            setPreview([]);
            setReset(false);
        }
    }, [reset]);

    useEffect(() => {
        if (formik.dirty) {
            setDirty(true);
        }
    }, [formik.dirty]);


    useEffect(() => {
        if (iCardDetails) {
            setICardDetails({
                ...iCardDetails,
                ...formik.values
            });
        }
    }, [formik.values]);

    useEffect(() => {
        if (updatedImage) {
           
            setInitialState(updatedImage);
            // const srcArray = [];
            // updatedImage.map(img => {
            //     if (img.updatedImage_src) {
            //         srcArray.push(`${azurePath}/${img.updatedImage_src}?${ENV.VITE_SAS_TOKEN}`);
            //     }
            // });
            // setPreview(srcArray);
        }
    }, [updatedImage?.length]);

    return (
        <Box m="10px">
            <form ref={refId} encType="multipart/form-data">
                <TextField
                    accept="image/*, application/pdf"
                    name={imageType}
                    label={`Upload ${imageType} Image`}
                    value={undefined}
                    size="small"
                    onBlur={formik.handleBlur}
                    InputProps={{
                        multiple: true,
                        startAdornment: (
                            <IconButton component="label" sx={{ width: "88%" }}>
                                <AddPhotoAlternateIcon />
                                <input
                                    hidden
                                    multiple
                                    type="file"
                                    name="file"
                                    onChange={(event) => {
                                        //keeping old image files also in formik while inserting new files, so
                                        formik.values[`${imageType}`] ?     //we do not need to manual merge in
                                            formik.setFieldValue(`${imageType}`,        //previewImage
                                                [
                                                    ...formik.values[`${imageType}`],
                                                    ...event.target.files
                                                ]) : formik.setFieldValue(`${imageType}`, event.target.files);
                                        setDirty(true);
                                    }}
                                />
                            </IconButton>
                        )
                    }}
                    error={formik.touched[`${imageType}`] && Boolean(formik.errors[`${imageType}`])}
                    helperText={formik.touched[`${imageType}`] && formik.errors[`${imageType}`]}
                    sx={{ m: 1, outline: "none", width: "13%" }}
                />
            </form>
            {formik.values[`${imageType}`] || updatedImage?.length ?
                <PreviewImage
                    formik={formik}
                    deletedImage={deletedImage}
                    setDeletedImage={setDeletedImage}
                    setDirty={setDirty}
                    updatedImage={updatedImage}
                    setUpdatedImage={setUpdatedImage}
                    imageFiles={formik.values[`${imageType}`]}
                    preview={preview}
                    setPreview={setPreview}
                    imageType={imageType}
                    ENV={ENV}
                />
                : null}
        </Box>
    );
}

ImagePicker.propTypes = {
    onChange: PropTypes.func,
    refId: PropTypes.shape({
        current: PropTypes.any
    }),
    setDirty: PropTypes.func,
    reset: PropTypes.bool,
    setReset: PropTypes.func,
    preview: PropTypes.array,
    setPreview: PropTypes.func,
    iCardDetails: PropTypes.object,
    setICardDetails: PropTypes.func,
    updatedImage: PropTypes.array,
    setUpdatedImage: PropTypes.func,
    deletedImage: PropTypes.array,
    setDeletedImage: PropTypes.func,
    imageType: PropTypes.string,
    ENV: PropTypes.object
};

export default ImagePicker;
