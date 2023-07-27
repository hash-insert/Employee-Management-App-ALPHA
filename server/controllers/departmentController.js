const Department = require('../models/department');

const saveDepartment = async(req,res)=>{
    const newDepartment = Department({
        department_id: req.body.department_id,
        department_name: req.body.department_name,
        manager_id: req.body.manager_id
      });
      try {
            const savedDepartment=await newDepartment.save();
            return res.status(200).send({success:true,Department:savedDepartment});
        } catch (error) {
            return res.status(400).send({success:false,msg:error});
        }
}

const getOneDepartment = async(req,res)=>{
    const filter = {_id :req.params.id};
    const data = await Department.findOne(filter);
    if(data){
        // return res.json(data);
        return res.status(200).send({success:true,Department:data});
    }
    else{
        // return res.json("not available");
        return res.status(400).send({success:false,msg:"data not found"});
    }
}

const getAll = async(req,res)=>{
    const data=await Department.find();
    if(data){
        // return res.json(data);
        return res.status(200).send({success:true,Department:data});
    }
    else{
        // return res.json("not available");
        return res.status(400).send({success:false,msg:"data not found"});
    }
}

const deleteDepartment = async(req,res)=>{
    const filter = {_id :req.params.id};
    const result=await Department.deleteOne(filter);
    if(result){
        // return res.json(data);
        return res.status(200).send({success:true,msg:"data deleted successfully",data:result});
    }
    else{
        // return res.json("not available");
        return res.status(400).send({success:false,msg:"data not found"});
    }
}

const updateDepartment =async(req,res)=>{
    const filter = {_id:req.params.id};
    const options ={
      upsert : true,
      new : true
    };
    try {
        const result=await Department.findOneAndUpdate(filter,{
            department_id: req.body.department_id,
            department_name: req.body.department_name,
            manager_id: req.body.manager_id
        },options);
        return res.status(200).send({success:true,data:result});
    } catch (error) {
        return res.status(400).send({success:false,msg:error});
    }
}

module.exports={saveDepartment,getOneDepartment,getAll,deleteDepartment,updateDepartment};