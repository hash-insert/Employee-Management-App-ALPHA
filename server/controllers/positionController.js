const Position = require('../models/position');

const savePosition = async(req,res)=>{
    const newPosition = Position({
        position_id: req.body.position_id,
        position_title: req.body.position_title,
        department_id: req.body.department_id
      });
      try {
            const savedPosition=await newPosition.save();
            return res.status(200).send({success:true,artist:savedPosition});
        } catch (error) {
            return res.status(400).send({success:false,msg:error});
        }
}

const getOnePosition = async(req,res)=>{
    const filter = {_id :req.params.id};
    const data = await Position.findOne(filter);
    if(data){
        // return res.json(data);
        return res.status(200).send({success:true,Position:data});
    }
    else{
        // return res.json("not available");
        return res.status(400).send({success:false,msg:"data not found"});
    }
}

const getAll = async(req,res)=>{
    const data=await Position.find();
    if(data){
        // return res.json(data);
        return res.status(200).send({success:true,Position:data});
    }
    else{
        // return res.json("not available");
        return res.status(400).send({success:false,msg:"data not found"});
    }
}

const deletePosition = async(req,res)=>{
    const filter = {_id :req.params.id};
    const result=await Position.deleteOne(filter);
    if(result){
        // return res.json(data);
        return res.status(200).send({success:true,msg:"data deleted successfully",data:result});
    }
    else{
        // return res.json("not available");
        return res.status(400).send({success:false,msg:"data not found"});
    }
}

const updatePosition =async(req,res)=>{
    const filter = {_id:req.params.id};
    const options ={
      upsert : true,
      new : true
    };
    try {
        const result=await Position.findOneAndUpdate(filter,{
            position_id: req.body.position_id,
            position_title: req.body.position_title,
            department_id: req.body.department_id
        },options);
        return res.status(200).send({success:true,data:result});
    } catch (error) {
        return res.status(400).send({success:false,msg:error});
    }
}

module.exports={savePosition,getOnePosition,getAll,deletePosition,updatePosition};