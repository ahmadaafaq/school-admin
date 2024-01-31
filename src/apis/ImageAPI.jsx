/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { api } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";
import { Utility } from "../components/utility";

const { getLocalStorage } = Utility();

export const ImageAPI = {
    /** Upload image to the backend
     */
    uploadImage: async (data, cancel = false) => {
        console.log(data, 'api image file')
        return await api.request({
            url: `/upload-image`,
            headers: {
                "Content-Type": "multipart/form-data",
                "x-access-token": getLocalStorage("auth").token
            },
            method: "POST",
            data: data,
            signal: cancel ? cancelApiObject[this.uploadImage.name].handleRequestCancellation().signal : undefined
        });
    },
    // http://localhost:8080/api/v1/get-image/splash1.png
};

// defining the cancel API object for ImageAPI
const cancelApiObject = defineCancelApiObject(ImageAPI);
