import './DeviceStatus.css'
import React, { useCallback, useEffect, useState } from 'react'
import { ButtonGroup, Card, Col, Form, Row, Table, ToggleButton } from 'react-bootstrap'
import { BsStopFill, BsPlayFill } from 'react-icons/bs'
import { socket } from '../socket'
import SettingInput from './SettingInput'

const DeviceStatus = ({ connectionStatus }) => {
  const [ deviceStatus, setDeviceStatus ] = useState({
    started: false,
    sampleSize: 0,
    sampleSizeLimit: 0,
    sampleSizeLimited: true,
    sampleSpeed: 0,
    coefficient: 1
  })
  const [ startTime, setStartTime ] = useState(0)
  const elapsedTime = new Date(Date.now() - startTime)

  useEffect(() => {
    socket.on('GET_STATUS', status => {
      setDeviceStatus(status)
    })
  }, [ ])

  const handleStartMeasurement = useCallback(() => {
    socket.emit('START_MEASUREMENT')
    setStartTime(Date.now())
  }, [])
  const handleStopMeasurement = useCallback(() => socket.emit('STOP_MEASUREMENT'), [])
  const handleSetStatus = useCallback((newStatus) => {
    setDeviceStatus(newStatus)
    socket.emit('SET_STATUS', newStatus)
  }, [])

  return (
    <Card className='device-status'>
      <Card.Header><h2>Device status</h2></Card.Header>
      <Card.Body>
        <Table>
          <tbody>
            <tr>
              <td>Connection status:</td>
              <td>{connectionStatus}</td>
            </tr>
            <tr>
              <td>Measurement in progress:</td>
              <td>{String(deviceStatus.started)}</td>
            </tr>
            <tr>
              <td>Time elapsed:</td>
              <td>{deviceStatus.started ? 
                `${elapsedTime.getMinutes()}m ${elapsedTime.getSeconds()}s` : 
                '0m 0s'}</td>
            </tr>
            <tr>
              <td>Sample speed:</td>
              <td>{deviceStatus.sampleSpeed}/s ({deviceStatus.sampleSize} total samples)</td>
            </tr>
            <tr>
              <td>Sample count:</td>
              <td>
                <Row>
                  <Col xs={5}>
                    <SettingInput
                      status={deviceStatus}
                      isValid={(input) => Number.isInteger(input) && input > 0}
                      placeholder={deviceStatus.sampleSizeLimit}
                      propertyName='sampleSizeLimit'
                      disabled={!deviceStatus.sampleSizeLimited}
                    />
                  </Col>
                  <Col>
                    <Form.Check 
                      className='align-middle'
                      inline 
                      size='sm'
                      label='Not limited' 
                      checked={!deviceStatus.sampleSizeLimited}
                      onChange={() => {
                        const newStatus = {...deviceStatus, sampleSizeLimited: !deviceStatus.sampleSizeLimited}
                        handleSetStatus(newStatus)
                      }}
                    />
                  </Col>
                </Row>
              </td>
            </tr>
            <tr>
              <td>Coefficient:</td>
              <td>
                <Row>
                  <Col xs={5}>
                    <SettingInput 
                      status={deviceStatus}
                      isValid={(input) => Number.isFinite(input)}
                      placeholder={deviceStatus.coefficient}
                      propertyName='coefficient'
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
            checked={deviceStatus.started}
            variant="outline-success"
            onClick={handleStartMeasurement}
          >
            <BsPlayFill />Start
          </ToggleButton>
          <ToggleButton
            className='status-button'
            disabled={connectionStatus !== "OK"}
            type='radio'
            checked={!deviceStatus.started}
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