/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { ActionTypes } from "../constants/action-types";

export const setAmenities = (amenities) => {
    return {
        type: ActionTypes.SET_LISTING_AMENITIES,
        payload: amenities
    };
};

export const setFormAmenities = (amenities) => {
    return {
        type: ActionTypes.SET_All_AMENITIES,
        payload: amenities
    };
};
