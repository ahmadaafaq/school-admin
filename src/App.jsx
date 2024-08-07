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
import { useIdleTimer } from "react-idle-timer";

import Login from "./components/login/Login";
import Topbar from "./components/common/Topbar";
import Sidebar from "./components/common/Sidebar";

import { ColorModeContext, useMode } from "./theme";
import { Utility } from "./components/utility";

import formBg from "./components/assets/formBg.png";

const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));

const NotFound = lazy(() =>
  import("./components/404 page/Animated404Component")
);

const AmenityListingComponent = lazy(() =>
  import("./components/amenities/ListingComponent")
);

const BusListingComponent = lazy(() =>
  import("./components/bus/ListingComponent")
);

const BusFormComponent = lazy(() => import("./components/bus/FormComponent"));

const ClassListingComponent = lazy(() =>
  import("./components/class/ListingComponent")
);

const MarksheetFormComponent = lazy(() =>
  import("./components/marksheet/FormComponent")
);

const MarksheetListingComponent = lazy(() =>
  import("./components/marksheet/ListingComponent")
);

const SchoolFormComponent = lazy(() =>
  import("./components/school/FormComponent")
);

const SchoolListingComponent = lazy(() =>
  import("./components/school/ListingComponent")
);

const SectionListingComponent = lazy(() =>
  import("./components/section/ListingComponent")
);

const StudentFormComponent = lazy(() =>
  import("./components/student/FormComponent")
);

const StudentListingComponent = lazy(() =>
  import("./components/student/ListingComponent")
);

const SubjectListingComponent = lazy(() =>
  import("./components/subject/ListingComponent")
);

const TeacherFormComponent = lazy(() =>
  import("./components/teacher/FormComponent")
);

const TeacherListingComponent = lazy(() =>
  import("./components/teacher/ListingComponent")
);

const UserFormComponent = lazy(() => import("./components/user/FormComponent"));

const UserListingComponent = lazy(() =>
  import("./components/user/ListingComponent")
);

const EmployeeFormComponent = lazy(() =>
  import("./components/employee/FormComponent")
);

const EmployeeListingComponent = lazy(() =>
  import("./components/employee/ListingComponent")
);

const HolidayFormComponent = lazy(() =>
  import("./components/holiday/FormComponent")
);

const HolidayListingComponent = lazy(() =>
  import("./components/holiday/ListingComponent")
);

const PaymentFormComponent = lazy(() =>
  import("./components/payment/FormInModalComponent")
);

const PaymentListingComponent = lazy(() =>
  import("./components/payment/ListingComponent")
);

const PaymentMethodListingComponent = lazy(() =>
  import("./components/paymentMethod/ListingComponent")
);

const SchoolDurationFormComponent = lazy(() =>
  import("./components/schoolDuration/FormComponent")
);

const SchoolDurationListingComponent = lazy(() =>
  import("./components/schoolDuration/ListingComponent")
);

const SchoolHouseFormComponent = lazy(() =>
  import("./components/schoolHouse/FormComponent")
);

const SchoolHouseListingComponent = lazy(() =>
  import("./components/schoolHouse/ListingComponent")
);

const TimeTableFormComponent = lazy(() =>
  import("./components/timetable/FormComponent")
);

const TimeTableListingComponent = lazy(() =>
  import("./components/timetable/ListingComponent")
);

const NoticeBoardFormComponent = lazy(() =>
  import("./components/noticeboard/FormComponent")
);

const NoticeBoardListing = lazy(() =>
  import("./components/noticeboard/ListingComponent")
);

const UserRoleListingComponent = lazy(() =>
  import("./components/userRole/ListingComponent")
);

const ResetPasswordComponent = lazy(() =>
  import("./components/resetPassword/ResetPw")
);

const AttendanceComponent = lazy(() =>
  import("./components/attendance/ListingComponent")
);

const GenerateIdCardComponent = lazy(() =>
  import("./components/generateIdCard/ListingComponent")
);

function App() {
  const [userRole, setUserRole] = useState({ name: "", priority: null });
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [theme, colorMode] = useMode();
  const navigateTo = useNavigate();
  let { pathname } = useLocation();
  const splittedPath = pathname.split("/");
  const {
    getLocalStorage,
    getRoleAndPriorityById,
    setLocalStorage,
    verifyToken,
  } = Utility();

  if (splittedPath.length > 0) {
    pathname = splittedPath[1];
  }

  const onIdle = () => {
    localStorage.clear();
    location.reload();
  };

  useIdleTimer({
    //Automatically SignOut when a user is inactive for 30 minutes
    onIdle,
    timeout: parseInt(import.meta.env.VITE_LOGOUT_TIMER || 1800000), //30 minute idle timeout stored in environment variable file
  });

  useEffect(() => {
    getRoleAndPriorityById().then((result) => {
      if (result) {
        setUserRole({
          name: result.name,
          priority: result.priority,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getLocalStorage("auth")?.role]);

  useEffect(() => {
    verifyToken().then((result) => {
      if (!result && pathname === "reset-password") {
        const token = splittedPath[2];
        setLocalStorage("auth", {
          token: token,
        });
        navigateTo(`/reset-password/${token}`, { replace: true });
      } else if (!result && pathname !== "login") {
        localStorage.clear();
        setLocalStorage("navigatedPath", pathname);
        navigateTo("/login", { replace: true });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {getLocalStorage("auth")?.token && pathname !== "reset-password" && (
            <Suspense
              fallback={
                <div>
                  <img
                    src={formBg}
                    alt=""
                    style={{
                      backgroundSize: "cover",
                      backgroundAttachment: "fixed",
                      backgroundPosition: "center",
                    }}
                  />
                </div>
              }
            >
              <Sidebar
                className="sidebar"
                roleName={userRole.name}
                rolePriority={userRole.priority}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
              />
              <main className="content">
                <Topbar
                  roleName={userRole.name}
                  rolePriority={userRole.priority}
                  isCollapsed={isCollapsed}
                  setIsCollapsed={setIsCollapsed}
                />
                <Routes>
                  {userRole.priority === 1 && (
                    <>
                      <Route
                        exact
                        path="/"
                        element={<Dashboard rolePriority={userRole.priority} />}
                      />
                      <Route path="*" element={<NotFound />} />
                      <Route
                        exact
                        path="/amenity/listing"
                        element={<AmenityListingComponent />}
                      />
                      <Route
                        exact
                        path="/role/listing"
                        element={<UserRoleListingComponent />}
                      />

                      <Route
                        exact
                        path="/school/create"
                        element={<SchoolFormComponent />}
                      />
                      <Route
                        exact
                        path="/school/update/:id"
                        element={<SchoolFormComponent />}
                      />
                      <Route
                        exact
                        path="/school/listing"
                        element={<SchoolListingComponent />}
                      />

                      <Route
                        exact
                        path="/class/listing"
                        element={<ClassListingComponent />}
                      />
                      <Route
                        exact
                        path="/payment-method/listing"
                        element={<PaymentMethodListingComponent />}
                      />
                      <Route
                        exact
                        path="/section/listing"
                        element={<SectionListingComponent />}
                      />
                      <Route
                        exact
                        path="/subject/listing"
                        element={<SubjectListingComponent />}
                      />
                    </>
                  )}
                  {userRole.priority <= 2 && (
                    <>
                      <Route
                        exact
                        path="/"
                        element={<Dashboard rolePriority={userRole.priority} />}
                      />
                      <Route path="*" element={<NotFound />} />
                    </>
                  )}
                  {userRole.priority <= 3 && (
                    <>
                      <Route
                        exact
                        path="/bus/listing"
                        element={
                          <BusListingComponent
                            rolePriority={userRole.priority}
                          />
                        }
                      />
                      <Route
                        exact
                        path="/bus/create"
                        element={<BusFormComponent />}
                      />
                      <Route
                        exact
                        path="/bus/update/:id"
                        element={<BusFormComponent />}
                      />

                      <Route
                        exact
                        path="/student/create"
                        element={<StudentFormComponent />}
                      />
                      <Route
                        exact
                        path="/student/create/:id"
                        element={<StudentFormComponent />}
                      />
                      <Route
                        exact
                        path="/student/update/:id"
                        element={<StudentFormComponent />}
                      />
                      <Route
                        exact
                        path="/student/listing"
                        element={
                          <StudentListingComponent
                            rolePriority={userRole.priority}
                          />
                        }
                      />
                      <Route
                        exact
                        path="/student/listing/:classId"
                        element={
                          <StudentListingComponent
                            rolePriority={userRole.priority}
                          />
                        }
                      />

                      <Route
                        exact
                        path="/marksheet/create"
                        element={<MarksheetFormComponent />}
                      />
                      <Route
                        exact
                        path="/marksheet/update/:id"
                        element={<MarksheetFormComponent />}
                      />
                      <Route
                        exact
                        path="/marksheet/listing"
                        element={
                          <MarksheetListingComponent
                            rolePriority={userRole.priority}
                          />
                        }
                      />

                      <Route
                        exact
                        path="/teacher/create"
                        element={<TeacherFormComponent />}
                      />
                      <Route
                        exact
                        path="/teacher/update/:id"
                        element={<TeacherFormComponent />}
                      />
                      <Route
                        exact
                        path="/teacher/listing"
                        element={
                          <TeacherListingComponent
                            rolePriority={userRole.priority}
                          />
                        }
                      />

                      <Route
                        exact
                        path="/user/create"
                        element={
                          <UserFormComponent rolePriority={userRole.priority} />
                        }
                      />
                      <Route
                        exact
                        path="/user/update/:id"
                        element={
                          <UserFormComponent rolePriority={userRole.priority} />
                        }
                      />
                      <Route
                        exact
                        path="/user/listing"
                        element={<UserListingComponent />}
                      />

                      <Route
                        exact
                        path="/employee/create"
                        element={<EmployeeFormComponent />}
                      />
                      <Route
                        exact
                        path="/employee/update/:id"
                        element={<EmployeeFormComponent />}
                      />
                      <Route
                        exact
                        path="/employee/listing"
                        element={
                          <EmployeeListingComponent
                            rolePriority={userRole.priority}
                          />
                        }
                      />
                       <Route
                        exact
                        path="/generate-id-card/listing"
                        element={
                          <GenerateIdCardComponent
                            rolePriority={userRole.priority}
                          />
                        }
                      />

                      <Route
                        exact
                        path="/holiday/create"
                        element={<HolidayFormComponent />}
                      />
                      <Route
                        exact
                        path="/holiday/update/:id"
                        element={<HolidayFormComponent />}
                      />
                      <Route
                        exact
                        path="/holiday/listing"
                        element={
                          <HolidayListingComponent
                            rolePriority={userRole.priority}
                          />
                        }
                      />

                      <Route
                        exact
                        path="/payment/create"
                        element={<PaymentFormComponent rolePriority={userRole.priority} openDialog={true} />}
                      />
                      <Route
                        exact
                        path="/payment/update/:id"
                        element={
                          <PaymentFormComponent
                            rolePriority={userRole.priority}
                          />
                        }
                      />
                      <Route
                        exact
                        path="/payment/listing"
                        element={
                          <PaymentListingComponent
                            rolePriority={userRole.priority}
                          />
                        }
                      />

                      <Route
                        exact
                        path="/school-duration/create"
                        element={<SchoolDurationFormComponent />}
                      />
                      <Route
                        exact
                        path="/school-duration/update/:id"
                        element={<SchoolDurationFormComponent />}
                      />
                      <Route
                        exact
                        path="/school-duration/listing"
                        element={
                          <SchoolDurationListingComponent
                            rolePriority={userRole.priority}
                          />
                        }
                      />

                      <Route
                        exact
                        path="/school-house/create"
                        element={<SchoolHouseFormComponent />}
                      />
                      <Route
                        exact
                        path="/school-house/update/:id"
                        element={<SchoolHouseFormComponent />}
                      />
                      <Route
                        exact
                        path="/school-house/listing"
                        element={
                          <SchoolHouseListingComponent
                            rolePriority={userRole.priority}
                          />
                        }
                      />
                      <Route
                        exact
                        path="/attendance/listing"
                        element={
                          <AttendanceComponent
                            rolePriority={userRole.priority}
                          />
                        }
                      />
                      <Route
                        exact
                        path="/time-table/create"
                        element={<TimeTableFormComponent />}
                      />
                      <Route
                        exact
                        path="/time-table/update/:class_id/:section_id"
                        element={<TimeTableFormComponent />}
                      />
                      <Route
                        exact
                        path="/time-table/listing"
                        element={
                          <TimeTableListingComponent
                            rolePriority={userRole.priority}
                          />
                        }
                      />

                      <Route
                        exact
                        path="/noticeboard/create"
                        element={<NoticeBoardFormComponent />}
                      />
                      <Route
                        exact
                        path="/noticeboard/update/:id"
                        element={<NoticeBoardFormComponent />}
                      />
                      <Route
                        exact
                        path="/noticeboard/listing"
                        element={
                          <NoticeBoardListing
                            rolePriority={userRole.priority}
                          />
                        }
                      />
                    </>
                  )}

                  {userRole.priority === 4 && (
                    <>
                      <Route
                        exact
                        path="/student/listing"
                        element={
                          <StudentListingComponent
                            rolePriority={userRole.priority}
                          />
                        }
                      />
                      <Route
                        exact
                        path="/student/listing/:classId"
                        element={
                          <StudentListingComponent
                            rolePriority={userRole.priority}
                          />
                        }
                      />
                      <Route
                        exact
                        path="/holiday/listing"
                        element={
                          <HolidayListingComponent
                            rolePriority={userRole.priority}
                          />
                        }
                      />
                      <Route
                        exact
                        path="/marksheet/listing"
                        element={
                          <MarksheetListingComponent
                            rolePriority={userRole.priority}
                          />
                        }
                      />
                    </>
                  )}
                  {userRole.priority === 5 && (
                    <>
                      {/* Disable create button and update button for priority > 4 only enable view */}
                      <Route
                        exact
                        path="/student/listing"
                        element={
                          <StudentListingComponent
                            rolePriority={userRole.priority}
                          />
                        }
                      />
                      {/* <Route exact path="/student/listing/parent/:parentId" element={<StudentListingComponent rolePriority={userRole.priority} />} /> */}
                      <Route
                        exact
                        path="/holiday/listing"
                        element={
                          <HolidayListingComponent
                            rolePriority={userRole.priority}
                          />
                        }
                      />
                    </>
                  )}
                </Routes>
              </main>
            </Suspense>
          )}
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route
              path="/reset-password/:token"
              element={<ResetPasswordComponent />}
            />
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
