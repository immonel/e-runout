import React from 'react'
import { Card, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { socket } from '../../socket'
import SettingInput from '../SettingInput'
import StartStopButton from '../StartStopButton'

const MeasurementControls = () => {
  const deviceConfig = useSelector(state => state.config)

  const handleStartMeasurement = () => 
    socket.emit('START_MEASUREMENT')
  
  const handleStopMeasurement = () => 
    socket.emit('STOP_MEASUREMENT')

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
        <StartStopButton
          onClickStart={handleStartMeasurement}
          onClickStop={handleStopMeasurement}
        />
      </Card.Body>
    </Card>
  )
}

export default MeasurementControls