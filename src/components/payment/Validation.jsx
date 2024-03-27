/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import * as yup from "yup";

const checkoutSchema = yup.object().shape({
    student_id: yup.number()
        .required("This Field is Required"),
    academic_year: yup.string()
        .min(2, 'Year is Too Short!')
        .max(10, 'Year is Too Long!')
        .required("This Field is Required"),
    amount: yup.number()
        .required("This Field is Required"),
    payment_date: yup.date()
        .required("This Field is Required"),
    due_date: yup.date(),
});

export default checkoutSchema;
