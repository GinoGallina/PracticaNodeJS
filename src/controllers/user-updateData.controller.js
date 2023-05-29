import UserModel from "../schemas/user.schema.js";

const userUpdateDataController = async (req,res)=>{
  const {id} = req;
  const {name,surname} = req.body;
  const userByID=await UserModel.findById(id).exec();
  if(!userByID) return res.status(401).send('Usuario no autorizado,no existe');

  userByID.name=name;
  userByID.surname=surname;

  await userByID.save()
  return res.send('Usuario actualizado')
}

export default userUpdateDataController;
