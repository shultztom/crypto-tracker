import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { get } from 'lodash';
import moment from 'moment';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CoinSelector from './components/CoinSelector';
import CurrencySelector from './components/CurrencySelector';

/*
  1. Get current spot price -> https://api.coinbase.com/v2/prices/:currency_pair/spot
  2. Get price from beginning of day -> https://api.coinbase.com/v2/prices/:currency_pair/spot?date=YYYY-MM-DD (UTC)
  3. Calc diff
    a. Set Green Background if positive
    b. Set Red Background if negative
    c. Leave Gray if same
  */

// Format Date as YYYY-MM-DD in UTC
const getSpotPrice = async (selectedCoin, selectedCurr, date = null) => {
  let url = `https://api.coinbase.com/v2/prices/${selectedCoin}-${selectedCurr}/spot`;
  if (date) {
    url += `?date=${date}`;
  }

  try {
    const spotPriceResult = await axios.get(url);
    const spotPrice = get(spotPriceResult, 'data.data.amount', null);
    return spotPrice;
  } catch (error) {
    // TODO error handle
    console.log(error.message);
  }
  return null;
};

const App = function () {
  const [primaryColor, setPrimaryColor] = useState('#FAF9F6');
  // Red - #e51e1e
  // Green - #008a1b
  // Default Gray - #FAF9F6
  const themeMemo = React.useMemo(
    () => createTheme({
      palette: {
        background: {
          default: primaryColor,
        },
      },
    }),
    [primaryColor],
  );

  const theme = createTheme(themeMemo);

  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [selectedCurr, setSelectedCurr] = useState('USD');
  const [spotPrice, setSpotPrice] = useState(null);
  const [todaysSpotPrice, setTodaysSpotPrice] = useState(null);
  const [diff, setDiff] = useState(null);

  useEffect(async () => {
    const newSpotPrice = await getSpotPrice(selectedCoin, selectedCurr);
    setSpotPrice(newSpotPrice);

    const newTodaysSpotPrice = await getSpotPrice(
      selectedCoin,
      selectedCurr,
      moment().utc().format('YYYY-MM-DD'),
    );
    setTodaysSpotPrice(newTodaysSpotPrice);

    const newDiff = newSpotPrice - newTodaysSpotPrice;
    setDiff(newDiff);

    if (newDiff > 0) {
      setPrimaryColor('#008a1b');
    } else if (newDiff < 0) {
      setPrimaryColor('#e51e1e');
    } else {
      setPrimaryColor('#FAF9F6');
    }
  }, [selectedCoin, selectedCurr]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,

          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h2">Crypto Tracker</Typography>
            </Grid>

            <Grid item xs={6}>
              <CoinSelector selectedCoin={selectedCoin} setSelectedCoin={setSelectedCoin} />
            </Grid>

            <Grid item xs={6}>
              <CurrencySelector selectedCurr={selectedCurr} setSelectedCurr={setSelectedCurr} />
            </Grid>

            {spotPrice && (
              <Grid item xs={12}>
                <Typography align="right" variant="h2">{Number(spotPrice).toFixed(2)}</Typography>
                <Typography align="right" variant="h5">{selectedCurr}</Typography>
              </Grid>
            )}

          </Grid>
        </Box>
        {(todaysSpotPrice && diff) && (
          <Box
            sx={{
              marginTop: 12,

            }}
          >
            <Grid item xs={12}>
              <Typography variant="h4">Start of Day Price</Typography>
              <Typography align="right" variant="h2">{Number(todaysSpotPrice).toFixed(2)}</Typography>
              <Typography align="right" variant="h5">{selectedCurr}</Typography>
              <Typography align="right" variant="h5">
                {diff > 0 && <ArrowDropUpIcon />}
                {diff < 0 && <ArrowDropDownIcon />}
                {' '}
                {Number(diff).toFixed(2)}
              </Typography>
            </Grid>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default App;
