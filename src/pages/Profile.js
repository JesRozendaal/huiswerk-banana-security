import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function Profile() {
    const {user} = useContext(AuthContext);
    const [privateInfo , setPrivateInfo] = useState();

    useEffect(() => {
        async function getPrivateData(){
            const token = localStorage.getItem('token');
        try {
            const result = await axios.get('http://localhost:3000/660/private-content', {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
                            });
            console.log(result.data);
            setPrivateInfo(result.data);
        } catch (e) {
            console.error(e);
        }
        } getPrivateData();
    },[])

  return (
        <>
            <h1>Profielpagina</h1>
                <section>
                <h2>Gegevens</h2>
                <p><strong>Gebruikersnaam:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                </section>
            {privateInfo &&
            <section>
                <h2>{privateInfo.title}</h2>
                <p>{privateInfo.content}</p>
            </section>
            }
                <p>Terug naar de <Link to="/">Homepagina</Link></p>
            </>
  );
}

export default Profile;