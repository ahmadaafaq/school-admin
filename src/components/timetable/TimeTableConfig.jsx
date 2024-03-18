/* eslint-disable react-hooks/rules-of-hooks */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { useNavigate } from "react-router-dom";

import { Box, Button } from '@mui/material';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

export const datagridColumns = () => {
    const navigateTo = useNavigate();

    const handleActionEdit = (class_id, section_id, day) => {
        navigateTo(`/time-table/update/${class_id}/${section_id}`, { state: { class_id: class_id, section_id: section_id, day: day } });
    };

    const columns = [
        {
            field: "day",
            headerName: "Day",
            headerAlign: "center",
            align: "center",
            flex: 1,
            // width: 120,
        },
        {
            field: "class_id",
            headerName: "Class",
            headerAlign: "center",
            align: "center",
            flex: 1,
            // minWidth: 100
        },
        {
            field: "subject_id",
            headerName: "Subject",
            headerAlign: "center",
            align: "center",
            flex: 1,
            // minWidth: 100
        },
        {
            field: "duration",
            headerName: "Duration in Mintues",
            headerAlign: "center",
            align: "center",
            flex: 1,
            // minWidth: 100
        },
        {
            field: "action",
            headerName: "ACTION",
            headerAlign: "center",
            align: "center",
            flex: 1,
            // minWidth: 75,
            renderCell: ({ row: { class_id, section_id, day } }) => {
                return (
                    <Box width="30%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center">
                        <Button color="info" variant="contained"
                            onClick={() => handleActionEdit(class_id, section_id, day)}
                            sx={{ minWidth: "50px" }}
                        >
                            <DriveFileRenameOutlineOutlinedIcon />
                        </Button>
                    </Box>
                );
            }
        }
    ];
    return columns;
};
