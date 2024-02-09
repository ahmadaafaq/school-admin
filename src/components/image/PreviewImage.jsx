/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { useEffect } from "react";
import PropTypes from "prop-types";

import { IconButton, ImageList, ImageListItem, Tooltip, useMediaQuery } from "@mui/material";
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

import Loader from "../common/Loader";

const PreviewImage = ({
    formik,
    preview,
    setPreview,
    deletedImage = [],
    setDeletedImage,
    setDirty,
    imageFiles,
    imageType,
    ENV,
    setInitialState,
    image,
    setImage
}) => {
    const isMobile = useMediaQuery("(max-width:480px)");
    const isTab = useMediaQuery("(max-width:920px)");
    // let uploadedImages = [];

    useEffect(() => {
        const srcArray = [];
        console.log('sssu[datedValues', image)
        if (image) {
            image.map(img => {
                if (img.image_src) {
                    srcArray.push(`${ENV.VITE_BASE_URL}/get-image/${img.image_src}`);
                }
            });
        }
        setPreview([
            ...srcArray,         //We are not doing ...preview because in imagePicker file we have already
        ]);
        setInitialState(image);
    }, [image?.length]);

    // const readImageFiles = async (file) => {
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //         // uploadedImages.push(reader.result);



    //         // setPreview([
    //         //     ...srcArray,         //We are not doing ...preview because in imagePicker file we have already
    //         //     ...uploadedImages   //done manual merge of formik.values in onchange of input
    //         // ]);
    //     }
    //     reader.readAsDataURL(file);
    // };

    useEffect(() => {
        console.log('USE EFFECTsss 1');
        if (imageFiles) {
            console.log('imageFilessss UEF 1', imageFiles);

            const prev = [];
            const srcArray = [];

            let arrayOfImages = Array.from(imageFiles);
            console.log('arrayOfImagessss', arrayOfImages);
            for (const file of arrayOfImages) {
                prev.push(URL.createObjectURL(file));
            }


            console.log('new prevsss', prev);

            if (image) {
                image.map(img => {
                    if (img.image_src) {
                        srcArray.push(`${ENV.VITE_BASE_URL}/get-image/${img.image_src}`);
                    }
                });
            }
            // Merge the preview values with already populated values during update otherwise just show prev
            setPreview([
                ...srcArray,
                ...prev
            ]);
            // arrayOfImages.forEach(item => readImageFiles(item));
        }
    }, [imageFiles]);

    const handleDeleteClick = (item) => {
        const index = preview.indexOf(item);
        preview.splice(index, 1);
        if (image) {
            setDeletedImage([
                ...deletedImage,
                image[index]?.image_src,
            ]);
        }
        if (index > -1) {                   // only splice 1 item from array when it is found
            if (image) {
                console.log('sssLength before', image.length)
                image.splice(index, 1);
                setInitialState({
                    ...image
                });
                setImage(image);
                console.log('sssLength after', image.length)
                console.log('sssdelete from updated', image);
            }
          
            // On update imageFiles is empty
            if (imageFiles) {
                console.log('indexsss=>', index);
                console.log('imageFilessss', imageFiles);
                console.log('previewsss', preview);
                const updatedFileList = Array.from(imageFiles);
                updatedFileList.splice(index, 1);
                console.log('updatedImgFilesss', updatedFileList);
                // eslint-disable-next-line react/prop-types
                formik.setFieldValue(imageType, updatedFileList);
            }
            setDirty(true);     //to enable the submit button
        }
    };

    console.log('sssLast length', image.length);

    return (
        <ImageList sx={{ width: "80%", height: "60%", overflow: "inherit", marginBottom: "8%" }}
            cols={3} rowHeight={isMobile ? 80 : isTab ? 160 : 220} gap={8}>
            {preview ? preview.map((item, index) => (
                <ImageListItem key={index}>
                    <IconButton
                        sx={{
                            position: "absolute",
                            left: "87%",
                            '@media screen and (max-width: 920px)': {
                                left: '77%',
                            },
                            '@media screen and (max-width: 480px)': {
                                left: '60%',
                            },
                            top: "-2%"
                        }}
                        onClick={() => handleDeleteClick(item)}
                    >
                        <Tooltip title="DELETE">
                            <HighlightOffOutlinedIcon sx={{
                                color: "#002147",
                                "&:hover": {
                                    color: "red", fontSize: "1.5rem", transition: "all 0.3s ease-in-out"
                                }
                            }}
                            />
                        </Tooltip>
                    </IconButton>
                    <img
                        src={item}
                        alt="This image is not available"
                        loading="lazy"
                        style={{
                            objectFit: "cover",
                            height: "100%",
                            width: "100%",
                            borderRadius: isMobile ? "6px" : "12px",
                            boxShadow: "2px 2px 4px hsl(0, 0%, 30%)"
                        }}
                    />
                </ImageListItem>
            )) : <Loader />}
        </ImageList>
    );
}


PreviewImage.propTypes = {
    formik: PropTypes.shape({
        current: PropTypes.any
    }),
    setDirty: PropTypes.func,
    preview: PropTypes.array,
    setPreview: PropTypes.func,
    imageFiles: PropTypes.object,
    setInitialState: PropTypes.func,
    image: PropTypes.array,
    setImage: PropTypes.func,
    deletedImage: PropTypes.array,
    setDeletedImage: PropTypes.func,
    imageType: PropTypes.string,
    ENV: PropTypes.object
};

export default PreviewImage;
