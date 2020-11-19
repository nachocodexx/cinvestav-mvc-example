import * as Router from 'koa-router'
import { IRouter } from '.'
import { getTasks , addTask, removeTask, updateTask} from '../controllers/tasks.controller'

class TasksRouter extends Router implements IRouter {
    constructor(prefix:string){
        super({prefix})
        this.get("/",getTasks)
        this.get("/result",(ctx,next)=>ctx.render('result'))
        this.post("/",addTask)
        this.post("/remove/:id",removeTask)
        this.put("/:id",updateTask)

    }
}

export default new TasksRouter("/tasks")

