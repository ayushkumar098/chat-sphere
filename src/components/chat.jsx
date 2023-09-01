import { useContext } from "react";
import Messages from "./messages";
import Input from "./input";

import Add from "../assets/add.png";
import Cam from "../assets/cam.png";
import More from "../assets/more.png";

import { ChatContext } from "../context/chatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  if (data.user.displayName) {
    return (
      <div className="chat">
        <div className="chatInfo">
          <span>{data.user?.displayName}</span>
          <div className="chatIcon">
            <span
              style={{ fontSize: "35px", paddingRight: "20px" }}
              className="options"
            >
              &#8942;
            </span>
          </div>
        </div>
        <Messages />
        <Input />
      </div>
    );
  } else {
    return (
      <div className="welcomeScreen">
        <h2 className="heading">Welcome to Chat Sphere</h2>
        <span>
          Hello there! You can chat with any user by just searching their
          username.
        </span>
        <span>
          My username is ayush. You can chat with me by searching ayush in the
          search box.
        </span>
      </div>
    );
  }
};

export default Chat;
