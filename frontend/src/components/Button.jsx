import React from 'react'

const Button = ({buttonClass , buttonValue , onClick , buttonId}) => {
  return (
    <button className={buttonClass} id={buttonId} onClick={onClick}>{buttonValue}</button>
  )
}

export default Button