# User Stories

## Admin User Stories:

1. As an admin, I want to be able to add a new employee to the system by providing their details and assigning them to a team.

   Route: POST /employees
   Request body: {
   "name": "John Doe",
   "email": "johndoe@example.com",
   "team": "Marketing"
   }

2. As an admin, I want to be able to update the details of an existing employee, such as their name, contact information, and team assignment.

   Route: PUT /employees/:id
   Request body: {
   "name": "John Doe",
   "email": "johndoe@example.com",
   "team": "Sales"
   }

3. As an admin, I want to be able to delete an employee from the system.

   Route: DELETE /employees/:id

4. As an admin, I want to view a list of all employees in the organization, including their basic information and team assignment.

   Route: GET /employees

5. As an admin, I want to review and approve timesheets submitted by employees, ensuring accuracy and completion.

   Route: PUT /timesheets/:id/approve

6. As an admin, I want to view a calendar view of timesheets for all employees to track their working hours and projects.

   Route: GET /timesheets/calendar

7. As an admin, I want to be able to accept or reject leave requests submitted by employees, considering factors such as team workload and available leave balance.

   Route: PUT /leave-requests/:id/accept
   Route: PUT /leave-requests/:id/reject

## Employee User Stories:

1. As an employee, I want to view my own profile to see my basic information, contact details, and team assignment.

   Route: GET /employees/:id/profile

2. As an employee, I want to update my personal details, such as my contact information, in case of any changes.

   Route: PUT /employees/:id
   Request body: {
   "email": "johndoe@example.com",
   "phone": "1234567890"
   }

3. As an employee, I want to submit my timesheet along with relevant details and documents to accurately track my working hours on different projects.

   Route: POST /timesheets
   Request body: {
   "project": "Project A",
   "hours": 8,
   "description": "Worked on frontend development"
   }

4. As an employee, I want to view my timesheets in a calendar view to have a clear overview of my working hours and project allocations.

   Route: GET /timesheets/calendar

5. As an employee, I want to submit leave requests to the admin for approval, specifying the start and end dates of my requested leave and the reason for it.

   Route: POST /leave-requests
   Request body: {
   "start_date": "2023-07-10",
   "end_date": "2023-07-15",
   "reason": "Vacation"
   }
