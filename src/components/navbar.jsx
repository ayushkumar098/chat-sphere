import { useContext, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  const [optionsMenu, setOptionsMenu] = useState({ display: "none" });

  const toggleOptionMenu = () => {
    console.log(optionsMenu);
    optionsMenu.display === "block"
      ? setOptionsMenu({ display: "none" })
      : setOptionsMenu({ display: "block" });
  };

  return (
    <div className="navbar">
      <span className="logo">Chat Sphere</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>

        <div class="options-menu">
          <span
            style={{ fontSize: "35px", paddingRight: "20px" }}
            className="options"
            onClick={toggleOptionMenu}
          >
            &#8942;
          </span>
          <div class="option" style={optionsMenu} onClick={() => signOut(auth)}>
            Logout
          </div>
        </div>
        {/* <button onClick={() => signOut(auth)}>Logout</button> */}
      </div>
    </div>
  );
};

export default Navbar;
