/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { ActionTypes } from "../constants/action-types";

const initialState = {
    cls: null,
    section: null,
    listData: [],
    loading: true
};

export const setMarksheetsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.MARKSHEET_CLASS:
            return {
                ...state,
                cls: action.payload
            };
        case ActionTypes.MARKSHEET_SECTION:
            return {
                ...state,
                section: action.payload
            };
        case ActionTypes.SET_MARKSHEETS:
            return {
                ...state,
                listData: action.payload.listData,
                loading: action.payload.loading
            };
        default:
            return state;
    };
};
