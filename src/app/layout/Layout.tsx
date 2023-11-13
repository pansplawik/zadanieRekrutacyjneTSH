import { Link, Outlet } from 'react-router-dom';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AppRoute } from 'routing/AppRoute.enum';
import './Layout.css';
import { Checkbox, FormControlLabel, ThemeProvider, createTheme } from '@mui/material';
import { SearchBar } from 'app/components/search/SearchInput';
import { useLogin } from 'context/viewType/userContext';
import Avatar from './Avatar.png';
import { useState } from 'react';
function AppBarLabel(label: string) {
  const { handleButtonClick, login } = useLogin();

  return (
    <Toolbar
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{
          color: '#1A1B1D',
          fontFamily: 'Nunito',
          fontSize: '3rem',
          fontStyle: 'normal',
          fontWeight: 600,
          lineHeight: '5rem',
          padding: '3.5rem',
        }}
      >
        {label}
      </Typography>
      <SearchBar />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Checkbox
          defaultChecked
          sx={{
            color: 'blue',
            '&.Mui-checked': {
              color: 'blue',
            },
          }}
        />
        <Typography
          sx={{
            color: '#1A1B1D',
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontSize: '1.5rem',
            lineHeight: '2.5rem',
            fontWeight: 600,
          }}
        >
          Acitve
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Checkbox
          defaultChecked
          sx={{
            color: 'blue',
            '&.Mui-checked': {
              color: 'blue',
            },
          }}
        />
        <Typography
          sx={{
            color: '#1A1B1D',
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontSize: '1.5rem',
            lineHeight: '2.5rem',
            fontWeight: 600,
          }}
        >
          Promo
        </Typography>
      </div>

      <div style={{ paddingRight: 500 }} />
      {!login ? (
        <button type="button" className="blue-button" onClick={handleButtonClick}>
          Login
        </button>
      ) : (
        <div>
          <img src={Avatar} loading="lazy" alt="" onClick={() => handleButtonClick()} />
        </div>
      )}
    </Toolbar>
  );
}

const darkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FFF',
    },
  },
});
export const Layout = () => {
  return (
    <div className="app">
      <Stack spacing={2} sx={{ flexGrow: 1 }}>
        <ThemeProvider theme={darkTheme}>
          <AppBar position="static" color="primary">
            {AppBarLabel('join.tsh.io')}
          </AppBar>
        </ThemeProvider>
      </Stack>
      <main className="app__main">
        <Outlet />
      </main>
    </div>
  );
};
