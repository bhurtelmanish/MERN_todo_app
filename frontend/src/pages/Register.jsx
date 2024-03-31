import React, { useState } from 'react'
import '../App.css'
import { Link, useNavigate } from 'react-router-dom'
import Alert from '../components/Alert'
import FloatingShapes from '../components/FloatingShapes'


const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [alertClass, setAlertClass] = useState("")

  const navigate = useNavigate();

  const registerSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:3001/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();

    //Show the alert menu based on given conditions and params
    const alertState = (state, message, className) => {
      setShowAlert(state);
      setAlertMessage(message);
      setAlertClass(className);
      setTimeout(() => { setShowAlert(false) }, 3000);
    }


    if (data.status == 409) {
      alertState(true, "User already exists", "danger-alert alert")
    }
    else if (data.status == 200) {
      alertState(true, "User registered successfully", "success-alert alert")
      setTimeout(() => {
        navigate("/login");
      }, 500);
    }
    else if (data.status == 411) {
      alertState(true, "Enter valid credentials", "danger-alert alert")
    }


  }

  return (
    <>
      <div className='auth-page'>
        <img src="../../src/images/img1.png" className='register-image' />

        {showAlert && <Alert alertMessage={alertMessage} alertType={alertClass} />}

          <form onSubmit={registerSubmit} method='POST' className="form register-form">
            <header>Register</header>

            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              className='username input'
              placeholder='Enter your name'
              required
            />

            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className='email input'
              placeholder='Enter your email'
              required
            />

            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className='password input'
              placeholder='Enter your password'
              required
            />

            <input
              type="submit"
              value='Register'
              className='form-submit'
            />

            <div className="form-division">or</div>

            {/* <button className="google-auth-button">
              <div className="google-icon-container"><img src="../../src/images/google.png" className='google-icon' /></div>
              Continue with Google
            </button> */}

            <span className='form-msg'>Already have an account? <Link to="/login" className='login-link'>Login</Link></span>
          </form>

        <FloatingShapes />
      </div>
    </>
  )
}

export default Register