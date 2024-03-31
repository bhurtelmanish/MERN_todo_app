import React, { useState } from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { FaBarsStaggered } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";


const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showBars , setShowBars] = useState(false);

  const barsClicked = () => {    
    setBars(crossIcon);
    setShowBars(true);
  }
  const crossClicked = () => {
    setBars(barsIcon);
    setShowBars(false);
  }

  const barsIcon = <FaBarsStaggered onClick={barsClicked} className='nav-link fa-bars' />;
  const crossIcon = <RxCross2 onClick={crossClicked} className='nav-link fa-cross' />;
  const [bars , setBars] = useState(barsIcon);

  const navigate = useNavigate();

  const logoutButtonClicked = () => {
    localStorage.removeItem('token');
    console.log("Successfully logged out");
    navigate('/login');
  }

  const cancelButtonClicked = () => {
    setShowModal(false);
  }

  const logoutClicked = () => {
    setShowModal(true);
    setBars(barsIcon)
    setShowBars(false);
  }

  const hideLinkBox = () => {
    setBars(barsIcon)
    setShowBars(false);
  }

  return (
    <>
    <nav>
      <div className="maxWidth">
        <Link onClick={hideLinkBox} to="/pages/landingpage" className="nav-logo">BH Todos</Link>
        <ul className={`links ${showBars ? 'links-expanded' : ''}`}>
          <Link onClick={hideLinkBox} to="/pages/landingpage" className="nav-link">Home</Link>
          <Link onClick={hideLinkBox} to="/pages/todos" className="nav-link">Todos</Link>
          <li onClick={logoutClicked} className="nav-link logout">Logout</li>
        </ul>
          {bars}
      </div>
    </nav>
    {showModal && 
      <div className="modal-overlay">
        <Modal cancelButtonClicked={cancelButtonClicked} logoutButtonClicked={logoutButtonClicked} />
       </div>}
    </>
  );
}

export default Navbar;
