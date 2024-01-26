/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */
import { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { green } from '@mui/material/colors';

import { Button, Dialog, Box, DialogActions, DialogContent, DialogTitle, Divider, List } from '@mui/material';
import { Checkbox, FormControlLabel, ListItem, ListItemText, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { tokens } from "../../theme";
import { Utility } from '../utility';
import dummyImg from "../assets/school_stuff.png";

const ICardModal = ({ handleSubmitDialog, openDialog, setOpenDialog }) => {
    // const [openDialog, setOpenDialog] = useState(showDialog);
    const [checked, setChecked] = useState(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isMobile = useMediaQuery("(max-width:480px)");
    const isTab = useMediaQuery("(max-width:920px)");
    const { getLocalStorage } = Utility();


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
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: green[500] }} aria-label="student-id-card">
                            Logo
                        </Avatar>
                    }
                    title="School Name"
                    subheader="RECG BY GOVT OF UP"
                    sx={{ backgroundColor: colors.blueAccent[500], borderRadius: '4px', margin: '8px 6px' }}
                />
                <CardMedia
                    component="img"
                    image={dummyImg}
                    alt="student-image"
                    sx={{
                        height: 140, width: 120, objectFit: 'contain', margin: '10px auto', border: '5px solid blue',
                        boxShadow: "3px 3px 8px #043927"
                    }}
                />
                <CardContent sx={{ paddingTop: '0' }}>
                    <List sx={{ width: '100%', padding: '0', bgcolor: 'background.paper' }}>
                        <ListItem sx={{ padding: '0 16px' }}>
                            <ListItemText
                                primary="Student Name"
                                primaryTypographyProps={{
                                    fontWeight: "400", fontSize: "14px", letterSpacing: "0.8px", textTransform: "capitalize",
                                    textAlign: 'center'
                                }}
                            />
                        </ListItem>
                        <ListItem sx={{ padding: "0 16px" }}>
                            <ListItemText
                                primary='2019-2020'
                                primaryTypographyProps={{
                                    fontWeight: "400", fontSize: "14px", letterSpacing: "0.8px", textTransform: "capitalize",
                                    textAlign: 'center'
                                }}
                            />
                        </ListItem>

                        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "10px" }}>
                            <span style={{ fontWeight: "700", fontSize: "14px", letterSpacing: "0.8px", textAlign: "end" }}> Father's Name: </span>
                            <span style={{ fontWeight: "400", fontSize: "14px", letterSpacing: "0.8px" }}> Gopala Radhakrishnan </span>

                            <span style={{ fontWeight: "700", fontSize: "14px", letterSpacing: "0.8px", textAlign: "end" }}>Class:</span>
                            <span style={{ fontWeight: "400", fontSize: "14px", letterSpacing: "0.8px" }}>KG B</span>

                            <span style={{ fontWeight: "700", fontSize: "14px", letterSpacing: "0.8px", textAlign: "end" }}>DOB:</span>
                            <span style={{ fontWeight: "400", fontSize: "14px", letterSpacing: "0.8px" }}>16/05/1999</span>

                            <span style={{ fontWeight: "700", fontSize: "14px", letterSpacing: "0.8px", textAlign: "end" }}>Phone:</span>
                            <span style={{ fontWeight: "400", fontSize: "14px", letterSpacing: "0.8px" }}>9560648715</span>

                            {/* <span style={{ fontWeight: "700", fontSize: "14px", letterSpacing: "0.8px", textAlign: "end" }}>Address:</span>
                            <span style={{ fontWeight: "400", fontSize: "14px", letterSpacing: "0.8px" }}>
                                O, 44, Shastri Nagar, Izatnagar, Bareilly, Uttar Pradesh 243122</span> */}
                        </Box>
                    </List>
                </CardContent>

                <Box sx={{ textAlign: 'end', width: '82%', padding: '10px', paddingTop: '20px' }}>
                    Principal
                </Box>
                <Box sx={{ backgroundColor: colors.blueAccent[500], borderRadius: '4px', padding: '16px', margin: '8px 6px' }}>
                    <span>
                        Address of school
                    </span>
                </Box>
            </Card>
            <DialogActions sx={{ justifyContent: "space-around" }}>
                <Button color='info' variant='outlined'>
                    Download
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ICardModal;
