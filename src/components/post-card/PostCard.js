import React, { useState, useEffect } from "react";
import "./PostCard.css";

export default function PostCard(props) {
  const { e, currentUser, posts, setPosts, update } = props;
  const [text, setText] = useState();
  const [value, setValue] = useState();
  useEffect(() => {
    setText(e.text);
    setValue(e.isApproved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="post" key={e.id}>
      <div className="user">{e.user.split("@")[0]}</div>
      {e.updateFlag ? (
        <textarea
          className="text-editor"
          value={text}
          onChange={(evt) => setText(evt.currentTarget.value)}
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
        {currentUser && currentUser.email === "magic@abc.com" && (
          <select
            disabled={e.isApproved !== 0}
            value={value}
            className="dropdown"
            onChange={(ent) => {
              setValue(Number(ent.currentTarget.value));
              update(e.id, "isApproved", Number(ent.currentTarget.value));
            }}
          >
            <option value={0}>Select</option>
            <option value={1}>Approve</option>
            <option value={2}>Decline</option>
          </select>
        )}
        <div className="time">
          {e.time.toDate().toString().split(" ").slice(1, 4).join("-")}
        </div>
      </div>
    </div>
  );
}
