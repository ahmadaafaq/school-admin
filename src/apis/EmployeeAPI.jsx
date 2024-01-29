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

export const EmployeeAPI = {
  /** Get Employees from the database that meets the specified query parameters
   */
  getAll: async (conditionObj = false, page = 0, size = 5, search = false, authInfo, cancel = false) => {
    const queryParam = conditionObj ? `&${conditionObj.key}=${conditionObj.value}` : '';
    const searchParam = search ? `&search=${search}` : '';
    const { data: response } = await api.request({
      url: `/get-employees?page=${page}&size=${size}${queryParam}${searchParam}`,
      headers: {
        "x-access-token": getLocalStorage("auth")?.token
      },
      method: "GET",
      signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
    });
    return response;
  },

  /** Create employee in the database
   */
  createEmployee: async (employee, cancel = false) => {
    return await api.request({
      url: `/create-employee`,
      headers: {
        "x-access-token": getLocalStorage("auth").token
      },
      method: "POST",
      data: employee,
      signal: cancel ? cancelApiObject[this.createEmployee.name].handleRequestCancellation().signal : undefined,
    });
  },

  /** Update Employee in the database
   */
  updateEmployee: async (fields, cancel = false) => {
    return await api.request({
      url: `/update-employee`,
      headers: {
        "x-access-token": getLocalStorage("auth").token
      },
      method: "PATCH",
      data: fields,
      signal: cancel ? cancelApiObject[this.updateEmployee.name].handleRequestCancellation().signal : undefined,
    });
  },

}
// defining the cancel API object for EmployeeAPI
const cancelApiObject = defineCancelApiObject(EmployeeAPI);
