import * as React from "react";
import {Header} from "../components/Header.tsx";
import {BaseComponent} from "../components/BaseComponent.tsx";
import type {BaseException} from "../exceptions/BaseException.ts";
import "../css/mainPage.scss"
import "../css/base.scss"

export interface BaseProps{
    params?:object
}

export interface BaseState{
    error: BaseException | null,
    title: string| null,
    loading: boolean,
}

export abstract class BasePage<P extends BaseProps, S extends BaseState> extends BaseComponent<P, S>{
    public constructor(props: P, initialState: S);
    public constructor(initialState: S);

    public constructor(arg1: P | S, arg2?: S) {
        if (arg2) {
            super(arg1 as P);
            this.state = arg2;
        } else {
            super({} as P);
            this.state = arg1 as S;
        }
    }

    protected getError(error: BaseException| null){
        if (!error) {
            return (
                <div className="error-wrapper">
                    <p className="error">An unknown error occurred.</p>
                    <button onClick={()=>window.location.reload}>Voltar</button>
                </div>
            );
        }
        const hasErrCodeMethod = typeof (error as BaseException).getErrCode === 'function';
        console.error(error.toString());

        return (
            <div className="error-wrapper">
                <p className="error"><b>Erro ao carregar a pagina: </b></p>
                <p className="error-reason">{error.name}</p>
                <p className="error-status">{error.message}</p>
                {hasErrCodeMethod && (
                    <p className="error-status">CODE: {error.getErrCode()}</p>
                )}
                <button onClick={()=>window.location.reload()}>Voltar</button>
            </div>
        );
    }

    componentDidMount() {
        document.title = `${this.state.title} - Top Top awards`
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