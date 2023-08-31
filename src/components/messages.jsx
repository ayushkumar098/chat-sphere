import { useContext, useEffect, useState } from 'react'
import Message from "../components/message";

import { ChatContext } from "../context/chatContext";
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../utils/firebase';

const Messages = () => {
  const [messages,setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(()=>{
    const unsub = onSnapshot(doc(db,"chats",data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unsub();
    };
  },[data.chatId]);
  console.log(messages);

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
}

export default Messages