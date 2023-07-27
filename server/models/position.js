const mongoose=require('mongoose');
const positionSchema = new mongoose.Schema({
    position_id: {
        type:Number,
        required:true,
    },
    position_title:  {
        type:String,
        required:true,
    },
    department_id: {
        type:Number,
        required:true,
    },
});

module.exports=mongoose.model('position', positionSchema);