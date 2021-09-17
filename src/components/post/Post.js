import React, { useState, useEffect } from 'react';
import { auth,db } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { useHistory } from 'react-router-dom'
import './post.css';


export default function Post() {
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState();
    const [text, setText] = useState('');
    useEffect(() => {
        const temp = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        })
        return temp;
    }, [])
    const post = async () => {
        if (currentUser) {
            if (text) {
                try {
                    const docRef = addDoc(collection(db, "posts"), {
                        user: currentUser.email,
                        time: Timestamp.fromDate(new Date()),
                        text: text,
                        isApproved: 0,
                    });
                    history.push('/');
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            }
        }
        else {
            history.push('/login');
        }
  }
    return (
        <div className='post-text'>
            <h1>New Post</h1>
            <textarea className='post-text-editor' onChange={(e) => setText(e.currentTarget.value)} placeholder='Write here ...'></textarea>
            <button className='post-button' onClick={post}>Post</button>
        </div>
    )
}
