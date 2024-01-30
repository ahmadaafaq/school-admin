import { Card, CardContent, CardMedia, Typography, Grid, Divider, CardHeader, Avatar, Box } from '@mui/material';

import { Utility } from '../utility';
import { useSelector } from "react-redux";

const ViewDetail = ({ detail = null, countryData, stateData, cityData }) => {
    console.log('detail=>', detail);
    const formSectionsInRedux = useSelector(state => state.allFormSections);
    const formClassesInRedux = useSelector(state => state.allFormClasses);

    const { findById } = Utility();

    const countryName = findById(detail?.addressData?.country, countryData)?.name;
    const stateName = findById(detail?.addressData?.state, stateData)?.name;
    const cityName = findById(detail?.addressData?.city, cityData)?.name;
    const sectionName = findById(detail?.studentData?.section, formSectionsInRedux?.listData)?.name;
    const className = findById(detail?.studentData?.class, formClassesInRedux?.listData)?.class_name;

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{ background: "darkcyan" }} aria-label="recipe">
                        i
                    </Avatar>
                }
                title={<Typography variant="h3" component="h2" sx={{ fontWeight: 'bold' }}>Student Details</Typography>}
                sx={{ backgroundColor: "lightblue", margin: "5px", borderRadius: "5px" }}
            />
            <CardMedia
                component="img"
                height="200"
                image="path/to/student/image"
                alt={detail?.studentData?.firstname}
                sx={{ width: "200px", float: "left", margin: "20px", border: "1px dotted black" }}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 'bold', fontSize: "30px" }}>
                    Name : {detail?.studentData?.firstname} {detail?.studentData?.lastname}
                </Typography>
                <Divider />
                <Typography gutterBottom variant="body1" component="p" sx={{ fontWeight: "500", fontSize: "20px" }}>
                    Class : {className}th {sectionName}
                </Typography>
                {/* <Typography gutterBottom variant="body1" component="p" sx={{ fontWeight: "500", fontSize: "20px" }}>
                    Roll No. : {detail?.studentData.roll_no}
                </Typography>           */}
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
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
                    <Box>
                        <Typography gutterBottom variant="body1" component="p" sx={{ fontWeight: "500", fontSize: "20px" }}>
                            Father Name : {detail?.studentData?.father_name}
                        </Typography>
                        <Typography gutterBottom variant="body1" component="p" sx={{ fontWeight: "500", fontSize: "20px" }}>
                            Mother Name : {detail?.studentData?.mother_name}
                        </Typography>
                        <Typography gutterBottom variant="body1" component="p" sx={{ fontWeight: "500", fontSize: "20px" }}>
                            Phone : {detail?.studentData?.contact_no}
                        </Typography>
                        <Typography gutterBottom variant="body1" component="p" sx={{ fontWeight: "500", fontSize: "20px" }}>
                            Email : {detail?.studentData?.email}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography gutterBottom variant="body1" component="p" sx={{ fontWeight: "500", fontSize: "20px" }}>
                            Gurdian : {detail?.studentData?.gurdian}
                        </Typography>
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