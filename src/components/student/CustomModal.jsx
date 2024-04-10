/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { Dialog, Box } from '@mui/material';

import API from '../../apis';
import ViewDetail from "./ViewDetail";

import { Utility } from "../utility";

const BasicModal = ({ open, setOpen }) => {
  const [detail, setDetail] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const subjectsInRedux = useSelector(state => state.allSubjects);

  const dispatch = useDispatch();
  const { state } = useLocation();
  const { toastAndNavigate, findMultipleById } = Utility();
  let id = state?.id;

  const handleClose = () => {
    setOpen(false);
  };

  const populateData = (id) => {
    const paths = [`/get-by-pk/student/${id}`, `/get-address/student/${id}`, `/get-image/student/${id}`];
    API.CommonAPI.multipleAPICall("GET", paths)
      .then(responses => {
        if (responses[0].data.data) {
          responses[0].data.data.subjects = findMultipleById(responses[0].data.data.subjects, subjectsInRedux?.listData?.rows)
        }
        const dataObj = {
          studentData: responses[0].data.data,
          addressData: responses[1]?.data?.data,
          imageData: responses[2]?.data?.data
        };
        setDetail(dataObj);
      })
      .catch(err => {
        toastAndNavigate(dispatch, true, "error", err ? err?.response?.data?.msg : "An Error Occurred");
        throw err;
      });
  };

  useEffect(() => {
    if (id) {
      populateData(id);

      API.CountryAPI.getCountries()
        .then(countries => {
          if (countries.status === 'Success') {
            setCountryData(countries.data.list);

          }
        })
        .catch(err => {
          throw err;
        });

      API.StateAPI.getAllStates()
        .then(states => {
          if (states.status === 'Success') {
            setStateData(states.data.rows);

          }
        })
        .catch(err => {
          throw err;
        });

      API.CityAPI.getAllCities()
        .then(cities => {
          if (cities.status === 'Success') {
            setCityData(cities.data.rows);

          }
        })
        .catch(err => {
          throw err;
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      BackdropProps={{
        style: {
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          opacity: 0.5
        }
      }}
      fullWidth
      maxWidth='md'
    >
      <Box>
        <ViewDetail detail={detail} countryData={countryData} stateData={stateData} cityData={cityData} onClose={handleClose} />
      </Box>
    </Dialog>
  );
};

BasicModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func
};

export default BasicModal;
