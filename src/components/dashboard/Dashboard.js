import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth,db } from '../../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { where, getDocs, collection, query, setDoc, doc } from 'firebase/firestore'

import './dashboard.css';
import PostCard from '../post-card/PostCard';

export default function Dashboard() {
    const [posts, setPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState();
    const [flag, setFlag] = useState(true);
    const logout = () => {
        return signOut(auth)
    }
    const update = async (id, field, value) => {
        try{
            if (field === 'text') {
                await setDoc(doc(db, 'posts', id), { 'text': value }, { "merge": true });
            }
            else if (field === 'isApproved') {
                await setDoc(doc(db, 'posts', id), { 'isApproved': value }, { "merge": true });
            }
            setFlag(!flag);
        }
        catch (e) {
            console.log(e);
        }
    }
    const getPosts = async () => {
        if (currentUser) {
            if (currentUser.email === 'magic@abc.com') {
                const existingPosts = await getDocs(query(collection(db, 'posts'),where('isApproved','!=',2)));
                const temp = []
                existingPosts.forEach(doc => {
                temp.push({ id: doc.id,updateFlag:false, ...doc.data() })
                })
                setPosts(temp)
            }
            else {
                const existingPosts = await getDocs(query(collection(db, 'posts'), where('user', '==', currentUser.email)));
                const existingPosts1 = await getDocs(query(collection(db, 'posts'),where('isApproved','==',1)));
                const temp = []
                existingPosts.forEach((doc) => {
                    temp.push({ id: doc.id,updateFlag:false, ...doc.data() })
                })
                existingPosts1.forEach((doc) => {
                    temp.push({ id: doc.id,updateFlag:false, ...doc.data() })
                })
                setPosts(temp)
            }
        }
        else {
            const existingPosts = await getDocs(query(collection(db, 'posts'),where('isApproved','==',1)));
            const temp = []
            existingPosts.forEach(doc => {
            temp.push({ id: doc.id,updateFlag:false, ...doc.data() })
            })
            setPosts(temp)
        }

    }
    useEffect(() => {
        const temp = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        })
        return temp;
    }, [])
    useEffect(() => {
        getPosts();
    },[currentUser,flag])
    return (
        <div>
            <div className="title-bar">
                <h1>Sell A Moment</h1>
                <div className='log-container'>
                {!currentUser ? <div className='login-link'>
                    <Link to='/login'>Log in</Link>
                </div> : <div className='logout-button'><button onClick={logout}>Log out</button></div> }
                </div>
            </div>
            {currentUser && <div className="post-link">You can post your own articles <Link to ='/post'>here</Link></div>}
            <div className='content'>
                {posts && posts.map((e) => 
                    <PostCard key={e.id} e={e} update={update} currentUser={currentUser} posts={posts} setPosts={ setPosts }/>
                )}
            </div>
        </div>
    )
}
