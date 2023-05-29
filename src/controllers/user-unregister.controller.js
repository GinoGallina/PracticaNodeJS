import UserModel from "../schemas/user.schema.js";
import {compare} from "bcrypt";


const userUnregisterController = async (req,res)=>{
  const {id} = req;
  const {password} = req.body;
  const userByID=await UserModel.findById(id).exec();
  if(!userByID) return res.status(401).send('Usuario no autorizado,no existe');
  const checkPass= await compare(password,userByID.password)
  if(!checkPass) return res.status(401).send('Credenciales incorrectas');

  await userByID.deleteOne();


  return res.send("Usuario eliminado")
}

export default userUnregisterController;