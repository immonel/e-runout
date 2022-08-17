import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { socket } from '../socket'

const CONFIRM_TIMEOUT = 3000

const DeleteAllButton = ({ type }) => {
  const [ buttonState, setButtonState ] = useState('default')
  
  const confirm = () => {
    setButtonState('confirm')
    setTimeout(() => {
      setButtonState('default')
    }, CONFIRM_TIMEOUT)
  }

  const deleteAll = () => {
    socket.emit('DELETE_MEASUREMENTS', type)
    setButtonState('default')
  }

  const buttonStates = {
    default: {
      text: `Delete all ${type}s`,
      onClick: confirm
    },
    confirm: {
      text: 'Press again to confirm',
      onClick: deleteAll
    }
  }

  return (
    <Button
      className="erase-button"
      variant="danger"
      onClick={buttonStates[buttonState].onClick}
    >
      {buttonStates[buttonState].text}
    </Button>
  )
}

export default DeleteAllButton