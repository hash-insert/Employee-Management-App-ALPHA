const mongoose = require("mongoose");
const timesheetSchema = new mongoose.Schema(
    {
        employee_name:{
            type:String,
            required:true
        },
        employee_email:{
            type:String,
            required:true
        },
        project_name:{
            type:String,
            required:true
        },
        activity:{
            type:String,
            required:true
        },
        date:{
            type:String,
            required:true
        },
        duration:{
            type:String,
            required:true
        },
        status:{
            type:String,
            required:true
        }
    }
)

module.exports = mongoose.model("timesheet", timesheetSchema);
