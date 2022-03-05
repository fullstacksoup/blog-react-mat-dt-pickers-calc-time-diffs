import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function formatDateTime(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');  
  const day = String(date.getDay()).padStart(2, '0');  
  const year = date.getFullYear();  
  var hours = date.getHours();  
  var minutes = String(date.getMinutes()).padStart(2, '0');
  var seconds = String(date.getSeconds()).padStart(2, '0');
  var meridiem = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'  
  
  var dataTimeStr = month  + '/' + day  + '/' + year + '  ' + hours + ':' + minutes + ':'+ seconds + ' ' + meridiem ;
  return dataTimeStr;
}

export default function DataTimeCompare() {
  const now = new Date();
  const today = now.setHours(9,0,0,0);
  const tomorrow = new Date(now.setDate(now.getDate() + 1));
  const nextWeek = new Date(now.setDate(now.getDate() + 7)).setHours(18,0,0,0);
  
  const [currentTime, setCurrentTime] = React.useState(today);
  const [startDateValue, setStartDateValue] = React.useState(tomorrow);
  const [endDateValue, setEndDateValue] = React.useState(nextWeek);
  const [isValid, setIsValid] = React.useState(false);

  React.useEffect(() => {
    // Set interval for every second
    const timer = setInterval(() => {    
      const today = new Date();
      const time = formatDateTime(today)
      setCurrentTime(time);
    }, 1 * 1000); // 1 second

    return () => {
      clearInterval(timer); // Return a function to clear the timer to stop being called on unmount
    }
  }, []);

  useEffect(() => {
    if(startDateValue  < endDateValue) {
      console.log()
      setIsValid(true);
    }
  }, [startDateValue, endDateValue])
 
  function getTimeDiffSQLServerDates(startDateTime, endDateTime) {
    var sDate = new Date(startDateTime) // Convert to JavaScript Date Time
    var eDate = new Date(endDateTime) // Convert to JavaScript Date Time

    console.log('sDate', sDate)
    console.log('eDate', eDate)
    
    var diffMs = (eDate - sDate); // milliseconds between the two dates
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    
    return Math.abs(diffMins);      
  }

  const timeComp = () => {    
    var diffMs = (endDateValue - startDateValue); // milliseconds between the two dates
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

    return (
      <>
      <Typography variant="body2">
        { `${diffDays} + days, ${diffHrs} + hours, ${diffMins} minutes between Start and End Dates`}
      </Typography>
      </>
    )
    
  }

  const timeToEvent = () => {
    var today = new Date();    
    var diffMs = (startDateValue - today); // milliseconds between the two dates
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    
    return (
      <>
      <Typography variant="body2">
        { `${diffDays} + days, ${diffHrs} + hours, ${diffMins} minutes from now until the Start Date`}
      </Typography>
      </>
    )
    
  }


  return (
    <Container maxWidth='lg' sx={{marginTop: '8vh'}}>
     <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
      
      <Grid item xs={4} align="left"></Grid>

      <Grid item xs={4} align="center">
      
      <Typography variant="h6">
          {currentTime}
      </Typography>
      
      </Grid>
      
      <Grid item xs={4} align="right"></Grid>
      
        <Grid item xs={2} align="left"></Grid>
        <Grid item xs={4} align="right">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="Start Date"
            value={startDateValue}
            onChange={(newValue) => {
            setStartDateValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} sx={{ width: 240 }}/>}
        />
          
          </LocalizationProvider>

          
        </Grid>
        <Grid item xs={4} align="left">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                fullWidth
                disablePast
                label="End Date"                                        
                value={endDateValue}
                onChange={(newValue) => {
                setEndDateValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} sx={{ width: 240 }}/>}
            />
            </LocalizationProvider>

          
        </Grid>
        <Grid item xs={2} align="left"></Grid>

      
        <Grid item xs={12} align="center">
          {timeComp()}
        </Grid>
        <Grid item xs={12} align="center">
          {timeToEvent()}
        </Grid>
        

      </Grid>
    </Box>


    </Container>
  );
}

