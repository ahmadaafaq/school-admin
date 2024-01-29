/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { combineReducers } from "redux";

import { authReducer } from "./AuthReducer";
import { displayToastReducer } from "./ToastReducer";
import { menuItemReducer } from "./MenuItemReducer";
import { setMarksheetsReducer } from "./MarksheetReducer";
import { setAmenitiesReducer } from "./AmenityReducer";
import { setFormAmenitiesReducer } from "./AmenityReducer";
import { setBusesReducer } from "./BusReducer";
import { setClassesReducer } from "./ClassReducer";
import { setFormClassesReducer } from "./ClassReducer";
import { setSectionsReducer } from "./SectionReducer";
import { setFormSectionsReducer } from "./SectionReducer";
import { setSchoolsReducer } from "./SchoolReducer";
import { setStudentsReducer } from "./StudentReducer";
import { setSubjectsReducer } from "./SubjectReducer";
import { setFormSubjectsReducer } from "./SubjectReducer";
import { setTeachersReducer } from "./TeacherReducer";
import { setUsersReducer } from "./UserReducer";
import { setEmployeesReducer } from "./EmployeeReducer";
import { setHolidaysReducer } from "./HolidayReducer"
import { setPaymentsReducer } from "./PaymentReducer";
import { setUserRolesReducer } from "./UserRoleReducer";

const reducers = combineReducers({
    auth: authReducer,
    allAmenities: setAmenitiesReducer,
    allFormAmenities: setFormAmenitiesReducer,
    allBuses: setBusesReducer,
    allClasses: setClassesReducer,
    allFormClasses: setFormClassesReducer,
    allMarksheets: setMarksheetsReducer,
    allSections: setSectionsReducer,
    allFormSections: setFormSectionsReducer,
    allSchools: setSchoolsReducer,
    allStudents: setStudentsReducer,
    allSubjects: setSubjectsReducer,
    allFormSubjects: setFormSubjectsReducer,
    allTeachers: setTeachersReducer,
    allUsers: setUsersReducer,
    allEmployees:setEmployeesReducer,
    allUserRoles: setUserRolesReducer,
    allHolidays: setHolidaysReducer,
    allPayments: setPaymentsReducer,
    menuItems: menuItemReducer,
    toastInfo: displayToastReducer
});

export default reducers;
