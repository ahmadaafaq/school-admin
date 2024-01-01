/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { useIdleTimer } from 'react-idle-timer';

import { ColorModeContext, useMode } from "./theme";
import Login from "./components/login/Login";
import Topbar from "./components/common/Topbar";
import Sidebar from "./components/common/Sidebar";
import Loader from "./components/common/Loader";
import { Utility } from "./components/utility";

const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));

const AmenityListingComponent = lazy(() => import("./components/amenities/ListingComponent"));

const BusListingComponent = lazy(() => import("./components/bus/ListingComponent"));
const BusFormComponent = lazy(() => import("./components/bus/FormComponent"));

const ClassListingComponent = lazy(() => import("./components/class/ListingComponent"));

const MarksheetFormComponent = lazy(() => import("./components/marksheet/FormComponent"));
const MarksheetListingComponent = lazy(() => import("./components/marksheet/ListingComponent"));

const SchoolFormComponent = lazy(() => import("./components/school/FormComponent"));
const SchoolListingComponent = lazy(() => import("./components/school/ListingComponent"));

const SectionListingComponent = lazy(() => import("./components/section/ListingComponent"));

const StudentFormComponent = lazy(() => import("./components/student/FormComponent"));
const StudentListingComponent = lazy(() => import("./components/student/ListingComponent"));

const SubjectListingComponent = lazy(() => import("./components/subject/ListingComponent"));

const TeacherFormComponent = lazy(() => import("./components/teacher/FormComponent"));
const TeacherListingComponent = lazy(() => import("./components/teacher/ListingComponent"));

const UserFormComponent = lazy(() => import("./components/user/FormComponent"));
const UserListingComponent = lazy(() => import("./components/user/ListingComponent"));

const UserRoleListingComponent = lazy(() => import("./components/userRole/ListingComponent"));

function App() {
  const [userRole, setUserRole] = useState({ name: '', priority: null });
  const [theme, colorMode] = useMode();
  const navigateTo = useNavigate();

  const { pathname } = useLocation();
  const { getLocalStorage, getRoleAndPriorityById, verifyToken } = Utility();

  const onIdle = () => {
    localStorage.clear();
    location.reload();
  };

  useIdleTimer({    //Automatically SignOut when a user is inactive for 30 minutes
    onIdle,
    timeout: parseInt(import.meta.env.VITE_LOGOUT_TIMER)    //30 minute idle timeout stored in environment variable file
  });

  useEffect(() => {
    getRoleAndPriorityById()
      .then(result => {
        console.log(result, 'useeffect 1')
        if (result) {
          setUserRole({
            name: result.name,
            priority: result.priority
          });
        }
      });
  }, [getLocalStorage("auth")?.role])

  useEffect(() => {
    verifyToken()
      .then(result => {
        console.log('useeffect2', !result)
        if (!result && pathname !== '/login') {
          localStorage.clear();
          navigateTo('../login', { replace: true });
        }
      })
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {getLocalStorage("auth")?.token &&
            <Suspense fallback={<Loader />}>
              <Sidebar roleName={userRole.name} rolePriority={userRole.priority} />
              <main className="content">
                <Topbar roleName={userRole.name} />
                <Routes>
                  {userRole.priority === 1 &&
                    <>
                      <Route exact path="/" element={<Dashboard />} />
                      <Route exact path="/amenity/listing" element={<AmenityListingComponent />} />
                      <Route exact path="/bus/listing" element={<BusListingComponent />} />
                      <Route exact path="/bus/create" element={<BusFormComponent />} />
                      <Route exact path="/bus/update/:id" element={<BusFormComponent />} />
                      
                      <Route exact path="/class/listing" element={<ClassListingComponent />} />

                      <Route exact path="/marksheet/listing" element={<MarksheetListingComponent/>}/>
                      <Route exact path="/marksheet/create" element={<MarksheetFormComponent/>}/>
                      <Route exact path="/marksheet/update/:id" element={<StudentFormComponent />} />

                      <Route exact path="/school/create" element={<SchoolFormComponent />} />
                      <Route exact path="/school/update/:id" element={<SchoolFormComponent />} />
                      <Route exact path="/school/listing" element={<SchoolListingComponent />} />

                      <Route exact path="/section/listing" element={<SectionListingComponent />} />
                      <Route exact path="/subject/listing" element={<SubjectListingComponent />} />

                      <Route exact path="/student/create" element={<StudentFormComponent />} />
                      <Route exact path="/student/create/:id" element={<StudentFormComponent />}/>
                      <Route exact path="/student/update/:id" element={<StudentFormComponent />} />
                      <Route exact path="/student/listing" element={<StudentListingComponent />} />
                      <Route exact path="/student/listing/:classId" element={<StudentListingComponent />} />

                      <Route exact path="/teacher/create" element={<TeacherFormComponent />} />
                      <Route exact path="/teacher/update/:id" element={<TeacherFormComponent />} />
                      <Route exact path="/teacher/listing" element={<TeacherListingComponent />} />

                      <Route exact path="/user/create" element={<UserFormComponent rolePriority={userRole.priority} />} />
                      <Route exact path="/user/update/:id" element={<UserFormComponent />} />
                      <Route exact path="/user/listing" element={<UserListingComponent />} />

                      <Route exact path="/role/listing" element={<UserRoleListingComponent />} />
                    </>}
                  {userRole.priority === 2 &&
                    <>
                      <Route exact path="/" element={<Dashboard />} />
                      <Route exact path="/amenity/listing" element={<AmenityListingComponent />} />
                      <Route exact path="/class/listing" element={<ClassListingComponent />} />

                      <Route exact path="/student/create" element={<StudentFormComponent />} />
                      <Route exact path="/student/update/:id" element={<StudentFormComponent />} />
                      <Route exact path="/student/listing" element={<StudentListingComponent />} />
                      <Route exact path="/student/listing/:classId" element={<StudentListingComponent />} />

                      <Route exact path="/teacher/create" element={<TeacherFormComponent />} />
                      <Route exact path="/teacher/update/:id" element={<TeacherFormComponent />} />
                      <Route exact path="/teacher/listing" element={<TeacherListingComponent />} />

                      <Route exact path="/user/create" element={<UserFormComponent rolePriority={userRole.priority} />} />
                      <Route exact path="/user/update/:id" element={<UserFormComponent />} />
                      <Route exact path="/user/listing" element={<UserListingComponent />} />
                    </>}
                  {userRole.priority === 3 &&
                    <>
                      <Route exact path="/student/create" element={<StudentFormComponent />} />
                      <Route exact path="/student/update/:id" element={<StudentFormComponent />} />
                      <Route exact path="/student/listing" element={<StudentListingComponent />} />
                      <Route exact path="/student/listing/:classId" element={<StudentListingComponent />} />

                      <Route exact path="/teacher/create" element={<TeacherFormComponent />} />
                      <Route exact path="/teacher/update/:id" element={<TeacherFormComponent />} />
                      <Route exact path="/teacher/listing" element={<TeacherListingComponent />} />

                      <Route exact path="/user/create" element={<UserFormComponent rolePriority={userRole.priority} />} />
                      <Route exact path="/user/update/:id" element={<UserFormComponent />} />
                      <Route exact path="/user/listing" element={<UserListingComponent />} />
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
