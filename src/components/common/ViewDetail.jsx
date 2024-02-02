import { Card, CardContent, CardMedia, Typography, Grid, Divider, CardHeader, Avatar, Box } from '@mui/material';

import { Utility } from '../utility';
import { useSelector } from "react-redux";

const ENV = import.meta.env;

const ViewDetail = ({ detail = null, countryData, stateData, cityData }) => {
    const formSectionsInRedux = useSelector(state => state.allFormSections);
    const formClassesInRedux = useSelector(state => state.allFormClasses);
    const { findById, appendSuffix } = Utility();

    const countryName = findById(detail?.addressData?.country, countryData)?.name;
    const stateName = findById(detail?.addressData?.state, stateData)?.name;
    const cityName = findById(detail?.addressData?.city, cityData)?.name;
    const sectionName = findById(detail?.studentData?.section, formSectionsInRedux?.listData)?.name;
    const className = findById(detail?.studentData?.class, formClassesInRedux?.listData)?.class_name;
    console.log('detail=>', detail);

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{ background: "darkcyan" }} aria-label="recipe">
                        Yo
                    </Avatar>
                }
                title={<Typography variant="h3" component="h2" sx={{ fontWeight: 'bold' }}>Student Details</Typography>}
                sx={{ backgroundColor: "lightblue", margin: "5px", borderRadius: "5px" }}
            />
            <CardContent>
                <CardMedia
                    component="img"
                    height="230"
                    image={`${ENV.VITE_BASE_URL}/get-image/${detail?.imageData[0]?.image_src}`}
                    alt={detail?.studentData?.firstname}
                    sx={{ width: "200px", float: "left", margin: "20px", border: "1px dotted black" }}
                />
                <Box >
                    <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 'bold', fontSize: "30px" }}>
                        Name : {detail?.studentData?.firstname} {detail?.studentData?.lastname}
                    </Typography>
                    <Divider sx={{ marginBottom: "20px" }} />
                    <Typography gutterBottom variant="body1" component="p" sx={{ fontWeight: "500", fontSize: "20px" }}>
                        Class : {className ? appendSuffix(className) : ""} {sectionName}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="p" sx={{ fontWeight: "500", fontSize: "20px" }}>
                        Blood Group : {detail?.studentData?.blood_group}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="p" sx={{ fontWeight: "500", fontSize: "20px" }}>
                        Birth Date : {detail?.studentData?.dob}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="p" sx={{ fontWeight: "500", fontSize: "20px" }}>
                        Addmission Date : {detail?.studentData?.admission_date}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="p" sx={{ fontWeight: "500", fontSize: "20px" }}>
                        Address : {detail?.addressData?.street}, {detail?.addressData?.landmark}, {cityName}, {stateName}, {countryName} - {detail?.addressData?.zipcode}
                    </Typography>
                </Box>
                <Divider sx={{ margin: "20px" }} />
                <Box sx={{ display: 'flex', justifyContent: "space-between", marginLeft: "20px" }}>
                    <Box>
                        {detail?.studentData?.father_name &&
                            <Typography gutterBottom variant="body1" component="p" sx={{ fontWeight: "500", fontSize: "20px" }}>
                                Father Name : {detail?.studentData?.father_name}
                            </Typography>
                        }{detail?.studentData?.mother_name &&
                            <Typography gutterBottom variant="body1" component="p" sx={{ fontWeight: "500", fontSize: "20px" }}>
                                Mother Name : {detail?.studentData?.mother_name}
                            </Typography>
                        }{detail?.studentData?.guardian &&
                            <Typography gutterBottom variant="body1" component="p" sx={{ fontWeight: "500", fontSize: "20px" }}>
                                Guardian : {detail?.studentData?.guardian}
                            </Typography>
                        }
                        <Typography gutterBottom variant="body1" component="p" sx={{ fontWeight: "500", fontSize: "20px" }}>
                            Phone : {detail?.studentData?.contact_no}
                        </Typography>
                        <Typography gutterBottom variant="body1" component="p" sx={{ fontWeight: "500", fontSize: "20px" }}>
                            Email : {detail?.studentData?.email}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography gutterBottom variant="body1" component="p" sx={{ fontWeight: "500", fontSize: "20px" }}>
                            Religion : {detail?.studentData?.religion}
                        </Typography>
                        <Typography gutterBottom variant="body1" component="p" sx={{ fontWeight: "500", fontSize: "20px" }}>
                            Caste Group : {detail?.studentData?.caste_group}
                        </Typography>
                        <Typography gutterBottom variant="body1" component="p" sx={{ fontWeight: "500", fontSize: "20px" }}>
                            Gender : {detail?.studentData?.gender}
                        </Typography>
                    </Box>
                    <Box></Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ViewDetail;