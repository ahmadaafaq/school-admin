/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { api } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";
import { Utility } from "../components/utility";

const { getLocalStorage } = Utility();

export const StudentAPI = {
  /** Get students from the database that meets the specified query parameters
   */
  getAll: async (conditionObj = false, page = 0, size = 5, search = false, authInfo, cancel = false) => {
    const queryParam = conditionObj ? `&${conditionObj.key}=${conditionObj.value}` : '';
    const searchParam = search ? `&search=${search}` : '';
    const { data: response } = await api.request({
      url: `/get-students?page=${page}&size=${size}${queryParam}${searchParam}`,
      headers: {
        "x-access-token": getLocalStorage("auth")?.token
      },
      method: "GET",
      signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
    });
    return response;
  },

  /** Create student in the database
   */
  createStudent: async (student, cancel = false) => {
    return await api.request({
      url: `/create-student`,
      headers: {
        "x-access-token": getLocalStorage("auth").token
      },
      method: "POST",
      data: student,
      signal: cancel ? cancelApiObject[this.createStudent.name].handleRequestCancellation().signal : undefined,
    });
  },

  /** Update student in the database
   */
  updateStudent: async (fields, cancel = false) => {
    return await api.request({
      url: `/update-student`,
      headers: {
        "x-access-token": getLocalStorage("auth").token
      },
      method: "PATCH",
      data: fields,
      signal: cancel ? cancelApiObject[this.updateStudent.name].handleRequestCancellation().signal : undefined,
    });
  },

  /** Get salon by user id from the database
     */
  getStudentsByClassId: async (id, cancel = false) => {
    return await api.request({
      url: `/get-by-class-id`,
      headers: {
        "x-access-token": getLocalStorage("auth").token
      },
      method: "POST",
      data: id,
      signal: cancel ? cancelApiObject[this.getStudentsByClassId.name].handleRequestCancellation().signal : undefined,
    });
  }
};

// defining the cancel API object for StudentAPI
const cancelApiObject = defineCancelApiObject(StudentAPI);
