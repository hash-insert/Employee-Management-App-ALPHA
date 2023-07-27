const leaveRequest = require('../models/leave')

const saveleaveRequest = async (req, res) => {
    const newRequest = leaveRequest({
        employee_name: req.body.employee_name,
        employee_email:req.body.employee_email,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        reason: req.body.reason,
        status: req.body.status,
    });
    try {
        const savenewRequest = await newRequest.save();
        return res.status(200).send({success:true,leaveRequest:savenewRequest});
    } catch (error) {
        return res.status(400).send({success:false,msg:error});
    }
}

const getOneLeaveRequest = async(req,res)=>{
    const filter = {_id :req.params.id};
    const data = await leaveRequest.findOne(filter);
    if(data){
        // return res.json(data);
        return res.status(200).send({success:true,leaveRequest:data});
    }
    else{
        // return res.json("not available");
        return res.status(400).send({success:false,msg:"data not found"});
    }
}

const getAll = async(req,res)=>{
    const data=await leaveRequest.find();
    if(data){
        // return res.json(data);
        return res.status(200).send({success:true,leaveRequest:data});
    }
    else{
        // return res.json("not available");
        return res.status(400).send({success:false,msg:"data not found"});
    }
}

const getAllByEmail = async(req,res)=>{
    const filter = {employee_email :req.params.email};
    console.log(filter)
    const result = await leaveRequest.find(filter);
    // console.log(result)
    try {
        // Find all leave requests with the matching email
        // const leaveRequests = await leaveRequest.find({ email: filter });
        return res.status(200).send({success:true,data:result});
      } catch (error) {
        res.status(500).json({ message: 'Error fetching leave requests' });
      }
}

const deleteLeaveRequest = async(req,res)=>{
    const filter = {_id :req.params.id};
    const result=await leaveRequest.deleteOne(filter);
    if(result){
        // return res.json(data);
        return res.status(200).send({success:true,msg:"data deleted successfully",data:result});
    }
    else{
        // return res.json("not available");
        return res.status(400).send({success:false,msg:"data not found"});
    }
}

const updateLeaveRequest =async(req,res)=>{
    const filter = {_id:req.params.id};
    const options ={
      upsert : true,
      new : true
    };
    try {
        const result=await leaveRequest.findOneAndUpdate(filter,{
            employee_name: req.body.employee_name,
            employee_email:req.body.employee_email,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            reason: req.body.reason,
            status: req.body.status,
        },options);
        return res.status(200).send({success:true,data:result});
    } catch (error) {
        return res.status(400).send({success:false,msg:error});
    }
}


module.exports = {saveleaveRequest,getOneLeaveRequest,getAll,getAllByEmail,deleteLeaveRequest,updateLeaveRequest};