import React from 'react'
import '../App.css'

const Alert = ({alertMessage , alertType}) => {
  return (
    <>
        <div className={alertType}>
            <div className="alert-border"></div>
            {alertMessage}
        </div>
    </>
  )
}

export default Alert