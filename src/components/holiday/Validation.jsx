/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import * as yup from "yup";

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const checkoutSchema = yup.object().shape({
    name: yup.string()
        .min(2, 'name is Too Short!')
        .max(20, 'name is Too Long!')
        .required("This Field is Required"),
    date: yup.date()
        .required("This Field is Required"),
    type: yup.string()
        .required("This Field is Required"),
    status: yup.string()
});

export default checkoutSchema;
