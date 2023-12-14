import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../Fireconfig";
import { Link, useNavigate } from 'react-router-dom';
import "./login.css";

const LoginClient = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`submitted email: ${email} password: ${password}`);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigate("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                alert(errorMessage);
            });
    };

    const forgotPass = () => {
        if (email) {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    console.log("Password reset email sent!");
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            alert('Type your Email');
        }
    };

    return (
        <div className='containerr' style={{ boxshadow:' rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
            margin:'auto', marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', border: 'solid 2px gray', padding: '40px', width: '470px' }}>
            <h1 className='h11'>Login</h1>
            <form className="formm" onSubmit={handleSubmit}>
                <label className='lab' htmlFor="email">Email</label>
                <input className='inputee'
                    type="email"
                    id="email"
                    required
                    onChange={({ target }) => setEmail(target.value)}
                />
                <label className='lab' htmlFor="password">Password</label>
                <input className='inputee'
                    type="password"
                    id="password"
                    required
                    onChange={({ target }) => setPassword(target.value)}
                />
                <button className='gobtn' type="submit" onClick={(event) => handleSubmit(event)}>
                    Sign In
                </button>
                <div>
                    <div>
                        <Link className='sapnnn' onClick={() => forgotPass()}>Forgot password?</Link>
                    </div>
                    <div>
                        <Link className='golink'  to="/signup">Don't have an account? Sign Up</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginClient;
