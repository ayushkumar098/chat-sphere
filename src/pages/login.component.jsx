import { auth } from "../utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const navigate = useNavigate();
  //const { setCurrentUser } = useContext(AuthContext);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      //const user = userCredential.user;
      // console.log(user);
      // setCurrentUser(user);
      navigate("/");
    } catch (error) {
     console.log(error);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="title">Chat Sphere</span>
        <span className="heading">Login</span>

        <form onSubmit={handleSubmit}>
          <input type="text" className="email" placeholder="email"></input>
          <input
            type="text"
            className="password"
            placeholder="password"
          ></input>

          <button>Sign In</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
