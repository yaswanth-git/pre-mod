import React , { useState } from 'react';
import './login.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const login = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password)
            history.push('/');
        }
        catch(e) {
            console.log(e);
        }
    }
    return (
        <div className='login-card'>
            <h1>Log in</h1>
            <form onSubmit={login}>
                <input required type='email' placeholder='Email' onChange={(e) => setEmail(e.currentTarget.value)}></input>
                <input required type='password' placeholder='Password' onChange={(e) => setPassword(e.currentTarget.value)}></input>
                <button type='submit'>Login</button>
            </form>
            <p>Don't have an account <Link to='/signup'>sign up</Link></p>
        </div>
    )
}
