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

export const TimeTableAPI = {
    /** Get TimeTable from the database that meets the specified query parameters
     */
    getAll: async (conditionObj = false, page = 0, size = 5, search = false, authInfo, cancel = false) => {
        let queryParam = '';
        if (conditionObj) {
          Object.keys(conditionObj).map(key => {
            queryParam += `&${key}=${conditionObj[key]}`
          })
        }
        const searchParam = search ? `&search=${search}` : '';
        const { data: response } = await api.request({
            url: `/get-time-tables?page=${page}&size=${size}${queryParam}${searchParam}`,
            headers: {
                "x-access-token": getLocalStorage("auth")?.token
            },
            method: "GET",
            signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined
        });
        return response;
    },

    /** Create TimeTable in the database
     */
    createTimeTable: async (timeTable, cancel = false) => {
        return await api.request({
            url: `/create-time-table`,
            headers: {
                "x-access-token": getLocalStorage("auth").token
            },
            method: "POST",
            data: timeTable,
            signal: cancel ? cancelApiObject[this.createTimeTable.name].handleRequestCancellation().signal : undefined
        });
    },

    /** Update TimeTable in the database
     */
    updateTimeTable: async (fields, cancel = false) => {
        console.log("timetableapiupadate>>", fields);
        return await api.request({
            url: `/update-time-table`,
            headers: {
                "x-access-token": getLocalStorage("auth").token
            },
            method: "PATCH",
            data: fields,
            signal: cancel ? cancelApiObject[this.updateTimeTable.name].handleRequestCancellation().signal : undefined
        });
    }
}

// defining the cancel API object for  updateTimeTableAPI
const cancelApiObject = defineCancelApiObject(TimeTableAPI);
