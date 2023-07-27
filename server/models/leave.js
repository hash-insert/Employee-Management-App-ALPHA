const mongoose = require("mongoose");
const leaveRequestSchema = new mongoose.Schema(
    {
        employee_name: {
            type: String,
            required: true,
            maxlength: 100,
          },
          employee_email:{
            type: String,
            required: true,
            maxlength: 100,
          },
          start_date: {
            type: Date,
            required: true,
          },
          end_date: {
            type: Date,
            required: true,
          },
          reason: {
            type: String,
            required: true,
            maxlength: 255,
          },
          status: {
            type: String,
            required: true,
            // default:pending,
            enum: ['pending', 'approved', 'rejected'],
          },
    }
)

module.exports = mongoose.model("leaveRequest", leaveRequestSchema);