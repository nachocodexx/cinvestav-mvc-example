import {Functor} from './functor'

 export class Option<A> implements Functor<A>{
    private __value__:A 
    constructor(value:A){
        this.__value__=value
    }
    public static of<A>(value:A){
        return new Some<A>(value)
    }
    map<B>(f:(x:A)=>B):B {
        return f(this.__value__)
    }     

    getOrElse<A>(value:A){
        return this.__value__ == null ? value : this.__value__ 
    }

}

  class _None extends Option<null> {
    constructor(){
        super(null)
    }
}
export const None = ()=>new _None()
 class Some<A> extends Option<A> {
    constructor(value:A){
        super(value)
    }
}

