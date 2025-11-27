import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";
import { AddUser} from "../../Service/UserService";



function signup() {
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [Data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    jobId: "",
  });

  const HandleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    console.log(`Input Changed - Name: ${name}, Value: ${value}`);

    setData((Data) => ({
      ...Data,
      [name]: value,
    }));
  };

  const HandleSubmit = async () => {

    setPasswordError("");
    
    console.log("Submitting signup data:", Data);

    if (Data.password !== Data.confirmPassword) {
      setPasswordError("Password doesn't Match!");
      return;
    }

    if (Data.password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }
    
    try {
      const response = await AddUser({
        username: Data.username,
        email: Data.email,
        password: Data.password
      });

      if(response == null){
        setEmailError("Email or username already in use");
        return;
      }
    
      console.log("Signup success:", response);

      navigate("/");
    
    } catch (error) {
      console.error("Error during signup:", error);
    }

  };

  return (
    <div className="container">
      <h1>Welcome</h1>

      <form onSubmit={HandleSubmit}>
        <div className="input-container">
          <label htmlFor="text" className="label">
            UserName
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={Data.username}
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

          {emailError.length != 0 && <p className='error'>{emailError}</p>}

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
            value={Data.jobId}
            onChange={HandleInputChange}
            className="dropdown-list"
            name="jobId"
            required
          >
            <option value="1">Male</option>
            <option value="2">Female</option>
            <option value="3">Other</option>

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
