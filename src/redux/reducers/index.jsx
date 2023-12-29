/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { combineReducers } from "redux";

import { authReducer } from "./AuthReducer";
import { setBusReducer } from "./BusReducer";
import { displayToastReducer } from "./ToastReducer";
import { menuItemReducer } from "./MenuItemReducer";
import { setClassReducer } from "./ClassReducer";
import { setSectionReducer } from "./SectionReducer";
import { setAmenityReducer } from "./AmenityReducer";
import { setSchoolReducer } from "./SchoolReducer";
import { setStudentReducer } from "./StudentReducer";
import { setSubjectsReducer } from "./SubjectReducer";
import { setTeacherReducer } from "./TeacherReducer";
import { setUserReducer } from "./UserReducer";
import { setUserRoleReducer } from "./UserRoleReducer";

const reducers = combineReducers({
    auth: authReducer,
    allAmenities: setAmenityReducer,
    allBuses:  setBusReducer,
    allClasses: setClassReducer,
    allSections: setSectionReducer,
    allSchools: setSchoolReducer,
    allStudents: setStudentReducer,
    allSubjects: setSubjectsReducer,
    allTeachers: setTeacherReducer,
    allUsers: setUserReducer,
    allUserRoles: setUserRoleReducer,
    menuItems: menuItemReducer,
    toastInfo: displayToastReducer
});

export default reducers;
