import React from 'react'
import { Card, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import SettingInput from '../SettingInput'

const CalibrationStatus = () => {
  const deviceConfig = useSelector(state => state.config)

  return (
    <Card className='mb-4'>
      <Card.Header>
        Current calibration information
      </Card.Header>
      <Card.Body>
        <Table className='table-borderless'>
          <tbody>
            <tr>
              <td>Regression coefficient:</td>
              <td className='w-50'>
                <SettingInput
                  isValid={(input) => !isNaN(input)}
                  placeholder={deviceConfig.regressionCoefficient}
                  propertyName='regressionCoefficient'
                  type='number'
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}

export default CalibrationStatus