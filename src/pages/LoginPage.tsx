import {BasePage, type BaseProps, type BaseState} from "./BasePage.tsx";
import * as React from "react";
import "../css/loginPage.scss"
import {UserContext} from "../context/UserContext.tsx";
import User from "../types/User.ts";
import { Link } from "react-router-dom";

type LoginPageState = BaseState & {
    email: string,
    password: string,
}

export class LoginPage extends BasePage<BaseProps, LoginPageState>{

    static contextType = UserContext;
    declare context: React.ContextType<typeof UserContext>;

    state: LoginPageState = {
        error: null,
        title: "Login",
        loading: false,
        email: "",
        password: ""
    };
    private sendInfo = async()=>{
        const {email, password} = this.state;
        if(!email || !password){
            window.alert("Preencha todos os campos!");
            return
        }
        interface LoginRequest{
            email: string,
            password: string
            fingerprint: string
        }

        const data: LoginRequest = {
            email,
            password,
            fingerprint: (await this.getFingerprint()).visitorId
        }
        const result = (await this.postToApi<{ token: string, user: User }, LoginRequest>("/auth/login", data)).data.data
        this.context.login(result.user, result.token);
        alert("Login successfull");
        window.location.href = "/home";
    }

    protected renderContent(): React.ReactNode {
        return <div className="main-login">
            <h2>Login</h2>
            <input
                className="login-input"
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={(v)=>this.setState({email: v.target.value})}
            />
            <input
                className="login-input"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={(v)=>this.setState({password: v.target.value})}
            />
            <button onClick={this.sendInfo}>Login</button>
            <p className="register-text">Não tem uma conta? <Link to="/register">Registre-se</Link></p>
        </div>
    }
}