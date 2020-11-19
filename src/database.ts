import {Option,None} from './utils/option'
import {MongoClient,Db} from 'mongodb'
export interface IDatabase<T> {
    connect:()=>Promise<T>
    uri:string
    databaseName:string
}


export class MongoDB implements IDatabase<Db> {
    public uri: string;
    public databaseName: string;
    private  static __instance__:Option<MongoDB>  = None()
    
    private constructor(uri?:Option<string>){
        this.uri= uri.getOrElse("mongodb://localhost:27018/mvc")
    }

    public static getInstance():MongoDB{
        return MongoDB.__instance__.getOrElse(new MongoDB(None()))
    }
    public static create(uri?:string):MongoDB  {
     MongoDB.__instance__ = Option.of(MongoDB.__instance__.getOrElse(new MongoDB(Option.of(uri))))
     return MongoDB.getInstance()
    }

    public async connect():Promise<Db> {
        const mongoClient= new MongoClient(this.uri,{useUnifiedTopology:true})
        return mongoClient.connect()
        .then(x=>mongoClient.db(this.databaseName))
    }

}