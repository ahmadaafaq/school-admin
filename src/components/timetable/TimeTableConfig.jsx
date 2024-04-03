/* eslint-disable react-hooks/rules-of-hooks */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box, Button, useTheme } from "@mui/material";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";

import { Utility } from "../utility";

export const datagridColumns = () => {
  const schoolClasses = useSelector((state) => state.schoolClasses);
  const allClasses = useSelector((state) => state.allClasses);
  const schoolSections = useSelector((state) => state.schoolSections);
  const allSections = useSelector((state) => state.allSections);

  const navigateTo = useNavigate();
  const { appendSuffix, findById } = Utility();

  const handleActionEdit = (class_id, section_id, day) => {
    navigateTo(`/time-table/update/${class_id}/${section_id}`, {
      state: { class_id: class_id, section_id: section_id, day: day },
    });

  };

  const columns = [
    {
      field: "class_id",
      headerName: "Class",
      headerAlign: "center",
      align: "center",
      flex: 1,
      // width: 120,
      renderCell: (params) => {
        let className;
        let sectionName;

        if (allClasses?.listData?.length || allSections?.listData?.length) {
          className = findById(
            params?.row?.class_id,
            allClasses?.listData
          )?.class_name;
          sectionName = findById(
            params?.row?.section_id,
            allSections?.listData
          )?.section_name;
        } else if (
          schoolClasses?.listData?.length ||
          schoolSections?.listData?.length
        ) {
          className = findById(
            params?.row?.class_id,
            schoolClasses?.listData
          )?.class_name;
          sectionName = findById(
            params?.row?.section_id,
            schoolSections?.listData
          )?.section_name;
        }
        return (
          <div>
            {className ? appendSuffix(className) : "/"} {sectionName}
          </div>
        );
      },
    },
    {
        field: "day",
        headerName: "Day",
        headerAlign: "center",
        align: "center",
        flex: 1,
        // minWidth: 100,
        valueGetter: (params) => `${params.row.day.charAt(0).toUpperCase() + params.row.day.slice(1) || ''} `

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
      headerName: "Duration",
      headerAlign: "center",
      align: "center",
      flex: 1,
      // minWidth: 100
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      align: "center",
      flex: 1,
      // minWidth: 75,
      renderCell: ({ row: { class_id, section_id, day } }) => {
        return (
          <Box
            width="30%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
          >
            <Button
              color="info"
              variant="contained"
              onClick={() => handleActionEdit(class_id, section_id, day)}
              sx={{ minWidth: "50px" }}
            >
              <DriveFileRenameOutlineOutlinedIcon />
            </Button>
          </Box>
        );
      },
    },
  ];
  return columns;
};
