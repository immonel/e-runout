import React from 'react'
import { Button } from 'react-bootstrap'
import { BsPlayFill, BsStopFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'

const StartStopButton = ({ onClickStart, onClickStop }) => {
  const deviceStatus = useSelector(state => state.status)
  const socketConnected = deviceStatus.socketConnectionStatus === 'Connected'
  const running = deviceStatus.running

  return (
    <Button
      className='icon-button'
      disabled={!socketConnected}
      variant={running ? 'danger' : 'success'}
      onClick={running ? onClickStop : onClickStart}
    >
      {
        running ?
          <><BsStopFill />Stop</> :
          <><BsPlayFill />Start</>
      }
    </Button>
  )
}

export default StartStopButton