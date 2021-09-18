import React, { useState, useEffect } from "react";
import "./PostCard.css";

export default function PostCard(props) {
  const { e, currentUser, posts, setPosts, update } = props;
  const [text, setText] = useState();
  useEffect(() => {
    setText(e.text);
  }, []);
  return (
    <div className="post" key={e.id}>
      <div className="user">{e.user}</div>
      {e.updateFlag ? (
        <textarea
          className="text-editor"
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
        ></textarea>
      ) : (
        <div className="text">{e.text}</div>
      )}
      <div className="actions">
        {currentUser &&
          (currentUser.email === "magic@abc.com" ||
            (currentUser.email === e.user && e.isApproved === 0)) &&
          (e.updateFlag ? (
            <button
              className="save-button"
              onClick={() => {
                if (text) {
                  update(e.id, "text", text);
                }
              }}
            >
              Save
            </button>
          ) : (
            <button
              className="update-button"
              onClick={() => {
                const temp = [...posts];
                for (let i = 0; i < temp.length; i++) {
                  if (temp[i].id === e.id) {
                    temp[i].updateFlag = true;
                    break;
                  }
                }
                setPosts(temp);
              }}
            >
              Update
            </button>
          ))}
        {currentUser &&
          currentUser.email === "magic@abc.com" &&
          e.isApproved === 0 && (
            <select
              className="dropdown"
              onChange={(ent) => {
                update(e.id, "isApproved", Number(ent.currentTarget.value));
              }}
            >
              <option defaultValue value={0}>
                Select
              </option>
              <option value={1}>Accept</option>
              <option value={2}>Decline</option>
            </select>
          )}
        <div className="time">
          {Date(e.time.seconds).split(" ").slice(1, 4).join("-")}
        </div>
      </div>
    </div>
  );
}
