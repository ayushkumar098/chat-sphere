import Add from "../assets/addAvatar.png";
import { ReactComponent as DisplayPictureIcon } from "../assets/addDisplayPicture.svg"
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage, db } from "../utils/firebase";
import { doc, setDoc } from "firebase/firestore";
import {useNavigate,Link} from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    console.log("reached: 1");
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    if(!file){
      alert("Please upload your Profile Picture.");
    }
    
    try {
      console.log("reached: 2");
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            console.log("reached: 3");
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            // setErr(true);
            // setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
      console.log("reached: 4");
    }
  };
  

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="title">Chat Sphere</span>
        <span className="heading">Register</span>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="name" required></input>
          <input type="text" placeholder="email" required></input>
          <input type="text" placeholder="password" required></input>
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file" className="file">
            <DisplayPictureIcon className="addDisplayPicture" />
            <span>Add an avatar</span>
          </label>
          <button>Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
