import { ObjectId } from "mongodb";

export abstract class Entity {
    _id:ObjectId
    constructor(){
        this._id= new ObjectId()
    }
}