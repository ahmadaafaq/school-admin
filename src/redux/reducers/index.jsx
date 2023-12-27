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
import { setClassReducer } from "./ClassReducer";
import { setAmenityReducer } from "./AmenityReducer";
import { setSchoolReducer } from "./SchoolReducer";
import { setStudentReducer } from "./StudentReducer";
import { setTeacherReducer } from "./TeacherReducer";
import { setUserReducer } from "./UserReducer";

const reducers = combineReducers({
    auth: authReducer,
    allAmenities: setAmenityReducer,
    allClasses: setClassReducer,
    allSchools: setSchoolReducer,
    allStudents: setStudentReducer,
    allTeachers: setTeacherReducer,
    allUsers: setUserReducer,
    menuItems: menuItemReducer,
    toastInfo: displayToastReducer
});

export default reducers;
