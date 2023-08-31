import { useContext } from "react";
import Messages from "./messages";
import Input from "./input";

import Add from "../assets/add.png";
import Cam from "../assets/cam.png";
import More from "../assets/more.png";

import { ChatContext } from "../context/chatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  console.log(data);
  // return (
  //   <div className="chat">
  //     <div className="chatInfo">
  //       <span>{data.user?.displayName}</span>
  //       <div className="chatIcon">
  //         <img src={Add} />
  //         <img src={Cam} />
  //         <img src={More} />
  //       </div>
  //     </div>
  //     <Messages />
  //     <Input />
  //   </div>
  // );
  if (data.user.displayName) {
    return (
      <div className="chat">
        <div className="chatInfo">
          <span>{data.user?.displayName}</span>
          <div className="chatIcon">
            <span style={{fontSize:"35px",paddingRight:"20px"}} className="options">&#8942;</span>
            {/* <img src={Add} />
            <img src={Cam} />
            <img src={More} /> */}
          </div>
        </div>
        <Messages />
        <Input />
      </div>
    );
  } else {
    return (
      <div className="chat">
        <h2>Welcome to chat sphere</h2>
        <span>Connect to your loved ones</span>
      </div>
    );
  }
};

export default Chat;
