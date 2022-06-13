import React, { useCallback } from 'react'
import { ButtonGroup, Card, Col, Row, Table, ToggleButton } from 'react-bootstrap'
import { BsPlayFill, BsStopFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { socket } from '../../socket'
import SettingInput from '../SettingInput'



const CalibrationControls = () => {
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
        Calibration controls
      </Card.Header>
      <Card.Body>
        <Table>
          <tbody>
            <tr>
              <td>TTL Sensor resolution (m):</td>
              <td>
                <Row>
                  <Col xs={5}>
                    <SettingInput
                      isValid={(input) => !isNaN(input)}
                      placeholder={deviceConfig.ttlSensorCoefficient}
                      propertyName='ttlSensorCoefficient'
                    />
                  </Col>
                </Row>
              </td>
            </tr>
            <tr>
              <td>Eddy Sensor Coefficient (m/V):</td>
              <td>
                <Row>
                  <Col xs={5}>
                    <SettingInput
                      isValid={(input) => !isNaN(input)}
                      placeholder={deviceConfig.eddySensorCoefficient}
                      propertyName='eddySensorCoefficient'
                    />
                  </Col>
                </Row>
              </td>
            </tr>
            <tr>
              <td>Cycle count:</td>
              <td>
                <Row>
                  <Col xs={5}>
                    <SettingInput
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

export default CalibrationControls