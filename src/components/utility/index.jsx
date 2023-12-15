/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { CommonAPI } from "../../apis/CommonAPI";
import { displayToast } from "../../redux/actions/ToastAction";

export const Utility = () => {
    /** Get initials of logged in user
     */
    const getInitials = () => {
        let firstNameInitial = '';
        let lastNameInitial = '';
        const authInfo = getLocalStorage("auth");

        let fullName = authInfo?.username?.split(" ");
        if (fullName?.length) {
            firstNameInitial = fullName[0][0].toUpperCase();
            if (fullName[1]?.[0] !== undefined) {
                lastNameInitial = fullName[1][0].toUpperCase();
            };
        };
        return `${firstNameInitial} ${lastNameInitial}`;
    };
    /** Get the formatted name and type of the logged in user
     */
    const getNameAndType = () => {
        let firstName = '';
        let lastName = '';
        let formattedType = '';
        const authInfo = getLocalStorage("auth");

        let fullName = authInfo?.username?.split(" ");
        let type = authInfo?.type;
        if (fullName?.length) {
            firstName = fullName[0][0].toUpperCase() + fullName[0].slice(1);
            if (fullName[1]?.[0] !== undefined) {
                lastName = fullName[1][0].toUpperCase() + fullName[1].slice(1);
            };
        };
        if (type?.length) {
            formattedType = type.charAt(0).toUpperCase() + type.slice(1);
        };
        return {
            username: `${firstName} ${lastName}`,
            type: formattedType
        };
    };
    /** Set local storage with specified key value pair
     */
    const setLocalStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    };
    /** Get the specified key from browser's local storage
     */
    const getLocalStorage = (key) => {
        return JSON.parse(localStorage.getItem(key));
    };
    /** Verifying the token authenticity by making API call
     */
    const verifyToken = async () => {
        return CommonAPI.verifyToken()
            .then(verified => {
                console.log('verererfffiieed', verified, verified.data === "Verfified");
                return verified.data === "Verfified";
            })
            .catch(err => {
                throw err;
            });
    };
    /** Display toast message and navigate to the path if provided 
     */
    const toastAndNavigate = (dispatch, display, severity, msg, navigateTo, path = null) => {
        dispatch(displayToast({ toastAlert: display, toastSeverity: severity, toastMessage: msg }));

        setTimeout(() => {
            dispatch(displayToast({ toastAlert: !display, toastSeverity: "", toastMessage: "" }));
            if (path) {
                navigateTo(path);
            }
        }, 2000);
    };
    /** Get user role from localStorage 
    */
    const getRole = () => {
        return getLocalStorage("auth")?.role;
    };

    return {
        getInitials,
        getNameAndType,
        getLocalStorage,
        getRole,
        setLocalStorage,
        toastAndNavigate,
        verifyToken
    };
};
