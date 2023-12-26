/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import React, { useState, useEffect } from "react";

import { Box, InputLabel, MenuItem, InputAdornment, IconButton, FormControl } from "@mui/material";
import { Button, Select, TextField, useMediaQuery } from "@mui/material";

import { useFormik } from "formik";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import API from "../../apis";
import userValidation from "./Validation";

const initialValues = {
    school_id: '',
    username: "",
    password: "",
    email: "",
    contact_no: "",
    role: "",
    gender: "",
    status: "inactive"
};

const UserFormComponent = ({
    onChange,
    refId,
    setDirty,
    reset,
    setReset,
    userId,
    updatedValues = null
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [updatePassword, setUpdatePassword] = useState({
        clicked: false,
        password: null
    });
    const [initialState, setInitialState] = useState(initialValues);
    const [schools, setSchools] = useState([]);

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isMobile = useMediaQuery("(max-width:480px)");
    const pwField = document.getElementById("pwField");

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: userValidation,
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
            if (pwField.disabled) {
                delete formik.values.password;
            }
            onChange({
                values: formik.values,
                validated: formik.isSubmitting
                    ? Object.keys(formik.errors).length === 0
                    : false
            });
        };
    };

    useEffect(() => {
        if (reset) {
            formik.resetForm();
            setReset(false);
        }
    }, [reset]);

    useEffect(() => {
        if (formik.dirty) {
            setDirty(true);
        }
    }, [formik.dirty]);

    useEffect(() => {
        if (updatedValues) {
            setInitialState(updatedValues);
            pwField.setAttribute("disabled", true);
            pwField.style.backgroundColor = "#777";
            setUpdatePassword({
                clicked: true
            });
        }
    }, [updatedValues]);

    useEffect(() => {
        const getSchools = () => {
            API.SchoolAPI.getAllSchools()
                .then(school => {
                    if (school?.status === 'Success') {
                        setSchools(school.data.list);
                    } else {
                        console.log("An Error Occurred, Please Try Again");
                    }
                })
                .catch(err => {
                    throw err;
                });
        };
        getSchools();
    }, []);

    const handleUpdatePassword = () => {
        if (updatePassword.clicked) {
            pwField.removeAttribute("disabled");
            pwField.style.backgroundColor = "rgba(255, 255, 255, 0.09)";
            pwField.focus();
            setUpdatePassword({
                clicked: false,
                password: formik.values.password
            });
            formik.values.password = "";
        } else {
            pwField.setAttribute("disabled", true);
            pwField.style.backgroundColor = "#777";
            setUpdatePassword({
                clicked: true
            });
            formik.values.password = updatePassword.password;
        };
    };

    return (
        <Box m="20px">
            {userId ? <Button type="button" color="primary" variant="contained"
                sx={{
                    position: isMobile ? "relative" : "absolute",
                    right: isMobile ? "0" : 30,
                    top: isMobile ? 98 : 110,
                    zIndex: isMobile ? 1 : 0
                }}
                onClick={handleUpdatePassword}
            >
                {updatePassword.clicked === true ? "Update" : "Cancel Update"} Password </Button> : null}
            <form ref={refId}>
                <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                    }}
                >
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        name="username"
                        label="Username*"
                        autoComplete="new-username"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        error={!!formik.touched.username && !!formik.errors.username}
                        helperText={formik.touched.username && formik.errors.username}
                        sx={{ gridColumn: "span 2", marginBottom: "20px" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        id="pwField"
                        label="Password*"
                        name="password"
                        type={showPassword ? "text" : "password"} // <-- This is where the pw toggle happens
                        autoComplete="new-password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={!!formik.touched.password && !!formik.errors.password}
                        helperText={formik.touched.password && formik.errors.password}
                        sx={{ gridColumn: "span 2" }}
                        InputProps={{ // <-- This is where the toggle button is added
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        onMouseDown={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <VisibilityOutlinedIcon /> :
                                            <VisibilityOffOutlinedIcon />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Email"
                        name="email"
                        autoComplete="new-email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={!!formik.touched.email && !!formik.errors.email}
                        helperText={formik.touched.email && formik.errors.email}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Contact Number*"
                        name="contact_no"
                        autoComplete="new-contact"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.contact_no}
                        error={!!formik.touched.contact_no && !!formik.errors.contact_no}
                        helperText={formik.touched.contact_no && formik.errors.contact_no}
                        sx={{ gridColumn: "span 2" }}
                    />
                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.gender && !!formik.errors.gender}
                    >
                        <InputLabel id="genderField">Gender</InputLabel>
                        <Select
                            variant="filled"
                            labelId="genderField"
                            label="Gender"
                            name="gender"
                            autoComplete="new-gender"
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value={"male"}>Male</MenuItem>
                            <MenuItem value={"female"}>Female</MenuItem>
                            <MenuItem value={"other"}>Other</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.school_id && !!formik.errors.school_id}
                    >
                        <InputLabel id="school_idField">School</InputLabel>
                        <Select
                            variant="filled"
                            labelId="school_idField"
                            label="School"
                            name="school_id"
                            autoComplete="new-school_id"
                            value={formik.values.school_id}
                            onChange={formik.handleChange}
                        >
                            {schools.map(item => (
                                <MenuItem value={item.id} name={item.name} key={item.name}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.role && !!formik.errors.role}
                    >
                        <InputLabel id="roleField">Role</InputLabel>
                        <Select
                            variant="filled"
                            labelId="roleField"
                            label="role"
                            name="role"
                            autoComplete="new-role"
                            value={formik.values.role}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value={"admin"}>Admin</MenuItem>
                            <MenuItem value={"sub-admin"}>Sub-Admin</MenuItem>
                            <MenuItem value={"staff"}>Staff</MenuItem>
                            <MenuItem value={"teacher"}>Teacher</MenuItem>
                            <MenuItem value={"parent"}>Parent</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="filled" sx={{ minWidth: 120 }}
                        error={!!formik.touched.status && !!formik.errors.status}
                    >
                        <InputLabel id="statusField">Status</InputLabel>
                        <Select
                            variant="filled"
                            labelId="statusField"
                            label="Status"
                            name="status"
                            autoComplete="new-status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value={"active"}>Active</MenuItem>
                            <MenuItem value={"inactive"}>Inactive</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </form>
        </Box>
    );
}

export default UserFormComponent;
