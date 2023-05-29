import {Type} from '@sinclair/typebox';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';
import {idDTOSchema,nameDTOSchema,surnameDTOSchema,emailDTOSchema,passwordDTOSchema} from '../lib/dto-types.js';

const registerDTOSchema= Type.Object({
  _id: idDTOSchema,
  name:nameDTOSchema,
  surname:surnameDTOSchema,
  email:emailDTOSchema,
  password:passwordDTOSchema,
},
  {
    additionalProperties:false,
    errorMessage:{
      additionalProperties:"El formato del body no es válido"
    }
  });

const ajv = new Ajv({allErrors:true});
ajv.addFormat("password",/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
addFormats(ajv,["email","uuid"]).addKeyword('kind').addKeyword('modifier');
addErrors(ajv);

const validateSchema = ajv.compile(registerDTOSchema);

const userRegisterDTO = (req,res,next)=>{
  const isDTOValid = validateSchema(req.body);
  if(!isDTOValid) return res.status(400).send({errors:validateSchema.errors.map(err=>err.message)});

  next();

}

export default userRegisterDTO;
// el format lo saco de la liberita ajv-formats
// el errorMessage lo saco de la liberita ajv-errors (creo)
// .addKeyword('kind').addKeyword('modifier'); -->Para compatibilidad con typebox