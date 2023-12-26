/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { Utility } from "../../utility";

export const useUser = () => {
    const { getRole } = Utility();

    /** Get query parameter according to user role
     */
    const getQueryParam = () => {
        let query = '';
        switch (getRole()) {
            case "admin":
                query = "admin";
                break;
            case "sub-admin":
                query = "sub-admin";
                break;
            case "staff":
                query = "staff";
                break;
            case "teacher":
                query = "teacher";
                break;
            case "parent":
                query = "parent";
                break;
            default:
                query;
                break;
        };
        return query;
    };

    return {
        getQueryParam
    };
};
