import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UserRegistration.module.css'; 
import NavBar from '../../components/NavBar/NavBar';

function UserRegistration () {
    const navigate = useNavigate(); 
    const [message, setMessage] = useState(''); 

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        // Full Name Validation
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
            isValid = false;
        }

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(formData.email.trim())) {
            newErrors.email = 'Email is not valid';
            isValid = false;
        }

        // Password Validation
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.trim().length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        // Confirm Password Validation
        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = 'Please confirm your password';
            isValid = false;
        } else if (formData.confirmPassword.trim() !== formData.password.trim()) {
            newErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch('http://localhost:8081/user-registration', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        full_name: formData.fullName,
                        email: formData.email,
                        password: formData.password,
                    }),
                });

                const result = await response.json();

                if (response.ok) {
                    setMessage(result.message);
                   
                    
                    setErrors({});
                    setTimeout(() => navigate('/user-login'), 1500);
                } else {
                    setMessage(result.error || result.message);
                }
            } catch (error) {
                console.error('Error during fetch:', error);
                setMessage('Something went wrong. Please try again later.');
            }
        }
    };

    return (
        <div className={styles.maincontainer}>
            <NavBar />
            <div className={styles.logincontainer}>
                < div className={styles.formcontainer}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <h2>User Registration</h2>
                        <div className={styles.formGroup}>
                            <div>Full Name</div>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={handleChange}
                                className={errors.fullName ? styles.errorInput : styles.userregforminput}
                            />
                            {errors.fullName && <small className={styles.errorText}>{errors.fullName}</small>}
                        </div>
                        <div className={styles.formGroup}>
                            <div>Email</div>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className={errors.email ? styles.errorInput : styles.userregforminput}
                            />
                            {errors.email && <small className={styles.errorText}>{errors.email}</small>}
                        </div>

                        <div className={styles.formGroup}>
                            <div>Password</div>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className={errors.password ? styles.errorInput : styles.userregforminput}
                            />
                            {errors.password && <small className={styles.errorText}>{errors.password}</small>}
                        </div>

                        <div className={styles.formGroup}>
                            <div>Confirm Password</div>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={errors.confirmPassword ? styles.errorInput : styles.userregforminput}
                            />
                            {errors.confirmPassword && <small className={styles.errorText}>{errors.confirmPassword}</small>}
                        </div>

                        <button type="submit" className={styles.submitButton}>Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserRegistration;