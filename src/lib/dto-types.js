import {Type} from '@sinclair/typebox';

export const idDTOSchema=Type.String({
      format:'uuid',
      errorMessage:{
        type:'El tipo no es válido, debe ser string',
        format:'El formato no es válido, debe ser uuid'
      }
    })
export const nameDTOSchema=Type.String({
      minLength:2,
      maxLength:20,
      errorMessage:{
        minLength:'Longitud minima es 2',
        maxLength:'Longitud maxima es 20'
      }
    })
export const surnameDTOSchema=Type.String({
      errorMessage:{
        type:'El tipo de email no es válido, debe ser string',
        format:'El formato de email no es válido'
      }
    })
export const emailDTOSchema=Type.String({
      minLength:4,
      maxLength:50,
      errorMessage:{
        minLength:'Longitud minima es 4',
        maxLength:'Longitud maxima es 50'
      }
    })
export const passwordDTOSchema=Type.String({
      format:'password',
      minLength:10,
      maxLength:25,
      errorMessage:{
        type:'El tipo de email no es válido, debe ser string',
        format:'El formato de password no es valido, debe tener al menos una may, una min y numero',
        minLength:'Longitud minima es 10',
        maxLength:'Longitud minima es 25'
      }
    })