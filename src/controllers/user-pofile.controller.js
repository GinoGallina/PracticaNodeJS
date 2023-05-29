import UserModel from "../schemas/user.schema.js";

const userProfileController = async (req,res)=>{
  const {id} = req;
  const userByID=await UserModel.findById(id).exec();
  if(!userByID) return res.status(401).send('Usuario no autorizado,no existe');

  const {_id,name,surname,email}= userByID

  return res.send({_id,name,surname,email})
}

export default userProfileController;