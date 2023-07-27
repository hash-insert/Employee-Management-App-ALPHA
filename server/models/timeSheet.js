const mongoose = require("mongoose");
const timesheetSchema = new mongoose.Schema(
    {
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