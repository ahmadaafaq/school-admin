/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { useIdleTimer } from 'react-idle-timer';

import { ColorModeContext, useMode } from "./theme";
import Login from "./components/login/Login";
import Topbar from "./components/common/Topbar";
import Sidebar from "./components/common/Sidebar";
import Loader from "./components/common/Loader";
import { Utility } from "./components/utility";

const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));

const EmployeeFormComponent = lazy(() => import("./components/employee/FormComponent"));
const EmployeeListingComponent = lazy(() => import("./components/employee/ListingComponent"));

const StudentFormComponent = lazy(() => import("./components/student/FormComponent"));
const StudentListingComponent = lazy(() => import("./components/student/ListingComponent"));

const TeacherFormComponent = lazy(() => import("./components/teacher/FormComponent"));
const TeacherListingComponent = lazy(() => import("./components/teacher/ListingComponent"));

function App() {
  const [role, setRole] = useState(null);
  const [theme, colorMode] = useMode();
  const navigateTo = useNavigate();

  const { pathname } = useLocation();
  const { getLocalStorage, getRole, verifyToken } = Utility();


  const switchRole = (userRole) => {
    switch (userRole) {
      case 'admin':
        navigateTo(pathname);
        break;
      default:
        navigateTo('/login');
        break;
    }
  };

  useEffect(() => {
    const roleType = getRole();
    setRole(roleType);
    switchRole(roleType);
  }, [getLocalStorage("auth")?.role]);

  const onIdle = () => {
    localStorage.clear();
    location.reload();
  };

  useIdleTimer({    //Automatically SignOut when a user is inactive for 30 minutes
    onIdle,
    timeout: parseInt(import.meta.env.VITE_LOGOUT_TIMER)    //30 minute idle timeout stored in environment variable file
  });

  if (!verifyToken() && pathname !== '/login') {
    return <Navigate to="/login" replace />
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {getLocalStorage("auth")?.token &&
            <Suspense fallback={<Loader />}>
              <Sidebar role={role} />
              <main className="content">
                <Topbar />
                <Routes>
                  {role === 'admin' &&
                    <>
                      <Route exact path="/" element={<Dashboard />} />

                      <Route exact path="/employee/create" element={<EmployeeFormComponent />} />
                      <Route exact path="/employee/update/:id" element={<EmployeeFormComponent />} />
                      <Route exact path="/employee/listing" element={<EmployeeListingComponent />} />

                      <Route exact path="/student/create" element={<StudentFormComponent />} />
                      <Route exact path="/student/update/:id" element={<StudentFormComponent />} />
                      <Route exact path="/student/listing" element={<StudentListingComponent />} />

                      <Route exact path="/teacher/create" element={<TeacherFormComponent />} />
                      <Route exact path="/teacher/update/:id" element={<TeacherFormComponent />} />
                      <Route exact path="/teacher/listing" element={<TeacherListingComponent />} />
                    </>}
                </Routes>
              </main>
            </Suspense>}
          <Routes>
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
