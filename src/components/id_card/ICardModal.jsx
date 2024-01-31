/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { green } from '@mui/material/colors';

import { Button, Dialog, Box, DialogActions, IconButton, List, TextField } from '@mui/material';
import { ImageListItem, Tooltip, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

import './styles.css';
import API from '../../apis';
import { tokens } from "../../theme";
import { Utility } from '../utility';

import dummyImg from "../assets/school_stuff.png";

const ICardModal = ({ iCardDetails, setICardDetails, handleSubmitDialog, openDialog, setOpenDialog }) => {
    const [imageFile, setImageFile] = useState([]);
    const formClassesInRedux = useSelector(state => state.allFormClasses);
    const formSectionsInRedux = useSelector(state => state.allFormSections);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isMobile = useMediaQuery("(max-width:480px)");
    const isTab = useMediaQuery("(max-width:920px)");
    let uploadedImages = [];
    const { findById } = Utility();

    const className = findById(iCardDetails?.class, formClassesInRedux?.listData)?.class_name;
    const sectionName = findById(iCardDetails?.section, formSectionsInRedux?.listData)?.name;
    console.log('imageFile=>', imageFile)
    useEffect(() => {
        API.SchoolAPI.getDetailsForICard()
            .then(data => {
                if (data.status === 'Success') {
                    console.log(data.data, 'school data');
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
    }, []);
    console.log(iCardDetails, 'formatted details in modal')


    const readImageFiles = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            uploadedImages.push(reader.result);
            setImageFile([
                ...uploadedImages
            ]);
        }
        reader.readAsDataURL(file);
    };
    useEffect(() => {
        if (iCardDetails?.Student)
            readImageFiles(iCardDetails.Student[0]);
    }, [iCardDetails?.Student])


    // const handleSubmit = () => {
    //     try {
    //         let datevar = new Date();
    //         setOpenDialog(false);

    //         //using jsPDF library to generate pdf file
    //         let doc = new jsPDF();
    //         doc.text(docText, 15, 20);
    //         // Add new page
    //         doc.addPage();
    //         doc.text(docText2, 15, 20);

    //         doc.setFont("times");
    //         doc.setFontType("italic");
    //         doc.setTextColor(0, 0, 255);
    //         doc.text(`${getLocalStorage("auth")?.username}\n${datevar.toLocaleDateString()}`, 130, 180);
    //         let output = doc.output();

    //         handleSubmitDialog("agreement", `${getLocalStorage("auth")?.username}_Agreement${Math.ceil(Math.random() * 1000)}.pdf`, btoa(output));
    //     } catch (error) {
    //         throw error;
    //     }
    //     finally {
    //         setTimeout(() => {
    //             location.reload();
    //         }, 2000);
    //     }
    // };

    return (
        <Dialog
            fullScreen={fullScreen}
            open={openDialog}
            aria-labelledby="responsive-dialog-title"
            id="dialog"
        >
            <Card sx={{ width: '340px' }}>
                <Box
                    sx={{
                        display: "grid", gridTemplateColumns: '0.3fr 1fr',
                        backgroundColor: colors.blueAccent[500], color: '#f6f6f2', borderRadius: '4px', margin: '8px 6px'
                    }}
                >
                    <Avatar sx={{
                        bgcolor: green[500], height: '50px', width: '50px', justifySelf: 'center', alignSelf: 'center'
                    }}
                        aria-label="student-id-card">
                        Logo
                    </Avatar>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <p className='heading-text' style={{ textAlign: "left", fontSize: '16px', marginBottom: '2px' }}>
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
                    image={imageFile}
                    alt="student-image"
                    sx={{
                        height: 140, width: 120, margin: '10px auto', border: '5px solid blue',
                        boxShadow: "3px 3px 8px #043927"
                    }}
                />
                <CardContent sx={{ paddingTop: '0' }}>
                    <List sx={{ width: '100%', padding: '0', bgcolor: 'background.paper' }}>
                        <ListItem sx={{ padding: '0 16px' }}>
                            <ListItemText
                                primary={iCardDetails?.firstname && iCardDetails?.lastname &&
                                    `${iCardDetails.firstname} ${iCardDetails.lastname}`}
                                primaryTypographyProps={{
                                    fontWeight: "400", fontSize: "14px", letterSpacing: "0.8px", textTransform: "capitalize",
                                    textAlign: 'center'
                                }}
                            />
                        </ListItem>
                        <ListItem sx={{ padding: "0 16px" }}>
                            <ListItemText
                                primary={iCardDetails?.session}
                                primaryTypographyProps={{
                                    fontWeight: "400", fontSize: "14px", letterSpacing: "0.8px", textTransform: "capitalize",
                                    textAlign: 'center'
                                }}
                            />
                        </ListItem>

                        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "10px" }}>
                            <span className='heading-text'> Father's Name: </span>
                            <span className='normal-text'> {iCardDetails.father_name ? iCardDetails.father_name : ''} </span>

                            <span className='heading-text'>Class:</span>
                            <span className='normal-text'>{className ? `${className} ${sectionName}` : ''}</span>

                            <span className='heading-text'>DOB:</span>
                            <span className='normal-text'>{iCardDetails.dob ? iCardDetails.dob.format('YYYY-MM-DD') : ''}</span>

                            <span className='heading-text'>Phone:</span>
                            <span className='normal-text'>{iCardDetails.contact_no ? iCardDetails.contact_no : ''}</span>

                            {/* <span style={{ fontWeight: "700", fontSize: "14px", letterSpacing: "0.8px", textAlign: "end" }}>Address:</span>
                            <span style={{ fontWeight: "400", fontSize: "14px", letterSpacing: "0.8px" }}>
                                O, 44, Shastri Nagar, Izatnagar, Bareilly, Uttar Pradesh 243122</span> */}
                        </Box>
                    </List>
                </CardContent>

                {/* <ImageListItem sx={{ gridColumn: 'span 2' }}>
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
                        src={imageFile}
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
                </ImageListItem> */}
                <Box sx={{}}>

                    <TextField
                        accept="image/*, application/pdf"
                        label="Upload Digital Signature"
                        value={undefined}
                        size="small"
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
                                        onChange={e => {
                                            console.log(e, 'image-path');
                                            setImageFile(e.target.files);
                                        }}
                                    />
                                </IconButton>
                            )
                        }}
                        sx={{ m: 1, outline: "none", width: "45%", textAlign: 'end' }}
                    />
                    <p style={{ fontWeight: "700", fontSize: "14px", letterSpacing: "0.8px", margin: "0 45px", textAlign: 'end' }}> Principal </p>
                </Box>
            </Card>
            <DialogActions sx={{ padding: '8px 12px' }}>
                <Button color='info' variant='outlined'>
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
}

export default ICardModal;
