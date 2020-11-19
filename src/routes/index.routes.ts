import {IRouter} from '.'
import * as Router from 'koa-router'

class IndexRouter extends Router implements IRouter {
    constructor(prefix:string){
        super({prefix})
        this.get("/",(ctx)=>ctx.render("index"))
        
    }
}

export default new IndexRouter("/")
