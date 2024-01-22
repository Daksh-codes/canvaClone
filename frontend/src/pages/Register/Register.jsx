import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({ firstName, lastName, email, password });
    try {
      const { data, status } = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          firstName,
          lastName,
          email,
          password,
        }
      );

      if (status === 201) {
        navigate("/login");
      } else if (status === 409) {
        toast.success("User not Found");
      }
      console.log({
        firstName,
        lastName,
        email,
        password,
      });
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <div className="container">
      <div className="registerContainer ">
        <h4 className="registerHeading">Register</h4>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          newestOnTop={false}
          closeOnClick
        />

        <p className="navigation">
          {" "}
          <Link to="/" className="navigationLink">
            Home
          </Link>{" "}
          &gt; Create Account
        </p>
        <form onSubmit={handleSubmit}>
          <div className="inputContainer">
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              autoFocus
              required
            />
          </div>
          <div className="inputContainer">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              required
            />
          </div>
          <div className="inputContainer">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          <div className="inputContainer">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              maxLength={8}
              minLength={8}
            />
          </div>
          <button type="submit" className="registerBtn">
            Create now
          </button>
        </form>
        <p className="login">
          Already have an account ? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
