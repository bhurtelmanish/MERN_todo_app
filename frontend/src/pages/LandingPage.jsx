import React, { useEffect } from 'react';
import '../App.css';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const protectLandingPage = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log("No tokens are here");
        navigate("/login");
      } else {
        try {
          const response = await fetch(`http://localhost:3001/pages/landingpage`, {
            method: 'GET',
            headers: {
              "Authorization": `${token}`
            }
          });
          const data = await response.json();
          // Handle response based on status codes
          if (data.status === 200) {
            // Token is valid, continue to landing page
            console.log(data.msg);
          } else if (data.status === 400) {
            // No token provided, navigate to login page
            console.log(data.msg);
            navigate('/login');
          } else if (data.status === 411) {
            // Invalid token, navigate to login page
            console.log(data.msg);
            navigate('/login');
          }
        } catch (error) {
          console.error('Error checking token:', error);
          navigate('/login');
        }
      }
    };

    protectLandingPage();
    const intervalId = setInterval(protectLandingPage, 30000);
    
    return () => clearInterval(intervalId);
  }, [navigate]);

  return (
    <div className="landing-page">
      <div className="max-landing">
        <div className="landing-contents">
          <header>
            The Best<span className='gradient1'> Todo Solution </span>You Can <span className='gradient2'>Find On </span>Internet
          </header>
          <span className="landing-description">
            You can create, display, edit, delete, and search the todos and it's completely working as well
          </span>

          <Link to="/pages/todos"><Button buttonClass="landing-button" buttonValue="Create your first todo" /></Link>
        </div>
      {/* <img src="../../src/images/landing-image3.png" className="landing-image" /> */}
      <video autoPlay muted playsInline loop className='landing-image'>
        <source src='../../src/images/video2.mp4' type='video/mp4' />
      </video>
      </div>
    </div>
  );
}

export default LandingPage;
