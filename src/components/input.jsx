import { useContext, useState } from "react";
import Attach from "../assets/attach.png";
import Img from "../assets/img.png";
import { AuthContext } from "../context/authContext";
import { ChatContext } from "../context/chatContext";
import { arrayUnion, doc, updateDoc,Timestamp, serverTimestamp } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { storage, db } from "../utils/firebase";
import { getDownloadURL,ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          data: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid),{
      [data.chatId+".lastMessage"]: {
        text
      },
      [data.chatId+".date"]: serverTimestamp(),
    })
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    setText('');
    setImg(null);
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type Something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
