/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import React, { useState, useEffect } from "react";
import { read, utils, writeFile } from 'xlsx';
import { useSelector } from "react-redux";

import { Box, Divider, IconButton, Typography } from "@mui/material";
import { Button, Dialog, TextField, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';

import API from "../../apis"
import { Utility } from "../utility";
import Toast from "../common/Toast";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { tokens, themeSettings } from "../../theme";

import formBg from "../assets/formBg.png";

const ENV = import.meta.env;

const ImportComponent = ({ openDialog, setOpenDialog }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isMobile = useMediaQuery("(max-width:480px)");
    const isTab = useMediaQuery("(max-width:920px)");

    //form component starts
    const [importedFile, setImportedFile] = useState(undefined);
    const [students, setStudents] = useState([]);
    const [fileName, setFileName] = useState('');
    const selected = useSelector(state => state.menuItems.selected);
    const toastInfo = useSelector(state => state.toastInfo);

    const { typography } = themeSettings(theme.palette.mode);
    // const { isObjEmpty, getLocalStorage } = Utility();

    const handleSubmit = (event) => {
        event.preventDefault();
        handleImport();
        console.log("imported submit file", importedFile)
    }

    const handleImport = () => {
        if (importedFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;
                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    console.log(">>>>>", rows)
                    setStudents(rows)
                }
            }
            reader.readAsArrayBuffer(importedFile);
        }
    }

    useEffect(() => {
        if (students?.length) {
            students.forEach((student) => {
                const username = student?.father_name || student?.mother_name ||
                    student?.guardian;
                const password = `${username}${ENV.VITE_SECRET_CODE}`;

                API.UserAPI.register({
                    username: username,
                    password: password,
                    email: student?.email,
                    contact_no: student?.contact_no,
                    role: 5,
                    designation: 'parent',
                    status: 'active'
                })
                    .then(({ data: user }) => {
                        if (user?.status === 'Success') {
                            API.StudentAPI.createStudent({
                                ...students,
                                parent_id: user.data.id
                            })
                                .then(response => {
                                    console.log("imopirt model response:", response);
                                })
                                .catch(error => {
                                    console.error("API error:", error);
                                });
                        }
                    })
                    .catch(err => {
                        console.error("API error:", err);
                    });
            })
        }
    }, [students?.length]);

    console.log("studentss...", importedFile)

    return (
        <div >
            <Dialog
                fullScreen={fullScreen}
                open={openDialog}
                // onClose={setOpenDialog(false)}
                aria-labelledby="responsive-dialog-title"
                sx={{
                    top: isMobile ? "33%" : isTab ? "25%" : "20%", height: isMobile ? "49%" : isTab ? "39%" : "60%",
                    "& .MuiPaper-root": {
                        width: "100%",
                        backgroundImage: theme.palette.mode == "light" ? `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url(${formBg})`
                            : `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${formBg})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover"
                    },
                }}
            >
                <Typography
                    fontFamily={typography.fontFamily}
                    fontSize={typography.h2.fontSize}
                    color={colors.grey[100]}
                    fontWeight="600"
                    display="inline-block"
                    textAlign="center"
                    marginTop="10px"
                >
                    {`Import ${selected}s`}
                </Typography>
                <Box>
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column"}}>
                        <TextField
                            name="importedFile"
                            label="Upload Your File"
                            value={importedFile}
                            size="medium"
                            InputProps={{
                                startAdornment: (
                                    <IconButton component="label" sx={{ width: "99%" }}>
                                        <UploadFileIcon />
                                        <input
                                            hidden
                                            type="file"
                                            name="importedFile"
                                            onChange={event => {
                                                const file = event.target.files[0];
                                                console.log('importedFile=>', file)
                                                setImportedFile(file);
                                                setFileName(file.name);
                                            }}
                                        />
                                    </IconButton>
                                )
                            }}
                            sx={{ m: "8px auto", outline: "none", width: "40%" }}
                        />
                    <div style={{ lineHeight: "30px", gridColumn: "span 2" , display:"flex", fontWeight:"600",marginLeft:"30%" }}>Your Selected File: <div style={{fontWeight:"900", marginLeft:"20px", color:"blue"}}>{fileName}</div> </div>

                        <Divider />
                        <Box display="flex" justifyContent="end" p="20px">
                            <Button color="error" variant="contained" sx={{ mr: 3 }}
                                onClick={() => setOpenDialog(false)}>
                                Cancel
                            </Button>
                            <Button type="submit"
                                color="success" variant="contained"
                            >
                                Submit
                            </Button>
                            <Toast alerting={toastInfo.toastAlert}
                                severity={toastInfo.toastSeverity}
                                message={toastInfo.toastMessage}
                            />
                        </Box>
                    </form>
                </Box>
                {/* {loading === true ? <Loader /> : null} */}
            </Dialog>
        </div >
    );
}

export default ImportComponent;
