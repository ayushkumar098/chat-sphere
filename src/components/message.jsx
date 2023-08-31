import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/authContext";
import { ChatContext } from "../context/chatContext";

const Message = (message) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${
        message.message.senderId !== data.user.uid && "owner"
      }`}
    >
      <div className="messageInfo">
        <img
          src={
            message.message.senderId === data.user.uid
              ? data.user.photoURL
              : currentUser.photoURL
          }
        />
        <span>Just Now</span>
      </div>
      <div className="messageContent">
        <p>{message.message.text}</p>
        {message.message.img && <img src={message.message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
