import React, {useState} from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { Link,useHistory } from 'react-router-dom';
import './signup.css'

const Signup =  () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const history = useHistory();
    const signup = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                history.push('/login');
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    return (
        <div className='signup-card'>
            <h1>Sign up</h1>
            <form onSubmit={signup}>
                <input type='email' placeholder='Email' onChange={(e) => setEmail(e.currentTarget.value)} />
                <input type='password' placeholder='Password' onChange={(e) => setPassword(e.currentTarget.value)}></input>
                <input type='password' placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.currentTarget.value)}></input>
                <button type='submit'>Sign up</button>
            </form>
            <p>Already have an account <Link to='/login'>log in</Link></p>
        </div>
    )
}

export default Signup;