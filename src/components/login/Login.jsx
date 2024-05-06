/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { Formik, Form, Field } from "formik"
import { Box, Grid, Button, TextField, Typography, Avatar } from "@mui/material"
import {
  InputAdornment,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import ReactCardFlip from "react-card-flip"

import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined"

import API from "../../apis"
import Toast from "../common/Toast"
import SignInLoader from "../common/SignInLoader"

import { themeSettings } from "../../theme"
import { Utility } from "../utility"

import bgImg from "../assets/newbg12.jpeg";
import bg from "../assets/school_stuff.png"
import "../../index.css"
import ForgetPassword from "./ForgetPw"


const initialValues = {
  school_code: "",
  email: "",
  password: "",
}

const ENV = import.meta.env

const Login = () => {
  const [formData, setFormData] = useState(initialValues)
  const [showPassword, setShowPassword] = useState(false)
  const [isFliped, setIsFliped] = useState(false)
  const [loading, setLoading] = useState(false)
  const toastInfo = useSelector(state => state.toastInfo)

  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const formikRef = useRef(null); // Ref to hold Formik instance
  const navigateTo = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery("(max-width:480px)")
  const isTab = useMediaQuery("(max-width:920px)")
  const { typography } = themeSettings(theme.palette.mode)
  const {
    getLocalStorage,
    remLocalStorage,
    setLocalStorage,
    toastAndNavigate,
  } = Utility()

  const boxstyle = {
    position: "absolute",
    top: isMobile ? "49%" : "48%",
    right: isMobile ? "-25%" : "-8%",
    boxShadow: 24,
    borderRadius: 6,
    bgcolor: "background.paper",
    width: isMobile ? "78%" : isTab ? "48%" : "30%",
    height: isMobile ? "40vh" : isTab ? "58vh" : "96vh",
    transform: "translate(-50%, -50%)",
    padding: "10px",
  }

  const flipCard = () => {
    // Flip the state to activate password reset mode
    setIsFliped(!isFliped);
    if (formikRef.current) {
      formikRef.current.resetForm();
      setLoading(false);
    }
  }

  //make the POST API call when submit button is clicked
  useEffect(() => {
    if (formData.school_code || (formData.email && formData.password)) {
      setLoading(true)
      API.UserAPI.login(formData)
        .then(({ data: response }) => {
          setLoading(false)
          if (
            response.status === "Success" &&
            (response.data === "User does not exist" ||
              response.data === "Username and Password do not match")
          ) {
            toastAndNavigate(dispatch, true, "info", response?.data)
          } else if (
            response.status === "Success" &&
            (response.data === "School Code must be specified" ||
              response.data === "School code is incorrect")
          ) {
            toastAndNavigate(dispatch, true, "info", response?.data)
            inputRef.current.focus()
          } else {
            const authInfo = {
              id: response.data.id,
              token: response.data.token,
              role: response.data.role,
              designation: response.data.designation,
              username: response.data.username,
              school: response.data.school_name,
              school_capacity: response.data.school_capacity
            }
            setLocalStorage("auth", authInfo)
            response.data?.school_info
              ? setLocalStorage("schoolInfo", response.data.school_info)
              : null
            if (getLocalStorage("navigatedPath")) {
              navigateTo(`${getLocalStorage("navigatedPath")}`)
              remLocalStorage("navigatedPath") //removing path after navigating user
            } else {
              navigateTo("/")
            }
          }
        })
        .catch((err) => {
          setLoading(false)
          initialValues.password = ""
          toastAndNavigate(dispatch, true, "error", err?.message)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData])

  return (
    <Box
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        height: "99.9vh",
        width: "100vw",
        color: "#f5f5f5",
      }}
    >
      <Toast
        alerting={toastInfo.toastAlert}
        severity={toastInfo.toastSeverity}
        message={toastInfo.toastMessage}
      />
      <Box sx={boxstyle}>
        <Grid container sx={{ flexDirection: "column" }}>
          {!isMobile && (
            <Grid item xs={12} sm={12} lg={12}>
              <Box
                style={{
                  backgroundImage: `url(${bg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  height: isMobile ? "39vh" : isTab ? "21vh" : "44vh",
                  color: "#f5f5f5",
                }}
              ></Box>
            </Grid>
          )}
          <Grid item xs={12} sm={12} lg={12} md={12}>
            <Box
              style={{
                width: isMobile ? "73vw" : "100%",
                height: isMobile ? "38vh" : isTab ? "27vh" : "49vh",
                backgroundColor: "#3b33d5",
                borderRadius: 26,
                backgroundAttachment: "fixed",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Avatar
                sx={{
                  bgcolor: `${theme.palette.mode} === dark ? dark : light`,
                }}
              >
                <LockOutlinedIcon />
              </Avatar>
              <Typography
                component="h2"
                sx={{
                  fontFamily: typography.fontFamily,
                  fontSize: typography.h2.fontSize,
                }}
              >
                {ENV.VITE_COMPANY_NAME || "School CRM"}
              </Typography>
              <ReactCardFlip flipDirection="horizontal" isFlipped={isFliped}>
                <Formik
                  innerRef={formikRef}
                  onSubmit={(values) => setFormData(values)}
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
                    <form
                      onSubmit={handleSubmit}
                      style={{
                        width: isMobile ? "40vw" : isTab ? "28vw" : "21vw",
                      }}
                    >
                      <TextField
                        fullWidth
                        name="school_code"
                        label="School Code"
                        variant="filled"
                        type="text"
                        inputRef={inputRef}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.school_code}
                        error={!!touched.school_code && !!errors.school_code}
                        helperText={touched.school_code && errors.school_code}
                        sx={{ margin: "5px", backgroundColor: "#E9F1FA", borderRadius: "20px", overflow: "hidden" }}
                      />
                      <TextField
                        required
                        fullWidth
                        name="email"
                        label="Username"
                        variant="filled"
                        type="email"
                        autoComplete="new-email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        error={!!touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                        sx={{ margin: "5px", backgroundColor: "#E9F1FA", borderRadius: "20px", overflow: "hidden" }}
                      />
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        variant="filled"
                        type={showPassword ? "text" : "password"} // <-- This is where the pw toggle happens
                        autoComplete="off"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                        error={!!touched.contact_no && !!errors.contact_no}
                        helperText={touched.contact_no && errors.contact_no}
                        sx={{ margin: "5px", backgroundColor: "white", borderRadius: "20px", overflow: "hidden" }}
                        InputProps={{
                          // <-- This is where the toggle button is added
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                onMouseDown={() =>
                                  setShowPassword(!showPassword)
                                }
                              >
                                {showPassword ? (
                                  <VisibilityOutlinedIcon />
                                ) : (
                                  <VisibilityOffOutlinedIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />

                      <Button onClick={flipCard} sx={{ color: "white" }}>Forgot Password?</Button>

                      <Button
                        disabled={!dirty || loading}
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{
                          color: "#F6F6F2",
                          display: "block",
                          margin: "29px 47px ",
                          mt: "2px",
                          minWidth: isMobile
                            ? "170px"
                            : isTab
                              ? "200px"
                              : "200px",
                          backgroundColor: "#FF9A01",
                          borderRadius: 28,
                        }}
                      >
                        {loading === true ? <SignInLoader /> : "Sign In"}
                      </Button>
                    </form>
                  )}
                </Formik>
                <ForgetPassword Api={API.UserAPI} isFliped={isFliped} setIsFliped={setIsFliped} dispatch={dispatch} toastAndNavigate={toastAndNavigate}
                  isMobile={isMobile} isTab={isTab}
                />
              </ReactCardFlip>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Login
