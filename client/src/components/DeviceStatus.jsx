import React, { useEffect } from 'react'
import { Badge, Button, Card, Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { socket } from '../socket'
import { updateStatus } from '../reducers/statusReducer'
import { BsArrowCounterclockwise, BsCpuFill, BsDiagram2Fill, BsServer } from 'react-icons/bs'

const handleReboot = () => socket.emit('RESTART_DEVICE')

const deviceStatusBadgeColors = {
  'Connecting...': 'warning',
  'Connected': 'success',
}

const DeviceStatusBadge = ({ name, icon, status, extraInfo }) => (
  <h1>
    <OverlayTrigger 
      placement='bottom'
      overlay={
        <Tooltip>
          <b>{name}</b><br/>
          {extraInfo && <>{extraInfo}<br/></>}
          {status}
        </Tooltip>
      } 
    >
      <Badge
        bg={deviceStatusBadgeColors[status] || 'danger'}
      >
        {icon}
      </Badge>
    </OverlayTrigger>
  </h1>
)

const DeviceStatus = () => {
  const status = useSelector(state => state.status)
  const dispatch = useDispatch()
  const serialDeviceConnected = status.serialConnectionStatus === 'Connected'

  useEffect(() => {
    socket.on('GET_STATUS', (status) => {
      dispatch(updateStatus(status))
    })
  }, [ dispatch ])

  return (
    <Card className='mb-4'>
      <Card.Header>Connection status</Card.Header>
      <Card.Body>
        <Container className='my-3'>
          <Row className='justify-content-center'>
            <Col className='text-center'>
              <DeviceStatusBadge
                name='WebSocket (Raspberry Pi)'
                icon={<BsDiagram2Fill />}
                status={status.socketConnectionStatus}
              />
              <small>Backend</small>
            </Col>
            <Col className='text-center'>
              <DeviceStatusBadge
                name='Database (MongoDB)'
                icon={<BsServer />}
                status={status.dbConnectionStatus}
              />
              <small>Database</small>
            </Col>
            <Col className='text-center'>
              <DeviceStatusBadge
                name='Serial (Teensy)'
                icon={<BsCpuFill />}
                status={status.serialConnectionStatus}
                extraInfo={`Path: ${status.serialPath}`}
              />
              <small>MCU</small>
            </Col>
          </Row>
        </Container>
        <Button
          className='icon-button'
          onClick={handleReboot}
          disabled={!serialDeviceConnected}
        >
          <BsArrowCounterclockwise /> Restart MCU
        </Button>
      </Card.Body>
    </Card>
  )
}

export default DeviceStatus