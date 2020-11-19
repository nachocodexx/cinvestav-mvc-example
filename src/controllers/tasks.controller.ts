import { Context,Next } from "koa";
import {Task} from '../entities/task'


export async function getTasks(context:Context,next:Next){
    const tasksOrError = await context.tasks.findAll()
    
    if(tasksOrError.isLeft()) {
        context.body={error:tasksOrError.getLeft().message}
        return 
    }
    // context.state.data = tasksOrError.getRight()
    const tasks = tasksOrError.getRight()
    await context.render('tasks',{tasks})
}


export async function addTask(context:Context,next:Next){
     const task = new Task(context.request.body.text)
     const idOrError = await  context.tasks.create(task)
     if(idOrError.isLeft()) {
         context.body= {error:idOrError.getLeft().message}
         return 
     }
     context.redirect('/tasks/result')
}
export async function removeTask(context:Context,next:Next){
    await context.tasks.remove(context.params.id)
    await context.render("remove",{});
}

export async function updateTask(context:Context,next:Next){
    context.body="UPDATED"
}

