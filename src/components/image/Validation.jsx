/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import * as yup from "yup";

const MAX_FILE_SIZE = 10240000; //1MB

const validFileExtensions = ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'];

function isValidFileType(fileName) {
    const extension = fileName.split('.').pop().toLowerCase();
    console.log(extension, 'valu extens')
    console.log(validFileExtensions.includes(extension), 'valu extens')
    return validFileExtensions.includes(extension);
}

const checkoutSchema = yup.object().shape({
    Student: yup.mixed()
        .required("This Field is Required")
        .test("is-valid-type", "Invalid file type", (value) => {
            if (!value.length) return true;
            console.log(value, 'valida')
            return isValidFileType(value[0].name);
        })
        .test("is-valid-size", "Max allowed size is 1MB", (value) => {
            if (!value.length) return true;
            return value[0].size <= MAX_FILE_SIZE;
        })
});

export default checkoutSchema;