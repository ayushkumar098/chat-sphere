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
  const jsDate = message.message.date.toDate();
  console.log("Timestamp as JavaScript Date:", jsDate);

  const day = jsDate.getDate();
  const month = jsDate.getMonth() + 1; // Months are 0-indexed, so add 1
  const year = jsDate.getFullYear();

  // Get time components
  const hours = jsDate.getHours();
  const minutes = jsDate.getMinutes();

  // Format date in DD-MM-YYYY format
  const formattedDate = `${day}-${month < 10 ? "0" : ""}${month}-${year}`;

  // Format time in HH:MM format
  const formattedTime = `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;


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
        <span>{formattedTime}</span>
      </div>
      <div className="messageContent">
        
        <p className="text">{message.message.text}</p>
        {message.message.img && <img src={message.message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;

