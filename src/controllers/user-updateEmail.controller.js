import UserModel from "../schemas/user.schema.js";
import {compare} from "bcrypt";

const userUpdateEmailController = async (req,res)=>{
  const {id} = req;
  const {email,password} = req.body;
  const userByID=await UserModel.findById(id).exec();
  if(!userByID) return res.status(401).send('Usuario no autorizado,no existe');

  const checkPass= await compare(password,userByID.password)
  if(!checkPass) return res.status(401).send('Credenciales incorrectas');

  userByID.email=email;

  await userByID.save()
  return res.send('Usuario((email) actualizado')
}

export default userUpdateEmailController;
