import React, { useCallback } from 'react'
import { ButtonGroup, Card, Table, ToggleButton } from 'react-bootstrap'
import { BsPlayFill, BsStopFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { socket } from '../../socket'
import SettingInput from '../SettingInput'



const MeasurementControls = () => {
  const deviceStatus = useSelector(state => state.status)
  const deviceConfig = useSelector(state => state.config)

  const handleStartMeasurement = useCallback(() => {
    socket.emit('START_MEASUREMENT')
    // setStartTime(Date.now())
  }, [])
  
  const handleStopMeasurement = useCallback(() => socket.emit('STOP_MEASUREMENT'), [])

  return (
    <Card>
      <Card.Header>
        Create a new measurement
      </Card.Header>
      <Card.Body>
        <Table>
          <tbody>
            <tr>
              <td>Measurement name:</td>
              <td>
                <SettingInput
                  isValid={(input) => input.length < 50}
                  placeholder={deviceConfig.measurementName}
                  propertyName='measurementName'
                  optional
                />
              </td>
            </tr>
            <tr>
              <td>Component reference:</td>
              <td>
                <SettingInput
                  isValid={(input) => input.length < 50}
                  placeholder={deviceConfig.componentRef}
                  propertyName='componentRef'
                  optional
                />
              </td>
            </tr>
            <tr>
              <td>TTL sensor name:</td>
              <td>
                <SettingInput
                  isValid={(input) => input.length < 50}
                  placeholder={deviceConfig.ttlSensorName}
                  propertyName='ttlSensorName'
                />
              </td>
            </tr>
            <tr>
              <td>Eddy Current sensor name:</td>
              <td>
                <SettingInput
                  isValid={(input) => input.length < 50}
                  placeholder={deviceConfig.eddySensorName}
                  propertyName='eddySensorName'
                />
              </td>
            </tr>
            <tr>
              <td>TTL Sensor resolution (μm):</td>
              <td>
                <SettingInput
                  isValid={(input) => !isNaN(input)}
                  placeholder={deviceConfig.scaleFactor}
                  propertyName='scaleFactor'
                  type='number'
                />
              </td>
            </tr>
            <tr>
              <td>Cycle count:</td>
              <td>
                <SettingInput
                  isValid={(input) => Number.isInteger(input) && input > 0}
                  placeholder={deviceConfig.cycleCount}
                  propertyName='cycleCount'
                  type='number'
                />
              </td>
            </tr>
          </tbody>
        </Table>
        <ButtonGroup className='status-buttons'>
            <ToggleButton
              className='status-button'
              disabled={deviceStatus.socketConnectionStatus !== "OK"}
              type='radio'
              checked={deviceStatus.running}
              variant="outline-success"
              onClick={handleStartMeasurement}
            >
              <BsPlayFill />Start
            </ToggleButton>
            <ToggleButton
              className='status-button'
              disabled={deviceStatus.socketConnectionStatus !== "OK"}
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

export default MeasurementControls