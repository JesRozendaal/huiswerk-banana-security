import React, {createContext, useState} from "react";
import {useHistory} from "react-router-dom";

export const AuthContext = createContext({});

function AuthContextProvider ({children}) {
    const [isAuth, toggleIsAuth] = useState(false);
    const history = useHistory();

    const data = {
        auth: isAuth,
        login: signIn,
        logout: signOut,
    }

    function signIn() {
        toggleIsAuth(true);
        console.log('Gebruiker is ingelogd!');
        history.push("/profile");
    }

    function signOut() {
        toggleIsAuth(false);
        console.log('Gebruiker is uitgelogd!')
        history.push("/");
    }

    return(
    <AuthContext.Provider value={data}>
        {children}
    </AuthContext.Provider>
    )
}

export default AuthContextProvider;