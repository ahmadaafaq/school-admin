/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import * as yup from "yup";

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const checkoutSchema = yup.object().shape({
    name: yup.string()
        .min(2, 'Firstname is Too Short!')
        .max(50, 'Firstname is Too Long!')
        .required("This Field is Required"),
    email: yup.string()
        .matches(emailRegExp, "Email Address is Not Valid")
        .required("This Field is Required"),
    contact_no_1: yup.string()
        .matches(phoneRegExp, "Phone Number Is Not Valid")
        .required("This Field is Required"),
    contact_no_2: yup.string()
        .matches(phoneRegExp, "Phone Number Is Not Valid"),
    director: yup.string()
        .required("This Field is Required"),
    principal: yup.string()
        .required("This Field is Required"),
    board: yup.string()
        .required("This Field is Required"),
    registered_by: yup.string()
        .required("This Field is Required"),
    registration_year: yup.string()
        .required("This Field is Required"),
    affiliation_no: yup.string()
        .required("This Field is Required"),
    status: yup.string()
});

export default checkoutSchema;
