import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import styles from "../AdminLogin/AdminLogin.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers,faKey } from '@fortawesome/free-solid-svg-icons';


function AdminLogin(){

  console.log("AdminLogin Component Rendered");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch("http://localhost:8081/admin-login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          });

          const result = await response.json();
          console.log("helloe");

          if (response.ok) {
            // Successful login
            console.log(result.message); // Example: "Login successful"

            localStorage.setItem("authToken", result.token); //stores authtoken to local storage 

            // Redirect to admin dashboard or home page
            navigate("/dashboard");
          } else {
            // Login failed
            setError("Invalid Username or Password");
          }
        } catch (err) {
          if (err.response && err.response.data) {
            setError(err.response.data.message); // Set error message on failure
        } else {
            setError('An error occurred. Please try again later.');
        }
        }
      };      

      
    return(
        <div className={styles.maincontainer}>
            <div className={styles.logincontainer}>
                {/* <div className={styles.SiteLogoTitle}>
                    <img src={logo} alt='site logo' />
                    <span className={styles.SiteTitle}>MyMovieList</span>  
                </div> */}
                <div>
                    <h3>Admin Login</h3>
                    <form onSubmit={handleLogin}>
                        <div className={styles.inputcontainer}>
                            <FontAwesomeIcon icon={faUsers} className={styles.fontawesome}/> 
                            <input 
                                type='text' 
                                name='adminusername' 
                                placeholder="Username"
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)}
                                required/>
                        </div>
                        <div className={styles.inputcontainer}>
                            <FontAwesomeIcon icon={faKey} />
                            <input 
                                type='password' 
                                name='adminpassword' 
                                placeholder="Password" 
                                value= {password}
                                onChange={(e) => setPassword(e.target.value)}
                                required/>
                        </div>

                        {error && <div className={styles.errormessage}>{error}</div>} {/* Display error message */}

                        <div className={styles.submitcontainer}>
                            <input type='submit' name='adminloginsubmit' value='Login'/>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default AdminLogin;