import React, {createContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider ({children}) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token) {
            const decodedToken = jwt_decode(token);
            console.log(decodedToken);

                async function fetchUserData() {
                        try {
                            const response = await axios.get(`http://localhost:3000/600/users/${decodedToken.sub}`, {
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`,
                                }
                            });
                            toggleIsAuth({
                                ...isAuth,
                                isAuth: true,
                                user: {
                                    email: response.data.email,
                                    username: response.data.username,
                                    id: response.data.id,
                                },
                                status: 'done',
                            })
                            console.log(response);
                        } catch (e) {
                            console.error(e);
                            toggleIsAuth({
                                    ...isAuth,
                                    status: 'done',
                                }
                            )
                        }
                    }

                    fetchUserData();
        } else {
            toggleIsAuth({
                ...isAuth,
                status:'done',
            });
        }
    }, []);

    const history = useHistory();

    const data = {
        auth: isAuth.isAuth,
        user: isAuth.user,
        login: signIn,
        logout: signOut,
    }

    async function getUserData(id, token) {
        try {
            const result = await axios.get(`http://localhost:3000/600/users/${id}`,
                {headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }});
            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    id: result.data.id,
                    email: result.data.email,
                    username: result.data.usename,
                }
            });
            history.push("/profile");
        } catch (e) {
            console.error(e);
        }
    }

    function signIn(jwt) {
        const decoded = jwt_decode(jwt);
        getUserData(decoded.sub, jwt);
        console.log('Gebruiker is ingelogd!');
        localStorage.setItem('token', jwt);
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
            {isAuth.status === 'done' ?  children : <p>Loading...</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;