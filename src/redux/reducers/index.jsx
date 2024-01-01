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
import { setAmenitiesReducer } from "./AmenityReducer";
import { setBusesReducer } from "./BusReducer";
import { setClassesReducer } from "./ClassReducer";
import { setSectionsReducer } from "./SectionReducer";
import { setSchoolsReducer } from "./SchoolReducer";
import { setStudentsReducer } from "./StudentReducer";
import { setSubjectsReducer } from "./SubjectReducer";
import { setTeachersReducer } from "./TeacherReducer";
import { setUsersReducer } from "./UserReducer";
import { setUserRolesReducer } from "./UserRoleReducer";

const reducers = combineReducers({
    auth: authReducer,
    allAmenities: setAmenitiesReducer,
    allBuses: setBusesReducer,
    allClasses: setClassesReducer,
    allSections: setSectionsReducer,
    allSchools: setSchoolsReducer,
    allStudents: setStudentsReducer,
    allSubjects: setSubjectsReducer,
    allTeachers: setTeachersReducer,
    allUsers: setUsersReducer,
    allUserRoles: setUserRolesReducer,
    menuItems: menuItemReducer,
    toastInfo: displayToastReducer
});

export default reducers;
