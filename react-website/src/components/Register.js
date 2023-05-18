import { useState } from "react";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "./Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // States for checking
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the name 
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  // Handling the email
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password 
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  // Handling the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === "" || email === "" || password === "") {
      setError(true);
      setSubmitted(false);
    } else {
      try {
        const response = await axios.post("/sign-up", {
          name: name,
          email: email,
          password: password,
        });
        setSubmitted(true);
        setError(false);
        console.log(response.data); 
      } catch (error) {
        setError(true);
        setSubmitted(false);
        console.error(error); 
      }
    }
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div className="success" style={{ display: submitted ? "" : "none" }}>
        <FontAwesomeIcon icon={faCheck} className="icon" />
        <h1>User {name} successfully registered!!</h1>
      </div>
    );
  };

  // Showing error message
  const errorMessage = () => {
    return (
      <div className="error" style={{ display: error ? "" : "none" }}>
        <FontAwesomeIcon icon={faTimes} className="icon" />
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  return (
    <div className="form">
      <div>
        <h1>User Registration</h1>
      </div>

      {/* methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>

      <form>
        {/* Labels data */}
        <label className="label">Name</label>
        <input
          onChange={handleName}
          className="input"
          value={name}
          type="text"
          name="name"
          required
        />

        <label className="label">Email?</label>
        <input
          onChange={handleEmail}
          className="input"
          value={email}
          type="email"
          name="email"
          required
        />

        <label className="label">Password</label>
        <input
          onChange={handlePassword}
          className="input"
          value={password}
          type="password"
          name="password"
          required
        />

        <button onClick={handleSubmit} className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
