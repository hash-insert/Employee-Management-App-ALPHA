import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LeaveRequests from './leaveRequests'


const LeaveRequestForm = () => {
    // const [date, setDate] = useState("");
    // const [reason, setReason] = useState("");

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setDate("");
    //     setReason("");
       
    //     onSubmit({date,reason})
    // };
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');
    const [status, setStatus] = useState('pending');
    const API_URL = "https://server-sx5c.onrender.com";
    const handleSubmit = (e) => {
        e.preventDefault();
        const leaveRequestData = {
            employee_name: name,
            employee_email: email,
            start_date: startDate,
            end_date: endDate,
            reason: reason,
            status: status,
        };
        console.log(leaveRequestData)
        axios.post(`${API_URL}/leaverequest/save`, leaveRequestData)
        .then(() => {
          // Clear the form after successful submission
          setName('');
          setEmail('');
          setStartDate('');
          setEndDate('');
          setReason('');
  
          // Fetch the updated leave requests to update the table
        //   fetchLeaveRequests();
            <LeaveRequests />
          alert('Leave request submitted successfully!');

        })
        .catch((error) => {
          console.log('Error submitting leave request:', error);
          alert('Error submitting leave request. Please try again.');
        });
    }

    return (
        // <div>
        //     <form onSubmit={ handleSubmit }>
        //         <label>From:</label>
        //         <input type='date' value = {date} onChange={(e) => setDate(e.target.value)} required/> <br />

        //         <label>To:</label>
        //         <input type='date' value = {date} onChange={(e) => setDate(e.target.value)} required/> <br />
            
        //         <label>Reason:</label>
        //         <input type='text' value={ reason } onChange={ (e) => setReason(e.target.value)} required/> <br />
            
        //         <button type='submit'>Submit</button>
        //     </form>
        // </div>
        <div style={{marginLeft: '30%'}}>
        <Card sx={{ maxWidth: 500 }}>
            <CardContent>
            <Typography variant='h3'  gutterBottom><h2>Leave Request Form</h2></Typography>
                <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="email">E-mail:</label>
                    <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="endDate">End Date:</label>
                    <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="reason">Reason:</label>
                    <textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="status">Status:</label>
                    <h3>pending</h3>
                </div>
                <Box textAlign='center'>
                <Button variant="contained" type="submit">Submit</Button>
                </Box>
                </form>
            </CardContent>
        </Card>
      </div>
    );
};

export default LeaveRequestForm;
