/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { ActionTypes } from "../constants/action-types";

export const setClasses = (classes) => {
    return {
        type: ActionTypes.SET_LISTING_CLASSES,
        payload: classes
    };
};

export const setFormClasses = (classes) => {
    return {
        type: ActionTypes.SET_FORM_CLASSES,
        payload: classes
    };
};
