/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import * as yup from "yup";

const checkoutSchema = yup.object().shape({
    name: yup.string()
        .min(2, 'Name is Too Short!')
        .max(40, 'Name is Too Long!')
        .required("This Field is Required"),
    // email: yup.string()
    //     .matches(emailRegExp, "Email Address is Not Valid"),
    // contact_no: yup.string()
    //     .matches(phoneRegExp, "Phone Number Is Not Valid")
    //     .required("This Field is Required"),
    // gender: yup.string(),
    // status: yup.string()
});

export default checkoutSchema;
