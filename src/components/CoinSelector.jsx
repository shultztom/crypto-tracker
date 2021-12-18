import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { get, filter } from 'lodash';

const getCoins = async () => {
  try {
    const currResult = await axios.get('https://api.pro.coinbase.com/currencies');
    const allCurr = get(currResult, 'data', []);
    const coins = filter(allCurr, (o) => o.details.type === 'crypto');
    return coins;
  } catch (error) {
    // TODO error handle
    console.log(error.message);
  }
  return [];
};

const CoinSelector = function (props) {
  const { selectedCoin, setSelectedCoin } = props;
  const [coins, setCoins] = useState([]);

  useEffect(async () => {
    const allCoins = await getCoins();
    setCoins(allCoins);
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
          <Typography variant="p">Coin</Typography>
        </Grid>

        <Grid item tem xs={12}>
          <Select
            value={selectedCoin}
            label="Coin"
            onChange={(e) => setSelectedCoin(e.target.value)}
            fullWidth
          >
            {coins.map((coin) => <MenuItem value={coin.id}>{coin.name}</MenuItem>)}
          </Select>
        </Grid>
      </Grid>
    </Box>

  );
};

export default CoinSelector;
