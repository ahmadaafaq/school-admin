import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import dayjs from "dayjs";

import API from '../../apis';
import { Utility } from "../utility";
import StudentFromComponent from '../student/StudentFormComponent'

const style = {
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, setOpen}) {

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [updatedValues, setUpdatedValues] = useState(null);
  const { toastAndNavigate, findMultipleById } = Utility();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const subjectsInRedux = useSelector(state => state.allSubjects);

  let id = state?.id;

  const populateData = (id) => {
    console.log('id=', id);
    const paths = [`/get-by-pk/student/${id}`, `/get-address/student/${id}`];
    API.CommonAPI.multipleAPICall("GET", paths)
      .then(responses => {
        if (responses[0].data.data) {
          responses[0].data.data.subjects = findMultipleById(responses[0].data.data.subjects, subjectsInRedux?.listData?.rows)
          responses[0].data.data.dob = dayjs(responses[0].data.data.dob);
          responses[0].data.data.admission_date = dayjs(responses[0].data.data.admission_date);
        }
        const dataObj = {
          studentData: responses[0].data.data,
          addressData: responses[1]?.data?.data
        };
        setUpdatedValues(dataObj);
      })
      .catch(err => {
        toastAndNavigate(dispatch, true, "error", err?.response?.data?.msg);
        throw err;
      });
  };

  useEffect(() => {
    if (id) {
      populateData(id);
    }
  }, [id]);

  return (
    <div>
      <Modal
        open={open}

        onClose={handleClose}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box sx={style} >
          <StudentFromComponent
               userId={id}
            updatedValues={updatedValues?.studentData} />
        </Box>
      </Modal>
    </div>
  );
}
