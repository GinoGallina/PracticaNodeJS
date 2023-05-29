import UserModel from "../schemas/user.schema.js";
import {compare,hash} from "bcrypt";


const userUpdatePasswordController = async (req,res)=>{
  const {id} = req;
  const {passwordActual,passwordNueva} = req.body;
  const userByID=await UserModel.findById(id).exec();
  if(!userByID) return res.status(401).send('Usuario no autorizado,no existe');

  const checkPass= await compare(passwordActual,userByID.password)
  if(!checkPass) return res.status(401).send('Credenciales incorrectas');

  const hashedPassword= await hash(passwordNueva,12)

  userByID.password=hashedPassword;

  await userByID.save()
  return res.send('Usuario((contraseña) actualizada')
}

export default userUpdatePasswordController;
