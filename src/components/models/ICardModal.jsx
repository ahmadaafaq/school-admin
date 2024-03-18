/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from "prop-types";
import { usePDF } from 'react-to-pdf';

import { Avatar, Box, Button, Card, CardContent, CardMedia, Dialog, DialogActions, Grid, IconButton } from '@mui/material';
import { List, ListItem, ListItemText, TextField, Tooltip, useMediaQuery } from '@mui/material';
import { green } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

import './styles.css';
import API from '../../apis';

import { tokens } from "../../theme";
import { Utility } from '../utility';

const ENV = import.meta.env;

const ICardModal = ({ iCardDetails, setICardDetails, openDialog, setOpenDialog }) => {
    const [signatureImage, setSignatureImage] = useState([]);
    const [signatureImageChange, setSignatureImageChange] = useState([]);
    const formClassesInRedux = useSelector(state => state.schoolClasses);
    const formSectionsInRedux = useSelector(state => state.schoolSections);

    const studentImageRef = useRef([]);
    const { toPDF, targetRef } = usePDF({ filename: 'document.pdf' });

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const stateName = document.getElementById("state");
    const cityName = document.getElementById("city");
    // const isMobile = useMediaQuery("(max-width:480px)");
    // const isTab = useMediaQuery("(max-width:920px)");
    const { appendSuffix, findById } = Utility();

    const className = findById(iCardDetails?.class, formClassesInRedux?.listData)?.class_name;
    const sectionName = findById(iCardDetails?.section, formSectionsInRedux?.listData)?.section_name;

    const readImageFiles = (file, onReadComplete) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            onReadComplete(reader.result);
        }
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        if (iCardDetails?.Student) {        //this condition will run when creating image
            readImageFiles(iCardDetails.Student[0], result => {
                studentImageRef.current.push(result);
            });
        } else if (iCardDetails?.imageData) {    //this condition will run when populating data
            const imageUrl = `${ENV.VITE_BASE_URL}/get-uploaded-image/${iCardDetails?.imageData[0]?.image_src}`;
            if (!studentImageRef.current.includes(imageUrl)) {      //it was concatenating the same url multiple times
                studentImageRef.current.push(imageUrl);
            }
        }
        if (signatureImage?.length) {
            readImageFiles(signatureImage[0], setSignatureImageChange);
        }
    }, [iCardDetails.Student, iCardDetails.imageData, signatureImage, signatureImageChange]);

    useEffect(() => {
        if (openDialog) {
            API.SchoolAPI.getDetailsForICard()
                .then(data => {
                    if (data.status === 'Success') {
                        setICardDetails({
                            ...iCardDetails,
                            schoolData: data.data[0]
                        });
                    } else {
                        console.log("Error Fetching School Data, Please Try Again");
                    }
                })
                .catch(err => {
                    console.log("Error Fetching SchoolData:", err);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openDialog]);

    return (
        <Dialog
            fullScreen={fullScreen}
            open={openDialog}
            aria-labelledby="responsive-dialog-title"
            id="dialog"
            sx={{
                "&. MuiDialog-container": {
                    height: "102% !important"
                }
            }}
        >
            <Card ref={targetRef} sx={{ width: '350px' }}>
                <Box
                    sx={{
                        display: "grid", gridTemplateColumns: '0.3fr 1fr',
                        backgroundColor: colors.blueAccent[500], color: '#f6f6f2', borderRadius: '4px', margin: '5px'
                    }}
                >
                    <Avatar sx={{
                        bgcolor: green[500], height: '50px', width: '50px', justifySelf: 'center', alignSelf: 'center'
                    }}
                        aria-label="student-id-card">
                        Logo
                    </Avatar>
                    <div style={{ display: 'flex', flexWrap: "wrap" }}>
                        <p className='heading-text' style={{ textAlign: "left", fontSize: '16px', marginBottom: '2px', marginTop: "5px" }}>
                            {iCardDetails?.schoolData?.name}
                        </p>
                        <p className='normal-text' style={{ margin: '0' }}>
                            {iCardDetails?.schoolData?.registered_by}
                        </p>
                    </div>
                    <p className='normal-text' style={{ gridColumn: 'span 2', textAlign: 'center' }}>
                        {iCardDetails?.schoolData ? `${iCardDetails.schoolData.street}
                     ${iCardDetails.schoolData.landmark} ${iCardDetails.schoolData.city} ${iCardDetails.schoolData.state}
                      ${iCardDetails.schoolData.country}-${iCardDetails.schoolData.zipcode}` : ''}
                    </p>
                </Box>
                <CardMedia
                    component="img"
                    className='student-image'
                    image={studentImageRef?.current[0]}
                    alt="student-image"
                />
                <CardContent sx={{ padding: '0 2px' }}>
                    <List sx={{ width: '100%', padding: '0', bgcolor: 'background.paper' }}>
                        <ListItem sx={{ padding: '0 2px' }}>
                            <ListItemText
                                className='primary-text'
                                primary={iCardDetails?.firstname && iCardDetails?.lastname &&
                                    `${iCardDetails.firstname} ${iCardDetails.lastname}`}
                                primaryTypographyProps={{
                                    fontSize: '16px', fontWeight: '700', color: colors.blueAccent[500]
                                }}
                            />
                        </ListItem>
                        <ListItem sx={{ padding: "0 2px" }}>
                            <ListItemText
                                className='primary-text'
                                primary={iCardDetails?.session}
                                primaryTypographyProps={{
                                    fontSize: '16px', fontWeight: '700', color: colors.blueAccent[500], margin: '-6px 0 8px 0'
                                }}
                            />
                        </ListItem>

                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', columnGap: '10px', rowGap: '5px' }}>
                            <span className='heading-text'> Father&apos;s Name: </span>
                            <span className='normal-text'> {iCardDetails.father_name ? iCardDetails.father_name : iCardDetails.guardian} </span>

                            <span className='heading-text'>Class:</span>
                            <span className='normal-text'>{className ? `${appendSuffix(className)} ${sectionName}` : ''}</span>

                            <span className='heading-text'>DOB:</span>
                            <span className='normal-text'>{iCardDetails.dob ? iCardDetails.dob.format('YYYY-MM-DD') : ''}</span>

                            <span className='heading-text'>Phone:</span>
                            <span className='normal-text'>{iCardDetails.contact_no ? iCardDetails.contact_no : ''}</span>

                            <span className='heading-text'>Address:</span>
                            <span className='normal-text'>{`${iCardDetails?.street} ${iCardDetails?.landmark} ${iCardDetails?.studentCity ? iCardDetails.studentCity : cityName?.innerText}
                            ${iCardDetails?.studentState ? iCardDetails.studentState : stateName?.innerText} India-${iCardDetails?.zipcode}`}</span>
                        </Box>
                    </List>
                </CardContent>

                <Grid container>
                    {/* Column 1 - Image Picker */}
                    {signatureImageChange.length ? null :
                        <Grid item xs={12}>
                            <TextField
                                accept="image/*, application/pdf"
                                label="Upload Digital Signature"
                                value={undefined}
                                size="small"
                                sx={{ m: 1, ml: 2, outline: "none", width: '41%' }}
                                InputProps={{
                                    startAdornment: (
                                        <IconButton component="label" sx={{ width: "90%" }}>
                                            <AddPhotoAlternateIcon />
                                            <input
                                                hidden
                                                type="file"
                                                name="file"
                                                onChange={e => setSignatureImage(e.target.files)}
                                            />
                                        </IconButton>
                                    )
                                }}
                            />
                        </Grid>}
                    {/* Column 2 - Image */}
                    {!signatureImageChange.length ? null :
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', position: 'relative' }}>
                            <IconButton
                                sx={{
                                    position: "absolute",
                                    left: "86%",
                                    '@media screen and (max-width: 920px)': {
                                        left: '76%',
                                    },
                                    '@media screen and (max-width: 480px)': {
                                        left: '59%',
                                    },
                                    top: "6%"
                                }}
                                onClick={() => {
                                    setSignatureImage([]);
                                    setSignatureImageChange([]);
                                }}
                            >
                                <Tooltip title="DELETE">
                                    <HighlightOffOutlinedIcon sx={{
                                        fontSize: "16px",
                                        color: "#002147",
                                        "&:hover": {
                                            color: "red", fontSize: "20px", transition: "all 0.3s ease-in-out"
                                        }
                                    }}
                                    />
                                </Tooltip>
                            </IconButton>
                            <CardMedia
                                component="img"
                                image={signatureImageChange}
                                alt='principal-signature'
                                sx={{
                                    height: '50px', width: '130px', margin: '10px 20px 0 0'
                                }}
                            />
                        </Grid>}
                    {/* Row 2 - Text */}
                    <Grid item xs={12}>
                        <p className='heading-text' style={{ margin: '0 50px 20px 0', fontSize: '15px' }}> Principal </p>
                    </Grid>
                </Grid>
            </Card>
            <DialogActions sx={{ padding: '8px 12px' }}>
                <Button color='info' variant='outlined'
                    onClick={() => toPDF()}
                >
                    Download
                </Button>
                <Button color='warning' variant='outlined'
                    onClick={() => setOpenDialog(false)}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog >
    );
};

ICardModal.propTypes = {
    iCardDetails: PropTypes.object,
    setICardDetails: PropTypes.func,
    setOpenDialog: PropTypes.func,
    openDialog: PropTypes.bool
};

export default ICardModal;
