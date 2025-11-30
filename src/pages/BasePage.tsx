import * as React from "react";
import {Header} from "../components/Header.tsx";
import {BaseComponent} from "../components/BaseComponent.tsx";
import type {BaseException} from "../exceptions/BaseException.ts";

export interface BaseProps{
    params?:object
}

export interface BaseState{
    error: BaseException | null,
    title: string| null,
    loading: boolean,
}

export abstract class BasePage<P extends BaseProps, S extends BaseState> extends BaseComponent<P, S>{
    protected constructor(props: P, initialState: S);
    protected constructor(initialState: S);

    protected constructor(arg1: P | S, arg2?: S) {
        if (arg2) {
            super(arg1 as P);
            this.state = arg2;
        } else {
            super({} as P);
            this.state = arg1 as S;
        }
    }

    protected getError(error: BaseException){
        console.error(error.toString());
        return <></>
    }



    protected abstract renderContent(): React.ReactNode;

    render() {
        return(
            <>
                <Header/>
                {this.state.error ? (
                    this.getError(this.state.error)
                ) : this.renderContent()}
            </>
        )
    }
}