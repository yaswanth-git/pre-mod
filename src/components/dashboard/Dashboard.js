import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import {
  where,
  getDocs,
  collection,
  query,
  setDoc,
  doc,
  Timestamp,
} from "firebase/firestore";

import "./dashboard.css";
import PostCard from "../post-card/PostCard";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [flag, setFlag] = useState(true);
  const logout = () => {
    return signOut(auth);
  };
  const update = async (id, field, value) => {
    try {
      if (field === "text") {
        await setDoc(
          doc(db, "posts", id),
          { text: value, time: Timestamp.fromDate(new Date()) },
          { merge: true }
        );
      } else if (field === "isApproved") {
        await setDoc(
          doc(db, "posts", id),
          { isApproved: value, time: Timestamp.fromDate(new Date()) },
          { merge: true }
        );
      }
      setFlag(!flag);
    } catch (e) {
      console.log(e);
    }
  };
  const getPosts = async () => {
    if (currentUser) {
      if (currentUser.email === "magic@abc.com") {
        const existingPosts = await getDocs(query(collection(db, "posts")));
        const temp = [];
        existingPosts.forEach((docm) => {
          temp.push({ id: docm.id, updateFlag: false, ...docm.data() });
        });
        setPosts(temp);
      } else {
        const existingPosts = await getDocs(
          query(collection(db, "posts"), where("user", "==", currentUser.email))
        );
        const existingPosts1 = await getDocs(
          query(collection(db, "posts"), where("isApproved", "==", 1))
        );
        const temp = [];
        existingPosts.forEach((docm) => {
          temp.push({ id: docm.id, updateFlag: false, ...docm.data() });
        });
        existingPosts1.forEach((docm) => {
          temp.push({ id: docm.id, updateFlag: false, ...docm.data() });
        });
        setPosts(temp);
      }
    }
    // else {
    //     const existingPosts = await getDocs(query(collection(db, 'posts'),where('isApproved','==',1)));
    //     const temp = []
    //     existingPosts.forEach(doc => {
    //     temp.push({ id: doc.id,updateFlag:false, ...doc.data() })
    //     })
    //     setPosts(temp)
    // }
  };
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, flag]);
  return (
    <div>
      <div className="title-bar">
        <h1>Sell A Moment</h1>
        <div className="log-container">
          {!currentUser ? (
            <div className="login-link">
              <Link to="/login">Log in</Link>
            </div>
          ) : (
            <div className="logout-button">
              <button onClick={logout}>Log out</button>
            </div>
          )}
        </div>
      </div>
      {currentUser ? (
        <>
          <div className="post-link">
            You can post your own articles <Link to="/post">here</Link>
          </div>
          <div className="content">
            {posts &&
              posts.map((e) => (
                <PostCard
                  key={e.id}
                  e={e}
                  update={update}
                  currentUser={currentUser}
                  posts={posts}
                  setPosts={setPosts}
                />
              ))}
          </div>
        </>
      ) : (
        <h3 className="login-prompt">Log in to see the the posts</h3>
      )}
    </div>
  );
}
