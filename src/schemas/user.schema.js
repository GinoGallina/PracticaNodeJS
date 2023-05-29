import mongoose from "mongoose";


const userSchema=mongoose.Schema({
  _id:{
    type:String,
    unique:true,
    _id:false,
  },
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
    unique:true,
  },
  password:{
    type:String,
    require:true,
  },
});

const UserModel=mongoose.model('user',userSchema);

export default UserModel;