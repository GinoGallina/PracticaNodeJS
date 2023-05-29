import {Type} from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import {nameDTOSchema,surnameDTOSchema} from '../lib/dto-types.js';

const updateDataDTOSchema= Type.Object({
  name:nameDTOSchema,
  surname:surnameDTOSchema,
},
  {
    additionalProperties:false,
    errorMessage:{
      additionalProperties:"El formato del body no es válido"
    }
  });

const ajv = new Ajv({allErrors:true});
addErrors(ajv).addKeyword('kind').addKeyword('modifier');

const validateSchema = ajv.compile(updateDataDTOSchema);

const userUpdateDataDTO = (req,res,next)=>{
  const isDTOValid = validateSchema(req.body);
  if(!isDTOValid) return res.status(400).send({errors:validateSchema.errors.map(err=>err.message)});

  next();

}

export default userUpdateDataDTO;
// el format lo saco de la liberita ajv-formats
// el errorMessage lo saco de la liberita ajv-errors (creo)
// .addKeyword('kind').addKeyword('modifier'); -->Para compatibilidad con typebox