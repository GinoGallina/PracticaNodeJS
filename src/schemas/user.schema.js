import mongoose from "mongoose";


const userSchema=mongoose.Schema({
  name:{
    type:String,
    require:true,
    minlen:2,
    maxlen:20,
  },
  surname:{
    type:String,
    require:true,
    minlen:4,
    maxlen:50,
  },
  email:{
    type:String,
    require:true,
  },
  password:{
    type:String,
    require:true,
  },
});

const userModel=mongoose.model('user',userSchema);

export default userModel;