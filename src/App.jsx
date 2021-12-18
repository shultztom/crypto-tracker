import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CoinSelector from './components/CoinSelector';
import CurrencySelector from './components/CurrencySelector';

// Red - #e51e1e
// Green - #008a1b
// Default Gray - #FAF9F6
const theme = createTheme({
  palette: {
    background: {
      default: '#FAF9F6',
    },
  },
});

const App = function () {
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [selectedCurr, setSelectedCurr] = useState('USD');

  // TODO
  /*
  1. Get current spot price -> https://api.coinbase.com/v2/prices/:currency_pair/spot
  2. Get price from beginning of day -> https://api.coinbase.com/v2/prices/:currency_pair/spot?date=YYYY-MM-DD (UTC)
  3. Calc diff
    a. Set Green Background if positive
    b. Set Red Background if negative
    c. Leave Gray if same
  */

  //

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
              <Typography variant="h4">Crypto Tracker</Typography>
            </Grid>

            <Grid item xs={6}>
              <CoinSelector selectedCoin={selectedCoin} setSelectedCoin={setSelectedCoin} />
            </Grid>

            <Grid item xs={6}>
              <CurrencySelector selectedCurr={selectedCurr} setSelectedCurr={setSelectedCurr} />
            </Grid>

          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
