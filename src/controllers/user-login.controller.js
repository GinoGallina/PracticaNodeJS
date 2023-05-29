import UserModel from "../schemas/user.schema.js";
import {compare} from "bcrypt";
import {SignJWT} from "jose";

const userLoginController = async (req,res)=>{
  const {email,password} = req.body;
  const userByEmail= await UserModel.findOne({email}).exec();
  if(!userByEmail) return res.status(401).send('Credenciales incorrectas');
  const checkPass= await compare(password,userByEmail.password)
  if(!checkPass) return res.status(401).send('Credenciales incorrectas');
  const JWTConstructor= new SignJWT({
    id:userByEmail._id
  });
  const encoder=new TextEncoder();
  const jwt= await JWTConstructor.setProtectedHeader({
    alg:'HS256',
    typ:'JWT'
  })
  .setIssuedAt()
  .setExpirationTime('7d')
  .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));


  return res.send({jwt})
}

export default userLoginController;