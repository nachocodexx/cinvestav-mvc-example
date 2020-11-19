import {Functor} from './functor'
export class Either<E extends Error,R> implements Functor<R>{
    protected __value__:R  
    protected __error__:E 
    protected __type__:string

    constructor(){}

    map<B>(f: (x: R) => B):Either<E,B>{
        return  this.isLeft() ? new Left(this.__error__) : new Right(f(this.__value__))
    };

    isLeft(){
        return this.__type__ === "LEFT"
    }
    isRight(){
        return this.__type__ === "RIGHT"
    }

    getLeft(){
        return this.__error__
    }
    getRight(){
        return this.__value__
    }

}

export class Left<E extends Error,R> extends Either<E,R>{
    constructor(error:E){
        super()
        this.__type__ ="LEFT"
        this.__error__=error
    }
}
export class Right<E extends Error,R> extends Either<E,R>{
    constructor(value:R){
        super()
        this.__value__=value
        this.__type__ ="RIGHT"
    }
}