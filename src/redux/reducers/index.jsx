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
import { setAllClassesReducer } from "./ClassReducer";
import { setListingClassesReducer } from "./ClassReducer";
import { setSchoolClassesReducer } from "./ClassReducer";
import { setAllSectionsReducer } from "./SectionReducer";
import { setListingSectionsReducer } from "./SectionReducer";
import { setSchoolSectionsReducer } from "./SectionReducer";
import { setListingSchoolsReducer } from "./SchoolReducer";
import { setAllSchoolsReducer } from "./SchoolReducer";
import { setStudentsReducer } from "./StudentReducer";
import { setAllSubjectsReducer } from "./SubjectReducer";
import { setListingSubjectsReducer } from "./SubjectReducer";
import { setSchoolSubjectsReducer } from "./SubjectReducer";
import { setTeachersReducer } from "./TeacherReducer";
import { setUsersReducer } from "./UserReducer";
import { setEmployeesReducer } from "./EmployeeReducer";
import { setHolidaysReducer } from "./HolidayReducer"
import { setPaymentsReducer } from "./PaymentReducer";
import { setSchoolDurationsReducer } from "./SchoolDurationReducer";
import { setUserRolesReducer } from "./UserRoleReducer";

const reducers = combineReducers({
    auth: authReducer,
    allAmenities: setAmenitiesReducer,
    allFormAmenities: setFormAmenitiesReducer,
    allBuses: setBusesReducer,
    allClasses: setAllClassesReducer,
    listingClasses: setListingClassesReducer,
    schoolClasses: setSchoolClassesReducer,
    allMarksheets: setMarksheetsReducer,
    allSections: setAllSectionsReducer,
    listingSections: setListingSectionsReducer,
    schoolSections: setSchoolSectionsReducer,
    listingSchools: setListingSchoolsReducer,
    allSchools: setAllSchoolsReducer,
    allStudents: setStudentsReducer,
    allSubjects: setAllSubjectsReducer,
    listingSubjects: setListingSubjectsReducer,
    schoolSubjects: setSchoolSubjectsReducer,
    allTeachers: setTeachersReducer,
    allUsers: setUsersReducer,
    allEmployees: setEmployeesReducer,
    allUserRoles: setUserRolesReducer,
    allHolidays: setHolidaysReducer,
    allPayments: setPaymentsReducer,
    allSchoolDurations: setSchoolDurationsReducer,
    menuItems: menuItemReducer,
    toastInfo: displayToastReducer
});

export default reducers;
