import TasksRouter from './routes/tasks.routes'
import IndexRouter from './routes/index.routes'
import {KoaServer} from './server'
import {PugTemplateEngine} from './template-engine'
import {MongoDB} from './database'
import { TasksRepository } from './repository/tasks.repository'
import { Db } from 'mongodb'

async function main(){
    // Connect to the database
    const db:Db = await MongoDB.create().connect()
    // Create template engine 
    const pugTemplateEngine = PugTemplateEngine.create()
    // Create server
    const server = KoaServer.create(3000,'0.0.0.0')
                    .addTemplateEngine(pugTemplateEngine)
                    .addToContext("db",db)
                    .addToContext("tasks",new TasksRepository(db,"tasks"))
                    .addRouter(TasksRouter)
                    .addRouter(IndexRouter)
    // Run server
    server.run()

}



main()