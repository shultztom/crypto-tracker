import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { get, filter } from 'lodash';

const getCurrs = async () => {
  try {
    const currResult = await axios.get('https://api.coinbase.com/v2/currencies');
    const currs = get(currResult, 'data.data', []);
    return currs;
  } catch (error) {
    // TODO error handle
    console.log(error.message);
  }
  return [];
};

const CurrencySelector = function (props) {
  const { selectedCurr, setSelectedCurr } = props;
  const [currs, setCurrs] = useState([]);

  useEffect(async () => {
    const allCurrs = await getCurrs();
    setCurrs(allCurrs);
  }, []);

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="p">Currency</Typography>
        </Grid>

        <Grid item tem xs={12}>
          <Select
            value={selectedCurr}
            label="Currency"
            onChange={(e) => setSelectedCurr(e.target.value)}
            fullWidth
          >
            {currs.map((curr) => <MenuItem value={curr.id}>{curr.name}</MenuItem>)}
          </Select>
        </Grid>
      </Grid>
    </Box>

  );
};

export default CurrencySelector;
