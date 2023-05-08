import React from 'react';
import { Booking } from './pages/Booking';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Container } from '@mui/material';
import './App.css';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth='sm' sx={{ padding: '50px 0' }}>
        <Booking />
      </Container>
    </LocalizationProvider>
  );
}

export default App;
