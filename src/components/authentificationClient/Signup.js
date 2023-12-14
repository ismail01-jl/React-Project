import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import "./login.css";
export default function Signup() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const auth = getAuth();

    const sub = async (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, pwd)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigate('/loginclient');
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        console.log("Email Sent");
                    })
                    .catch((err) => {
                        console.log(err);
                        alert(err);
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                alert(errorMessage);
            });
    };

    return (
        <div style={{ margin:'auto', marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', border: 'solid 2px gray', padding: '40px', width: '400px' }}>

            <h1 className="h11">Sign Up</h1>
            <form onSubmit={sub}>
                <label htmlFor="email">Email</label>
                <input className='inputee'
                    type="email"
                    id="email"
                    required
                    onChange={({ target }) => setEmail(target.value)}
                />
                <label htmlFor="pwd">Password</label>
                <input className='inputee'
                    type="password"
                    id="pwd"
                    required
                    onChange={({ target }) => setPwd(target.value)}
                />
                <button className="gobtn" type="submit">Sign Up</button>
            </form>
        </div>
    );
}
