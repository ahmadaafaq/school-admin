import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { TextField, Button, IconButton, InputAdornment } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { Visibility, VisibilityOff } from "@mui/icons-material"

import API from "../../apis"
import { Utility } from "../utility"
import Toast from "../common/Toast"

const ResetPassword = () => {
  const toastInfo = useSelector((state) => state.toastInfo)

  const { token } = useParams()
  const { verifyToken, toastAndNavigate, getLocalStorage } = Utility()
  const navigateTo = useNavigate()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)

  console.log("Reset password page")

  useEffect(() => {
    console.log('useffecttt')
    if (getLocalStorage("auth")?.token) {
      verifyToken().then((result) => {
        console.log("Reset password useeffect", result)
        if (!result) {
          console.log("Not a valid token.")
          toastAndNavigate(dispatch, true, "info", "Not a valid token.", navigateTo, `/login`);
        }
        localStorage.clear()
      })
    }
  }, [getLocalStorage("auth")?.token])

  // setLocalStorage("reset-password-token", token);

  const validatePassword = (values) => {
    const errors = {}
    if (!values.password) {
      errors.password = "Password is required"
    } else if (!/(?=.*[A-Z])/.test(values.password)) {
      errors.password = "Password must contain at least one capital letter"
    } else if (
      !/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/.test(values.password)
    ) {
      errors.password = "Password must contain at least one special character"
    } else if (/123|234|345|456|567|678|789|890/.test(values.password)) {
      errors.password = "Password cannot contain sequential numbers"
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Please confirm your password"
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }

    return errors
  }

  const handleSubmit = (values) => {
    API.UserAPI.resetPassword({ token, password: values.password })
      .then((res) => {
        console.log(res, "reset pw res")
        if (res.Status === "Success") {
          toastAndNavigate(
            dispatch,
            true,
            "info",
            "Password is Reset Successfully",
            navigateTo,
            `/login`
          )
        }
      })
      .catch((err) => console.log(err))
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div>
      <h4>Create a New Password</h4>
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validate={validatePassword}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div style={{ marginBottom: 16 }}>
              <Field
                as={TextField}
                type={showPassword ? "text" : "password"}
                label="New Password"
                placeholder="Enter Password"
                autoComplete="new-password"
                fullWidth
                variant="outlined"
                name="password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <ErrorMessage
                name="password"
                component="div"
                style={{ color: "red" }}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <Field
                as={TextField}
                type={showPassword ? "text" : "password"}
                label="Confirm Password"
                placeholder="Confirm Password"
                autoComplete="new-password"
                fullWidth
                variant="outlined"
                name="confirmPassword"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                style={{ color: "red" }}
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
              disabled={isSubmitting}
            >
              Update
            </Button>
          </Form>
        )}
      </Formik>
      <Toast
        alerting={toastInfo.toastAlert}
        severity={toastInfo.toastSeverity}
        message={toastInfo.toastMessage}
      />
    </div>
  )
}

export default ResetPassword
