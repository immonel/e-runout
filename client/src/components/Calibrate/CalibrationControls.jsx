import React from 'react'
import { ButtonGroup, Card, Table, ToggleButton } from 'react-bootstrap'
import { BsPlayFill, BsStopFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { setConfig } from '../../reducers/configReducer'
import { socket } from '../../socket'
import SettingInput from '../SettingInput'

const CalibrationControls = ({ selectedCalibration }) => {
  const deviceStatus = useSelector(state => state.status)
  const deviceConfig = useSelector(state => state.config)
  const sampleMode = deviceConfig.sampleMode
  const dispatch = useDispatch()

  const addToCalibration = (calibrationId) =>
    socket.emit('APPEND_CALIBRATION', calibrationId)
  
  const handleStopMeasurement = () =>
    socket.emit('STOP_MEASUREMENT')

  return (
    <Card>
      <Card.Header>
        Add data points to selected calibration
      </Card.Header>
      <Card.Body>
        <Table>
          <tbody>
            <tr>
              <td>Cycle count:</td>
              <td className='w-50'>
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
        <ButtonGroup>
          <ToggleButton 
            checked={sampleMode === 'once'}
            variant={sampleMode === 'once' ? 'primary' : 'outline-primary'}
            onClick={() => dispatch(setConfig({sampleMode: 'once'}))}
          >
            Sample once
          </ToggleButton>
          <ToggleButton 
            checked={sampleMode === 'continuous'}
            variant={sampleMode === 'continuous' ? 'primary' : 'outline-primary'}
            onClick={() => dispatch(setConfig({sampleMode: 'continuous'}))}
          >
            Until stop
          </ToggleButton>
          <ToggleButton 
            checked={sampleMode === 'cycles'}
            variant={sampleMode === 'cycles' ? 'primary' : 'outline-primary'}
            onClick={() => dispatch(setConfig({sampleMode: 'cycles'}))}
          >
            Cycles
          </ToggleButton>
        </ButtonGroup>
        <ButtonGroup className='status-buttons'>
            <ToggleButton
              className='status-button'
              disabled={deviceStatus.socketConnectionStatus !== "OK"}
              type='radio'
              checked={deviceStatus.running}
              variant="outline-success"
              onClick={() => addToCalibration(selectedCalibration)}
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