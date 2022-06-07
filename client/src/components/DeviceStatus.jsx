import './DeviceStatus.css'
import React, { useCallback, useEffect, useState } from 'react'
import { ButtonGroup, Card, Col, Row, Table, ToggleButton } from 'react-bootstrap'
import { BsStopFill, BsPlayFill } from 'react-icons/bs'
import { socket } from '../socket'
import SettingInput from './SettingInput'

const DeviceStatus = ({ connectionStatus }) => {
  const [ deviceStatus, setDeviceStatus ] = useState({
    serialConnectionStatus: 'Connecting...',
    serialPath: '',
    running: false,
    dataPoints: 0,
    sampleSpeed: 0
  })
  const [ deviceConfig, setDeviceConfig ] = useState({})

  const setConfig = (config) => {
    setDeviceConfig(config)
    socket.emit('SET_CONFIG', config)
  }

  const [ startTime, setStartTime ] = useState(0)
  const elapsedTime = new Date(Date.now() - startTime)

  useEffect(() => {
    socket.on('GET_STATUS', status => {
      setDeviceStatus(status)
    })
    socket.on('GET_CONFIG', config => {
      setDeviceConfig(config)
    })
    socket.emit('GET_CONFIG')
    socket.emit('GET_STATUS')
  }, [ ])

  const handleStartMeasurement = useCallback(() => {
    socket.emit('START_MEASUREMENT')
    setStartTime(Date.now())
  }, [])
  const handleStopMeasurement = useCallback(() => socket.emit('STOP_MEASUREMENT'), [])

  return (
    <Card className='device-status'>
      <Card.Header><h2>Device status</h2></Card.Header>
      <Card.Body>
        <Table>
          <tbody>
            <tr>
              <td>Connection status:</td>
              <td>
                <Row>
                  WebSocket: {connectionStatus}
                </Row>
                <Row>
                  Serial: {deviceStatus.connected ? 'Connected' : 'Not connected'}
                  {' '}
                  {deviceStatus.serialPath && `(${deviceStatus.serialPath})`}
                </Row>
              </td>
            </tr>
            <tr>
              <td>Measurement in progress:</td>
              <td>{String(deviceStatus.running)}</td>
            </tr>
            <tr>
              <td>Time elapsed:</td>
              <td>{deviceStatus.running ? 
                `${elapsedTime.getMinutes()}m ${elapsedTime.getSeconds()}s` : 
                '0m 0s'}</td>
            </tr>
            <tr>
              <td>Sample speed:</td>
              <td>{deviceStatus.sampleSpeed}/s ({deviceStatus.dataPoints} total samples)</td>
            </tr>
            <tr>
              <td>Cycle count:</td>
              <td>
                <Row>
                  <Col xs={5}>
                    <SettingInput
                      config={deviceConfig}
                      setConfig={setConfig}
                      isValid={(input) => Number.isInteger(input) && input > 0}
                      placeholder={deviceConfig.cycleCount}
                      propertyName='cycleCount'
                    />
                  </Col>
                </Row>
              </td>
            </tr>
          </tbody>
        </Table>
        <ButtonGroup className='status-buttons'>
          <ToggleButton
            className='status-button'
            disabled={connectionStatus !== "OK"}
            type='radio'
            checked={deviceStatus.running}
            variant="outline-success"
            onClick={handleStartMeasurement}
          >
            <BsPlayFill />Start
          </ToggleButton>
          <ToggleButton
            className='status-button'
            disabled={connectionStatus !== "OK"}
            type='radio'
            checked={!deviceStatus.running}
            variant="outline-danger"
            onClick={handleStopMeasurement}
          >
            <BsStopFill />Stop
          </ToggleButton>
        </ButtonGroup>
      </Card.Body>
    </Card>
  )
}

export default DeviceStatus