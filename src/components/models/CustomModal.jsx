/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import * as React from 'react';
import { Dialog, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import API from '../../apis';
import { Utility } from "../utility";
import ViewDetail from "./ViewDetail"


export default function BasicModal({ open, setOpen }) {
  // const [open, setOpen] = React.useState(false);
  const [detail, setDetail] = useState(null);
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const subjectsInRedux = useSelector(state => state.allSubjects);

  const dispatch = useDispatch();
  const { state } = useLocation();
  const { toastAndNavigate, findMultipleById } = Utility();
  let id = state?.id;

  const handleClose = () => {
    setOpen(false)
  };

  const populateData = (id) => {
    console.log('id=', id);
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
        toastAndNavigate(dispatch, true, "error", err?.response?.data?.msg);
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
  }, [id]);

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
