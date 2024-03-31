import React from 'react'
import Button from './Button'

const Modal = ({cancelButtonClicked , logoutButtonClicked}) => {
  return (
    <>
      <div className="modal">
          <header className="modal-title">Are you sure you want to logout?</header>
          <div className="description">Logging out means that you have to login again and you won't be able to use the todos feature without logging in</div>
          <div className="confirm-buttons">
              <Button buttonClass="logout-button" buttonValue="Logout" onClick={logoutButtonClicked} />
              <Button buttonClass="cancel-button" buttonValue="Cancel" onClick={cancelButtonClicked} />
          </div>
      </div>

    </>
  )
}

export default Modal