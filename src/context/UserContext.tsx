import User, {UserType} from "../types/User.ts";
import type {BaseState} from "../pages/BasePage.tsx";
import * as React from "react";
import {createContext, type ReactNode} from "react";

export interface UserContextProps {
    isLoggedIn: boolean
    isAdmin: boolean
    user: User | null;
    login: (user: User,token: string) => void;
    logout: () => void;
}

type UserContextState = BaseState & {
    isLoggedIn: boolean;
    isAdmin: boolean;
    user: User | null;
};

export const UserContext = createContext<UserContextProps>({
    isLoggedIn: false,
    isAdmin: false,
    user: null,
    login: ()=>{},
    logout: ()=>{},
})

export class UserProvider extends React.PureComponent<{children: ReactNode}, UserContextState>{
    state: UserContextState = {
        title: null,
        error: null,
        loading: true,
        isLoggedIn: false,
        isAdmin: false,
        user: null,
    }
    public login(user: User, token: string){
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user));

        const isAdmin = user.type === UserType.ADMIN;

        this.setState({
            isLoggedIn: true,
            user,
            isAdmin
        })
    }

    public logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.setState({
            isLoggedIn: false,
            user: null,
            isAdmin: false,
        })
    }

    render() {
        const {isLoggedIn, isAdmin, user, error} = this.state;
        const contextValue = {
            isLoggedIn,
            isAdmin,
            user,
            login: this.login,
            logout: this.logout,
        }

        if(error){
            return <React.StrictMode>{error.message}</React.StrictMode>;
        }

        return <UserContext.Provider value={contextValue}>
            {this.props.children}
        </UserContext.Provider>
    }
}