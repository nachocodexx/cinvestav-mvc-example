import { Entity } from ".";

export class Task extends Entity{
    public title:string
    public created_at:string;
    public is_done:boolean;
    constructor(title:string){
        super()
        this.title=title;
        this.is_done=false; 
        this.created_at= Date.now().toString()
    }
}
