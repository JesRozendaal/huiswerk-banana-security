import React, {createContext, useState} from "react";
import {useHistory} from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider ({children}) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
    });
    const history = useHistory();

    const data = {
        auth: isAuth.isAuth,
        user: isAuth.user,
        login: signIn,
        logout: signOut,
    }

    // stap 13: vul de parameters in om de id en de jwt te ontvangen uit de singIn functie.
    // Gebruik ze op de benodigde plekken.
    // Zet de toggleIsAuth erin om in te loggen en bij de geheime content te kunnen
    // Geef de user info mee hierin
    async function getUserData(id, token) {
        try {
            const result = await axios.get(`http://localhost:3000/600/users/${id}`,
                {headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }});
            // stap 14: zet de gebruikersgegevens in de context-state en toggle isAuth op true.
            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    id: result.data.id,
                    email: result.data.email,
                    username: result.data.usename,
                }
            });
            // stap 15: link de gebruiker door naar de profielpagina.
            history.push("/profile");
        } catch (e) {
            console.error(e);
        }
    }

    // stap 10: Geef een parameter mee, zodat de functie de token ontvangt.
    function signIn(jwt) {
        // make een const aan om de token te decoderen:
        const decoded = jwt_decode(jwt);
        // stap 13: toggleIsAuth kan weg! voor nu even als aantekening laten staan.
        // toggleIsAuth({
        //     ...isAuth,
        //     isAuth: true,
        // });
        //stap 13: Roep de functie getUserData aan en geef het id mee en de token
        getUserData(decoded.sub, jwt);
        console.log('Gebruiker is ingelogd!');
        // sla de jwt op in de local storage.
        localStorage.setItem("token", jwt);
    }

    function signOut() {
        toggleIsAuth({
            ...isAuth,
            isAuth: false,
            user: null,
        });
        localStorage.clear();
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