import React, { useState } from 'react'
import Button from './Button'
import { RxCross2 } from "react-icons/rx";

const Form = ({buttonValue , addTodoClicked , cancelClicked , changeInTitle , changeInDescription}) => {

  return (
    <>
      <div className="modal-form">
        <div className='todo-form-upper-section'>
          <header className='todo-form-header'>Create a todo</header>
          <RxCross2 className='cross-icon' onClick={cancelClicked} />
        </div>
          <div className="todo-inputs">
            <input type="text" className="todo-title" placeholder='Todo Title' onChange={changeInTitle} />
            <input type="text" className="todo-description" placeholder='Todo Description' onChange={changeInDescription} />
          </div>
          <div className="todo-confirm-buttons">
              <Button buttonClass="logout-button" buttonId="todo-create-button" buttonValue={buttonValue} onClick={addTodoClicked} />
          </div>
      </div>

    </>
  )
}

export default Form