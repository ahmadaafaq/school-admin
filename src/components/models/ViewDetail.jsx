/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { Card, CardContent, CardMedia, Typography, Divider, CardHeader, Avatar, Box,IconButton } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { Utility } from '../utility';
import { useSelector } from "react-redux";

import './styles.css';

const ViewDetail = ({ detail = null, countryData, stateData, cityData, onClose = null }) => {
    console.log('detail=>', detail);
    const formSectionsInRedux = useSelector(state => state.allFormSections);
    const formClassesInRedux = useSelector(state => state.allFormClasses);

    const { findById, appendSuffix } = Utility();

    const countryName = findById(detail?.addressData?.country, countryData)?.name;
    const stateName = findById(detail?.addressData?.state, stateData)?.name;
    const cityName = findById(detail?.addressData?.city, cityData)?.name;
    const sectionName = findById(detail?.studentData?.section, formSectionsInRedux?.listData)?.name;
    const className = findById(detail?.studentData?.class, formClassesInRedux?.listData)?.class_name;

    console.log("first", detail?.studentData?.session);

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{ background: "darkcyan" }} aria-label="recipe">
                        i
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings" onClick={onClose} sx={{padding:"13px"}}>
                      <CloseOutlinedIcon />
                    </IconButton>
                  }
                title={<Typography variant="h3" component="h2" sx={{ fontWeight: 'bold' }}>Student Details</Typography>}
                sx={{ backgroundColor: "lightblue", margin: "5px", borderRadius: "5px" }}

            />
            {/* <CardMedia
                component="img"
                height="200"
                image="path/to/student/image"
                alt={detail?.studentData?.firstname}
                sx={{ width: "200px", float: "left", margin: "20px", border: "1px dotted black" }}
            /> */}
            <CardContent>
                <CardMedia
                    component="img"
                    height="230"
                    image="path/to/student/image"
                    alt={detail?.studentData?.firstname}
                    sx={{ width: "200px", float: "left", margin: "20px", border: "1px dotted black" }}
                />
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "10px" }}>

                    <span className='heading-text1' >Session:</span>
                    <span className='normal-text1'>{detail?.studentData?.session}</span>

                    <span className='heading-text1' >Name:</span>
                    <span className='normal-text1'>{detail?.studentData?.firstname} {detail?.studentData?.lastname}</span>

                    <span className='heading-text1'>Class:</span>
                    <span className='normal-text1'>{className ? appendSuffix(className) : ""} {sectionName}</span>

                    <span className='heading-text1'>Age:</span>
                    <span className='normal-text1'>{detail?.studentData?.age}</span>

                    <span className='heading-text1'>DOB:</span>
                    <span className='normal-text1'>{detail?.studentData?.dob}</span>

                    <span className='heading-text1'>Addmission Date:</span>
                    <span className='normal-text1'>{detail?.studentData?.admission_date}</span>

                    <span className='heading-text1'>Blood Group:</span>
                    <span className='normal-text1'>{detail?.studentData?.blood_group}</span>

                    <span className='heading-text1'>Address:</span>
                    <span className='normal-text1'>{detail?.addressData?.street}, {detail?.addressData?.landmark}, {cityName}, {stateName}, {countryName} - {detail?.addressData?.zipcode}</span>
                </Box>
                <Divider sx={{ margin: "10px" }} />
                <Box sx={{ display: "grid", gridTemplateColumns: "5fr 5.5fr", gap: "10px", margin: "10px" }} >
                    <Box>
                        {detail?.studentData?.father_name &&
                            <Box sx={{ display: "grid", gridTemplateColumns: "5fr 5.5fr", gap: "10px" }}>
                                <span className='heading-text1' > Father Name :</span>
                                <span className='normal-text1'>{detail?.studentData?.father_name}</span>
                            </Box>
                        }{detail?.studentData?.mother_name &&
                            <Box sx={{ display: "grid", gridTemplateColumns: "5fr 5.5fr", gap: "10px" }}>
                                <span className='heading-text1' >Mother Name :</span>
                                <span className='normal-text1'>{detail?.studentData?.mother_name}</span>
                            </Box>
                        }{detail?.studentData?.guardian &&
                            <Box sx={{ display: "grid", gridTemplateColumns: "5fr 5.5fr", gap: "10px" }}>
                                <span className='heading-text1' >Guardian :</span>
                                <span className='normal-text1'>{detail?.studentData?.guardian}</span>
                            </Box>
                        }
                        <Box sx={{ display: "grid", gridTemplateColumns: "5fr 5.5fr", gap: "10px" }}>
                            <span className='heading-text1' >Phone :</span>
                            <span className='normal-text1'>{detail?.studentData?.contact_no}</span>
                        </Box>
                        <Box sx={{ display: "grid", gridTemplateColumns: "5fr 5.5fr", gap: "10px" }}>
                            <span className='heading-text1' >Email :</span>
                            <span className='normal-text1'>{detail?.studentData?.email}</span>
                        </Box>
                    </Box>
                    <Box>
                        <Box sx={{ display: "grid", gridTemplateColumns: "5fr 5.5fr", gap: "10px" }}>
                            <span className='heading-text1' >Religion :</span>
                            <span className='normal-text1'>{detail?.studentData?.religion}</span>
                        </Box>
                        <Box sx={{ display: "grid", gridTemplateColumns: "5fr 5.5fr", gap: "10px" }}>
                            <span className='heading-text1' >Caste Group :</span>
                            <span className='normal-text1'>{detail?.studentData?.religion}</span>
                        </Box>
                        <Box sx={{ display: "grid", gridTemplateColumns: "5fr 5.5fr", gap: "10px" }}>
                            <span className='heading-text1' >Gender :</span>
                            <span className='normal-text1'>{detail?.studentData?.gender}</span>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ViewDetail;