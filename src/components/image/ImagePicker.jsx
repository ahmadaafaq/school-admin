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

import { ErrorMessage, useFormik } from "formik";
import { Box, FormHelperText, IconButton, TextField } from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import imageValidation from "./Validation";
import PreviewImage from "./PreviewImage";

const initialValues = {};
const ImagePicker = ({
    onChange,
    refId,
    setDirty,
    reset,
    setReset,
    preview,
    setPreview,
    updatedImage = [],
    setUpdatedImage,
    deletedImage = [],
    setDeletedImage,
    imageType,
    ENV,
    multiple = false
}) => {
    initialValues[`${imageType}`] = null;
    const [initialState, setInitialState] = useState(initialValues);

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: imageValidation,
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
        if (updatedImage?.length) {
            setInitialState(updatedImage);
        }
    }, [updatedImage?.length]);
    console.log(Object.keys(formik.errors), 'formik image');

    return (
        <Box m="10px">
            {(multiple) || (formik.values[`${imageType}`] === undefined || !formik.values[`${imageType}`]?.length) ? (
                <form ref={refId} encType="multipart/form-data">
                    <TextField
                        accept="image/*, application/pdf"
                        name={imageType}
                        label={`Upload ${imageType} Image`}
                        value={undefined}
                        size="small"
                        onBlur={formik.handleBlur}
                        InputProps={{
                            multiple: multiple,
                            startAdornment: (
                                <IconButton component="label" sx={{ width: "88%" }}>
                                    <AddPhotoAlternateIcon />
                                    <input
                                        hidden
                                        multiple={multiple}
                                        type="file"
                                        name="file"
                                        onChange={(event) => {
                                            const newFiles = Array.from(event.target.files); // Convert FileList to array
                                            // Check if formik.values[`${imageType}`] exists and is an array
                                            if (Array.isArray(formik.values[`${imageType}`])) {
                                                // Merge new files with existing files
                                                formik.setFieldValue(`${imageType}`, [
                                                    ...formik.values[`${imageType}`],
                                                    ...newFiles
                                                ]);
                                            } else {
                                                // Assign new files directly
                                                formik.setFieldValue(`${imageType}`, newFiles);
                                            }
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
            ) : null}
            {/* {Object.keys(formik.errors) ? (
                <p>
                    {formik.touched[`${imageType}`] && formik.errors[`${imageType}`]}
                </p>
            ) : null} */}
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
    updatedImage: PropTypes.array,
    setUpdatedImage: PropTypes.func,
    deletedImage: PropTypes.array,
    setDeletedImage: PropTypes.func,
    imageType: PropTypes.string,
    ENV: PropTypes.object,
    multiple: PropTypes.bool
};

export default ImagePicker;
