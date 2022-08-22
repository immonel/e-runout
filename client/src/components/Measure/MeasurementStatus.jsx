import React from 'react'
import { Card, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import SettingInput from '../SettingInput'

const MeasurementStatus = ({ compact = false }) => {
  const status = useSelector(state => state.status)
  const deviceConfig = useSelector(state => state.config)
  const elapsedTime = new Date(Date.now() - status.startTime)
  
  return (
    <Card className='mb-4'>
      <Card.Header>Measurement status</Card.Header>
      <Card.Body>
        <Table size='sm' borderless style={{ fontSize: '0.8em' }}>
          <tbody>
            <tr>
              <td>Status:</td>
              <td>
                {
                  status.running ?
                    'Measurement in progress...' :
                    'No measurement in progress'
                }
             </td>
            </tr>
            <tr>
              <td>Regression coefficient (calibration):</td>
              <td>{deviceConfig.regressionCoefficient}</td>
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
            {
              !compact &&
                <>
                  <br />
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
                    <td>TTL sensor resolution (μm):</td>
                    <td>
                      <SettingInput
                        isValid={(input) => !isNaN(input)}
                        placeholder={deviceConfig.scaleFactor}
                        propertyName='scaleFactor'
                        type='number'
                      />
                    </td>
                  </tr>

                </>
            }
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}

export default MeasurementStatus