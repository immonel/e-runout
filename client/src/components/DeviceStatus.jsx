import './DeviceStatus.css'
import React from 'react'
import { Card, Row, Table } from 'react-bootstrap'

const DeviceStatus = ({ deviceStatus, elapsedTime }) => (
  <Card className='device-status'>
    <Card.Header><h2>Device status</h2></Card.Header>
    <Card.Body>
      <Table>
        <tbody>
          <tr>
            <td>Connection status:</td>
            <td>
              <Row>
                WebSocket: {deviceStatus.socketConnectionStatus}
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
        </tbody>
      </Table>
    </Card.Body>
  </Card>
)

export default DeviceStatus