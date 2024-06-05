/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import axios from "axios";
import { Utility } from "../../components/utility";

// eslint-disable-next-line react-refresh/only-export-components
const ENV = import.meta.env;
const { getLocalStorage } = Utility();

export const api = axios.create({
  withCredentials: true,
  baseURL: ENV.VITE_BASE_URL || 'https://school-crm-node-app.onrender.com/api/v1',
  validateStatus: (status) => (status >= 200 && status < 300) || status == 404
});

// defining a custom error handler for all APIs
const errorHandler = (error) => {
  const statusCode = error.response?.status;

  // logging only errors that are not 401
  if (statusCode && statusCode !== 401) {
    throw error;
  }

  return Promise.reject(error);
};

// registering the custom error handler to the
// "api" axios instance
api.interceptors.response.use(undefined, (error) => {
  return errorHandler(error);
});

const schoolInfo = getLocalStorage("schoolInfo");
//ask for token on every request made
api.interceptors.request.use(req => {
  console.log(schoolInfo, 'schoolInfo header')
  req.headers['Type'] = "school-admin";
  schoolInfo ? req.headers['School'] = JSON.stringify(schoolInfo) : null;

  return req;
});
