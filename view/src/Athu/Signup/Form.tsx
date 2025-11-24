import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";
// import { IuserSignup } from "../../Types/Iuser";

function signup() {
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [Data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    jobTitle: "",
  });

  const HandleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setData((Data) => ({
      ...Data,
      [name]: value,
    }));
  };

  const HandleSubmit = (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setPasswordError("");

    if (Data.password !== Data.confirmPassword) {
      setPasswordError("Password doesn't Match!");
      return;
    }

    if (Data.password.length < 6) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }
  };

  return (
    <div className="container">
      <h1>Welcome</h1>

      <form action="submit">
        <div className="input-container">
          <label htmlFor="text" className="label">
            Username
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={Data.userName}
            onChange={HandleInputChange}
            placeholder="Enter your username"
            required
          />

          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={Data.email}
            onChange={HandleInputChange}
            placeholder="Enter your email"
            required
          />

          {/* {error && <p className='error'>{error}</p>} */}

          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={Data.password}
            onChange={HandleInputChange}
            required
          />

          <label htmlFor="confirmpassword" className="label">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={Data.confirmPassword}
            onChange={HandleInputChange}
            required
          />
          {passwordError.length != 0 && (
            <p className="error">{passwordError}</p>
          )}

          <label className="label">JobTitle</label>
          <select
            value={Data.jobTitle}
            onChange={HandleInputChange}
            className="dropdown"
            name="jobTitle"
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <button type="button" className="signup" onClick={HandleSubmit}>
            Signup
          </button>
          {/* {error && <p className='error'>{error}</p>} */}
        </div>
      </form>
        <button 
        type="button" 
        className="back" 
        onClick={() => navigate("/")}
        >
          Back
        </button>
    </div>
  );
}

export default signup;
