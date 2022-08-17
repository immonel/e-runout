import React from 'react'
import { Card, Form, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setConfig } from '../../reducers/configReducer'
import { socket } from '../../socket'
import SettingInput from '../SettingInput'
import StartStopButton from '../StartStopButton'

const SampleModeSelect = ({ deviceConfig }) => {
  const dispatch = useDispatch()

  const handleSampleModeChange = (event) => {
    dispatch(setConfig({sampleMode: event.target.value}))
  }

  return (
    <Form.Select
      size='sm'
      onChange={handleSampleModeChange}
      value={deviceConfig.sampleMode}
    >
      <option value='once'>Sample once</option>
      <option value='continuous'>Sample until stop</option>
      <option value='cycles'>Sample {deviceConfig.cycleCount} cycles</option>
    </Form.Select>
  )
}

const CalibrationControls = ({ selectedCalibration }) => {
  const deviceConfig = useSelector(state => state.config)

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
              <td>Sample mode:</td>
              <td>
                <SampleModeSelect deviceConfig={deviceConfig} />
              </td>
            </tr>
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
        <StartStopButton
          onClickStart={() => addToCalibration(selectedCalibration)}
          onClickStop={handleStopMeasurement}
        />
      </Card.Body>
    </Card>
  )
}

export default CalibrationControls