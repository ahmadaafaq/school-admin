/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

const config = {
    bloodGroups: {
        'A+': 'A+',
        'A-': 'A-',
        'B+': 'B+',
        'B-': 'B-',
        'AB+': 'AB+',
        'AB-': 'AB-',
        'O+': 'O+',
        'O-': 'O-'
    },
    casteGroups: {
        'general': 'General',
        'obc': 'OBC',
        'sc': 'SC',
        'st': 'St'
    },
    status: {
        'active': 'Active',
        'inactive': 'Inactive'
    },
    nationality: {
        'indian': 'Indian',
        'nri': 'NRI'
    },
    fee_waiver_type: {
        'partial': 'Partial',
        'full': 'Full'
    },
    gender:{
        'male':'Male',
        'female':'Female',
        'other':'Other'
    },
    admission_type:{
        'regular':'Regular',
        'midsession':'Mid-Session'
    },
    payment_status:{
        'pending':'Pending',
        'partial':'Partial',
        'full':'Full'
    },
    payment_method:{
        'cash':'Cash',
        'credit card':'Credit Card',
        'online transfer':'Online Transfer'
    },
    type:{
        'school':'School',
        'event':'Event',
        'cycle stand':'Cycle Stand',
        'bus':'Bus'
    }          
};

export default config;
