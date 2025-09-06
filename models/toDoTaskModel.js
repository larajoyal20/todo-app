const mongoose=require("mongoose");
const taskSchema=mongoose.Schema({
  title:{
    type:String
  },
  description:{
    type:String
  },
  status:{
    type:String
  },
  priority:{
    type:String
  },
  duedate:{
    type:Date
  },
  category:{
    type:String
  },
  user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', // This links the task to the Users collection
        required: true
    }
},{ timestamps: true });
let Tasks=new mongoose.model("task",taskSchema);
module.exports=Tasks;
