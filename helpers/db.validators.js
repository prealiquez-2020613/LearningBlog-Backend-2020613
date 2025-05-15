import {isValidObjectId, Schema} from 'mongoose';

export const objectIdValid = async (objectId)=>{
    if(!isValidObjectId(objectId)){
        throw new Error('Keeper is not objectId')
    }
}