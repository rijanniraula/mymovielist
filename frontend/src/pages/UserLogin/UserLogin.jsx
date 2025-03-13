import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./UserLogin.module.css";
import NavBar from "../../components/NavBar/NavBar";
import { useEffect } from "react";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Check for existing token on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/user-profile"); // Redirect to UserAccount if already logged in
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const response = await fetch("http://localhost:8081/user-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the JWT token in localStorage
        localStorage.setItem("token", data.token);
        navigate("/user-profile");
      } else {
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className={styles.maincontainer}>
      <NavBar />
      <div className={styles.logincontainer}>
        <div className={styles.formcontainer}>
          <form onSubmit={handleSubmit} className={styles.loginform}>
            <h2>Login</h2>
            <div className={styles.inputgroup}>
              <div>Email</div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div className={styles.inputgroup}>
              <div>Password</div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            {/* <div className={styles.options}>
                    <label>
                        <input 
                        type="checkbox" 
                        checked={rememberMe} 
                        onChange={() => setRememberMe(!rememberMe)} 
                        />
                        Remember Me
                    </label>
                    <a href="#forgot-password">Forgot Password?</a>
                    </div> */}

            {errorMessage && (
              <div className={styles.errorMessage}>{errorMessage}</div>
            )}

            <button type="submit" className={styles.loginbtn}>
              Login
            </button>
            <div className={styles.noaccount}>
              Don't have an account?{" "}
              <Link to="/user-register">Register Now</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default UserLogin;
