/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

import { Box, Button, useTheme } from '@mui/material';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

import API from "../../apis";
// import { setClasses } from "../../redux/actions/ClassAction";
// import { setSections } from "../../redux/actions/SectionAction";
import { tokens } from "../../theme";
import { Utility } from "../utility";
import { useCommon } from "../hooks/common";

export const datagridColumns = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { getPaginatedData } = useCommon();
    const { appendSuffix, findById } = Utility();

    const handleActionEdit = (id) => {
        navigateTo(`/school-period/update/${id}`, { state: { id: id } });
    };

    // useEffect(() => {
    //     if (!classesInRedux?.listData?.rows?.length) {
    //         getPaginatedData(0, 20, setClasses, API.ClassAPI);
    //     }
    // }, [classesInRedux?.listData?.rows?.length]);

    // useEffect(() => {
    //     if (!sectionsInRedux?.listData?.rows?.length) {
    //         getPaginatedData(0, 20, setSections, API.SectionAPI);
    //     }
    // }, [sectionsInRedux?.listData?.rows?.length]);

    const columns = [
        {
            field: "period",
            headerName: "Period",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 120,
        },
        {
            field: "halves",
            headerName: "Halves",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 100
        },
        {
            field: "recess_time",
            headerName: "Recess Time",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 100
        },
        {
            field: "first_half_period_duration",
            headerName: "First Half periods Duration",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 100
        },
        {
            field: "second_half_period_duration",
            headerName: "Second Half periods Duration",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 100
        },
        {
            field: "opening_time",
            headerName: "Opening Time",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 100
        },
        {
            field: "closing_time",
            headerName: "Closing Time",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 100
        },
        {
            field: "action",
            headerName: "ACTION",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 75,
            renderCell: ({ row: { id } }) => {
                return (
                    <Box width="30%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center">
                        <Button color="info" variant="contained"
                            onClick={() => handleActionEdit(id)}
                            sx={{ minWidth: "50px" }}
                        >
                            <DriveFileRenameOutlineOutlinedIcon />
                        </Button>
                    </Box>
                );
            },
        }
    ];
    return columns;
};
