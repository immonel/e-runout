import React, { useEffect } from 'react'
import { Badge, Button, Card, Col, Container, OverlayTrigger, Row, Table, Tooltip } from 'react-bootstrap'
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
  const elapsedTime = new Date(Date.now() - status.startTime)
  const serialDeviceConnected = status.serialConnectionStatus === 'Connected'

  useEffect(() => {
    socket.on('GET_STATUS', (status) => {
      dispatch(updateStatus(status))
    })
  }, [ dispatch ])

  return (
    <Card className='device-status'>
      <Card.Header><h2>Device status</h2></Card.Header>
      <Card.Body>
        <h5>Connection status:</h5>
        <Container>
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
        <Table>
          <tbody>
            <tr>
              <td>Measurement in progress:</td>
              <td>{String(status.running)}</td>
            </tr>
            <tr>
              <td>Time elapsed:</td>
              <td>{status.running ? 
                `${elapsedTime.getMinutes()}m ${elapsedTime.getSeconds()}s` : 
                '0m 0s'}</td>
            </tr>
            <tr>
              <td>Samples taken:</td>
              {
                status.dataPoints === 0 && status.running ?
                  <td>Waiting for trigger...</td> :
                  <td>{status.dataPoints} sample{status.dataPoints !== 1 && 's'}</td>
              }
            </tr>
          </tbody>
        </Table>
        <Button
          className='status-buttons'
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