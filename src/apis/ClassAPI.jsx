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

export const ClassAPI = {
    /** Get classes from the database
     */
    getClasses: async (cancel = false) => {
        const { data: response } = await api.request({
            url: `/get-classes`,
            method: "GET",
            headers: {
                "x-access-token": getLocalStorage("auth").token
            },
            signal: cancel ? cancelApiObject[this.getClasses.name].handleRequestCancellation().signal : undefined,
        });
        return response;
    },

    /** Create class in the database
     */
    createClass: async (Class, cancel = false) => {
        return await api.request({
            url: `/create-class`,
            headers: {
                "x-access-token": getLocalStorage("auth").token
            },
            method: "POST",
            data: Class,
            signal: cancel ? cancelApiObject[this.createClass.name].handleRequestCancellation().signal : undefined,
        });
    }
};

// defining the cancel API object for ClassAPI
const cancelApiObject = defineCancelApiObject(ClassAPI);
