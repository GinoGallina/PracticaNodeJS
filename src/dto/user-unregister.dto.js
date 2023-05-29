import {Type} from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import {passwordDTOSchema} from '../lib/dto-types.js';

const unregisterDTOSchema= Type.Object({
  password:passwordDTOSchema,
},
  {
    additionalProperties:false,
    errorMessage:{
      additionalProperties:"El formato del body no es válido"
    }
  });

const ajv = new Ajv({allErrors:true});
ajv.addFormat("password",/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/).addKeyword('kind').addKeyword('modifier');
addErrors(ajv);

const validateSchema = ajv.compile(unregisterDTOSchema);

const userUnregisterDTO = (req,res,next)=>{
  const isDTOValid = validateSchema(req.body);
  if(!isDTOValid) return res.status(400).send({errors:validateSchema.errors.map(err=>err.message)});

  next();

}

export default userUnregisterDTO;
// el format lo saco de la liberita ajv-formats
// el errorMessage lo saco de la liberita ajv-errors (creo)
// .addKeyword('kind').addKeyword('modifier'); -->Para compatibilidad con typebox