import {jwtVerify } from 'jose';

const userJWTDTO = async (req,res,next)=>{
  const {authorization}=req.headers;
  if(!authorization) return res.status(401).send("No está atorizado")
  try{
    const encoder= new TextEncoder();
    // ESTO es xq el jwt no admite strings, sinoq hay q encodearlo a un tipo de datoespecifico (no se cuales)
    const {payload}=await jwtVerify(authorization,encoder.encode(process.env.JWT_PRIVATE_KEY));
    req.id=payload.id;
    next();
  }catch{
    return res.status(401).send('Usuario no autorizado');
  }

}

export default userJWTDTO;
// el format lo saco de la liberita ajv-formats
// el errorMessage lo saco de la liberita ajv-errors (creo)
// .addKeyword('kind').addKeyword('modifier'); -->Para compatibilidad con typebox