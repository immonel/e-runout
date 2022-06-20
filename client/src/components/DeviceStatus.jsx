import './DeviceStatus.css'
import React, { useEffect } from 'react'
import { Card, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { socket } from '../socket'
import { updateStatus } from '../reducers/statusReducer'

const DeviceStatus = ({ elapsedTime }) => {
  const status = useSelector(state => state.status)
  const dispatch = useDispatch()

  useEffect(() => {
    socket.on('GET_STATUS', (status) => {
      dispatch(updateStatus(status))
    })
  }, [ dispatch ])

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
                  WebSocket: {status.socketConnectionStatus}
                </Row>
                <Row>
                  Serial: {status.serialConnectionStatus}
                  {' '}
                  {status.serialPath && `(${status.serialPath})`}
                </Row>
              </td>
            </tr>
            <tr>
              <td>Measurement in progress:</td>
              <td>{String(status.running)}</td>
            </tr>
            <tr>
              <td>Time elapsed:</td>
              <td>{status.running ? 
                `${elapsedTime.getMinutes()}m ${elapsedTime.getSeconds()}s` : 
                '0m 0s'}</td>
            </tr>
            <tr>
              <td>Samples taken:</td>
              <td>{status.dataPoints} sample{status.dataPoints !== 1 && 's'}</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}

export default DeviceStatus