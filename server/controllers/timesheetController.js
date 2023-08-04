// import Timesheet from '../models/timeSheet';
const Timesheet = require("../models/timeSheet");

const saveTimeSheet = async(req,res)=>{
    const newTimesheet = Timesheet({
        employee_name:req.body.employee_name,
        employee_email:req.body.employee_email,
        project_name:req.body.project_name,
        activity:req.body.activity,
        date:req.body.date,
        duration:req.body.duration,
        status:req.body.status
      });
      try {
            const savedTimesheet=await newTimesheet.save();
            return res.status(200).send({success:true,Timesheet:savedTimesheet});
        } catch (error) {
            return res.status(400).send({success:false,msg:error});
        }
}

const getOneTimesheet = async (req, res) => {
  const filter = { _id: req.params.id };
  const data = await Timesheet.findOne(filter);
  if (data) {
    // return res.json(data);
    return res.status(200).send({ success: true, Timesheet: data });
  } else {
    // return res.json("not available");
    return res.status(400).send({ success: false, msg: "data not found" });
  }
};

const getAll = async (req, res) => {
  const data = await Timesheet.find();
  if (data) {
    // return res.json(data);
    return res.status(200).send({ success: true, Timesheet: data });
  } else {
    // return res.json("not available");
    return res.status(400).send({ success: false, msg: "data not found" });
  }
};

const getByEmail = async(req,res)=>{
    const filter = {employee_email :req.params.email};
    console.log(filter)
    const result = await Timesheet.find(filter);
    // console.log(result)
    try {
        // Find all leave requests with the matching email
        // const leaveRequests = await leaveRequest.find({ email: filter });
        return res.status(200).send({success:true,data:result});
      } catch (error) {
        res.status(500).json({ message: 'Error fetching Time Sheets' });
      }
}

const deleteTimesheet = async(req,res)=>{
    const filter = {_id :req.params.id};
    const result=await Timesheet.deleteOne(filter);
    if(result){
        // return res.json(data);
        return res.status(200).send({success:true,msg:"data deleted successfully",data:result});
    }
    else{
        // return res.json("not available");
        return res.status(400).send({success:false,msg:"data not found"});
    }
}

const updateTimesheet = async(req,res)=>{
    const filter = {_id:req.params.id};
    const options ={
      upsert : true,
      new : true
    };
    try {
        const result=await Timesheet.findOneAndUpdate(filter,{
            employee_name:req.body.employee_name,
            employee_email:req.body.employee_email,
            project_name:req.body.project_name,
            activity:req.body.activity,
            date:req.body.date,
            duration:req.body.duration,
            status:req.body.status
        },options);
        return res.status(200).send({success:true,data:result});
    } catch (error) {
        return res.status(400).send({success:false,msg:error});
    }
}

module.exports={saveTimeSheet,getOneTimesheet,getAll,getByEmail,deleteTimesheet,updateTimesheet}
