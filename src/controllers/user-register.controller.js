import UserModel from "../schemas/user.schema.js";
import {hash} from "bcrypt";

const userRegisterController = async (req,res)=>{
  const {_id,name,surname,email,password} = req.body;
  const userByID=await UserModel.findById(_id).exec();
  if(userByID) return res.status(409).send('Ya existe un usuario con ese id');
  const userByEmail= await UserModel.findOne({email}).exec();
  if(userByEmail) return res.status(409).send('Ya existe un usuario con ese email');

  const hashedPassword= await hash(password,12);

  const user= new UserModel({
    _id,
    name,
    surname,
    email,
    password:hashedPassword
  })

  await user.save();
  return res.status(201).send('Usuario registrado con exito')
}

export default userRegisterController;