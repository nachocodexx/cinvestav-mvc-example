import Application, * as Koa from 'koa'
import  Pug from 'koa-pug'
import {Option,None} from './utils/option'
import { Server } from 'http'
import {ITemplateEngine} from './template-engine'
import Router from 'koa-router'
import  * as KoaBodyParser from 'koa-bodyparser'

interface IServer<A> {
    port:number
    hostname:string
    run:()=>A
}




export class KoaServer implements IServer<Server> {
    public port:number
    public hostname:string
    private application:Application
    private templateEngine:ITemplateEngine<Pug>
    private static __instance__:Option<KoaServer> = None();

    private constructor(port:Option<number>,hostname:Option<string>){
        this.port = port.getOrElse(8080)
        this.hostname = hostname.getOrElse('0.0.0.0')
        this.application = new Koa()
        this.application.use(KoaBodyParser())
    }

    public static create(port?:number,hostname?:string):KoaServer{
        KoaServer.__instance__ = Option.of(KoaServer.__instance__.getOrElse(new KoaServer(Option.of(port),Option.of(hostname))))
                                          
        return KoaServer.getInstance()
    }
    public static getInstance(){
        return KoaServer.__instance__.getOrElse(new KoaServer(None(),None()))
    }

    public addTemplateEngine<A>(createTemplateEngine:(app:Application)=>ITemplateEngine<A>){
        this.templateEngine = createTemplateEngine(this.application) as any
        return KoaServer.create(this.port,this.hostname)
        
    }

    public addRouter(x:Router):KoaServer  {
        this.application =  this.application.use(x.routes())
        return KoaServer.getInstance()
    }

    public addToContext(key:string,x:any) {
        this.application.context[key]=x
        return KoaServer.getInstance()
    }

    public run():Server {
        return  this.application.listen(this.port,this.hostname)
    }
    
}
