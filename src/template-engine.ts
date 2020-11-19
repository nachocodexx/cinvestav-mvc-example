import {None,Option} from './utils/option'
import  Pug from 'koa-pug'
import Application from 'koa'
import * as path from 'path'

export interface ITemplateEngine<A> {
    templateObject:A
    templateEngineInit: (app:any,viewFolder:string)=>A
}


export class PugTemplateEngine implements ITemplateEngine<Pug>{
    private static __instance__:Option<PugTemplateEngine> =None()
    public templateObject:Pug

    private constructor(app:Application){
        this.templateObject = this.templateEngineInit(app,'views')
    }

    public static create():(app:Application)=>PugTemplateEngine{
        return (app:Application)=>PugTemplateEngine.__instance__.getOrElse(new PugTemplateEngine(app))
    }

    templateEngineInit(app:Application,viewFolder:string){
        return new Pug({app,viewPath:path.resolve(__dirname,viewFolder)})
    }

}