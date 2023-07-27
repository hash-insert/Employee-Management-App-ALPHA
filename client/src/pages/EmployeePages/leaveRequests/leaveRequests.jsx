import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth, db } from '../../../config/firebase';
import LeaveRequestForm from './leaveRequestForm';
import './leaveRequest.css';

const EmpleaveRequests = () => {
    const [showForm, setShowForm] = useState(false);
    const [leaveRequests, setLeaveRequests] = useState([]);
    const API_URL = "https://server-sx5c.onrender.com";
    const currentUser = auth.currentUser;
    // const [leaveData, setLeaveData] = useState([
    //     { id: 1, date: "2023-07-01", reason: "Vacation", status: "approved" },
    //     { id: 2, date: "2023-07-05", reason: "Personal", status: "denied" },
    //     { id: 3, date: "2023-07-10", reason: "Sick", status: "approved" },
    // ]);

    const handleFormVisibility = () => {
        setShowForm(!showForm);
    }

    const handleFormSubmit = (newLeaveRequest) => {
        setLeaveData([newLeaveRequest, ...leaveData]);
        setShowForm(false);
    }
    useEffect(() => {
        // Fetch leave requests from the backend API
        axios.get(`${API_URL}/leaverequest/getAll/${currentUser.email}`)
            .then((response) => {
                console.log(response)
                setLeaveRequests(response.data.data);
            })
            .catch((error) => {
                console.log('Error fetching leave requests:', error);
            });
    }, []);

    return (
        <div>

            {!showForm && <div className='header'>
                <h1>Leave Requests</h1>
                <h1><button onClick={handleFormVisibility}>+</button></h1>
            </div>}

            {showForm ? (<LeaveRequestForm />) : (
                // <div className='header'>
                //     <h1>Leave Requests</h1>
                //     <h1><button onClick={handleFormVisibility}>+</button></h1>
                // </div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Reason</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaveRequests.map((leaveRequest) => (
                            <tr key={leaveRequest._id}>
                                <td>{leaveRequest.employee_name}</td>
                                <td>{leaveRequest.employee_email}</td>
                                <td>{leaveRequest.start_date}</td>
                                <td>{leaveRequest.end_date}</td>
                                <td>{leaveRequest.reason}</td>
                                <td>{leaveRequest.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

        </div>
    );
};

export default EmpleaveRequests;