import { Collection, Db, ObjectId } from "mongodb";
import { Task } from "../entities/task";
import { Either, Left, Right } from "../utils/either";


type F<T> = Promise<T>

export abstract class Repository<T> {
    private readonly _collection:Collection
    constructor(db:Db,collectionName:string){
        this._collection =db.collection<T>(collectionName)
    }

    async create(x:T):F<Either<Error,ObjectId>>{
        try {
            const result = (await this._collection.insertOne(x)).insertedId as unknown as ObjectId
            return new Right(result)
        } catch (error) {
            return new Left(error)
        }
    }
    async findAll():F<Either<Error,T[]>>{
        try {
            const result = await this._collection.find({}).toArray()
            return new Right(result)
        } catch (error) {
            return new Left(error)
        }
    }
    async remove(id:string):F<Either<Error,boolean>>{
        try {
            await this._collection.deleteOne({_id:new ObjectId(id)})
            return new Right(true)
        } catch (error) {
            return new Left(error)
        }
    }
}

