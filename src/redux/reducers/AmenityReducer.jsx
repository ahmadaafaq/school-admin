/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { ActionTypes } from "../constants/action-types";

const initialState = {
    listData: [],
    loading: true
};

const initialFormState = {
    listData: [],
    loading: true
};

export const setAmenitiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_LISTING_AMENITIES:
            return {
                ...state,
                listData: action.payload.listData,
                loading: action.payload.loading
            };
        default:
            return state;
    }
};

export const setFormAmenitiesReducer = (state = initialFormState, action) => {
    switch (action.type) {
        case ActionTypes.SET_All_AMENITIES:
            return {
                ...state,
                listData: action.payload.listData,
                loading: action.payload.loading
            };
        default:
            return state;
    }
};
