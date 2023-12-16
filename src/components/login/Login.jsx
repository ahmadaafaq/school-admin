/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Formik } from "formik";
import { Box, Grid, Button, TextField, Typography, Avatar } from "@mui/material";
import { InputAdornment, IconButton, useMediaQuery, useTheme } from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import API from "../../apis";
import Toast from "../common/Toast";
import SignInLoader from "../common/SignInLoader";
import { themeSettings } from "../../theme";
import { Utility } from "../utility";

import bgImg from "../assets/school_children.jpeg";
import bg from "../assets/school_stuff.png";

const initialValues = {
  email: "",
  password: ""
};

const ENV = import.meta.env;

const Login = () => {
  const [formData, setFormData] = useState(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigateTo = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const toastInfo = useSelector(state => state.toastInfo);

  const isMobile = useMediaQuery("(max-width:480px)");
  const isTab = useMediaQuery("(max-width:920px)");
  const { typography } = themeSettings(theme.palette.mode);
  const { toastAndNavigate, setLocalStorage } = Utility();

  const boxstyle = {
    position: "absolute",
    top: isMobile ? "35%" : "38%",
    right: isMobile ? "-25%" : "-8%",
    boxShadow: 24,
    borderRadius: 6,
    bgcolor: "background.paper",
    width: isMobile ? "78%" : isTab ? "48%" : "30%",
    height: isMobile ? "38vh" : isTab ? "58vh" : "96vh",
    transform: "translate(-50%, -50%)",
    padding: "10px"
  };

  //make the POST API call when submit button is clicked
  useEffect(() => {
    if (formData.email && formData.password) {
      setLoading(true);
      API.UserAPI.login(formData)
        .then(({ data: response }) => {
          setLoading(false);

          if (response.status === 'Success' &&
            (response.data === "User does not exist" || response.data === "Username and Password do not match")) {
            toastAndNavigate(dispatch, true, "info", response?.data);
          }
          else {
            const authInfo = {
              id: response.data.id,
              token: response.data.token,
              role: response.data.role,
              username: response.data.username
            };
            setLocalStorage("auth", authInfo);
            navigateTo("/");
          }
        })
        .catch(err => {
          setLoading(false);
          initialValues.password = '';
          toastAndNavigate(dispatch, true, "error", err?.message);
        });
    };
  }, [formData]);

  return (

    <Box
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "99.9vh",
        width: "100vw",
        color: "#f5f5f5"
      }}
    >
      <Toast
        alerting={toastInfo.toastAlert}
        severity={toastInfo.toastSeverity}
        message={toastInfo.toastMessage}
      />
      <Box sx={boxstyle}>
        <Grid container sx={{ flexDirection: 'column' }}>
          {!isMobile &&
            <Grid item xs={12} sm={12} lg={12}>
              <Box
                style={{
                  backgroundImage: `url(${bg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  height: isMobile ? "40vh" : isTab ? "22vh" : "45vh",
                  color: "#f5f5f5"
                }}
              ></Box>
            </Grid>}
          <Grid item xs={12} sm={12} lg={12} md={12}>
            <Box
              style={{
                width: isMobile ? "73vw" : "100%",
                height: isMobile ? "36vh" : isTab ? "26vh" : "48vh",
                backgroundColor: "#3b33d5",
                borderRadius: 26,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "relative"
              }}
            >
              <Avatar sx={{ bgcolor: `${theme.palette.mode} === dark ? dark : light` }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h2" sx={{
                fontFamily: typography.fontFamily,
                fontSize: typography.h2.fontSize
              }}>
                {ENV.VITE_COMPANY_NAME}
              </Typography>
              <Formik
                onSubmit={values => {
                  setFormData(values);
                }}
                initialValues={initialValues}
              >
                {({
                  values,
                  errors,
                  touched,
                  dirty,
                  handleBlur,
                  handleChange,
                  handleSubmit
                }) => (
                  <form onSubmit={handleSubmit} style={{ width: isMobile ? "40vw" : isTab ? "28vw" : "21vw" }}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Username"
                      name="email"
                      type="email"
                      autoComplete="new-email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      sx={{ margin: "5px" }}
                    />
                    <TextField
                      required
                      fullWidth
                      id="password"
                      label="Password"
                      name="password"
                      type={showPassword ? "text" : "password"} // <-- This is where the pw toggle happens
                      autoComplete="off"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      error={!!touched.contact_no && !!errors.contact_no}
                      helperText={touched.contact_no && errors.contact_no}
                      sx={{ margin: "5px" }}
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
                    {/* <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                            <Stack direction="row" spacing={2}>
                              <FormControlLabel
                                sx={{ width: "60%" }}
                                onClick={() => setRemember(!remember)}
                                control={<Checkbox checked={remember} />}
                                label="Remember me"
                              />
                              <Typography
                                variant="body1"
                                component="span"
                                onClick={() => {
                                  navigateTo("/reset-password");
                                }}
                                style={{ marginTop: "10px", cursor: "pointer" }}
                              >
                                Forgot password?
                              </Typography>
                            </Stack>
                          </Grid> */}
                    <Button
                      disabled={!dirty || loading}
                      type="submit"
                      variant="contained"
                      size="large"
                      sx={{
                        color: "#ffffff",
                        display: "block",
                        margin: "auto",
                        mt: "10px",
                        minWidth: isMobile ? "170px" : isTab ? "200px" : "200px",
                        backgroundColor: "#FF9A01",
                        borderRadius: 28
                      }}
                    >
                      {loading === true ? <SignInLoader /> : "Sign In"}
                    </Button>
                  </form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Login;
