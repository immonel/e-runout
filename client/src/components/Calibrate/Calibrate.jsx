import React from 'react'
import { Button, ButtonGroup, Card, Col, Row, Table } from 'react-bootstrap'
import { Chart } from 'react-chartjs-2'
import '../Chart.css'
import SettingInput from '../SettingInput'

const chartColors = [
  'rgba(54, 162, 235, 0.7)',
  'rgba(255, 99, 132, 0.7)',
  'rgba(255, 206, 86, 0.7)'
]

const emptyData = () => ({
  datasets: [{
    label: 'no data',
    data: []
  }]
})

const CalibrationChart = ({ measurement }) => {
  const config = {
    type: 'line',  
    data: measurement ? 
      {
        labels: Array.from({length: measurement.datasets[0].data.length}, (x, i) => i),
        datasets: measurement.datasets.map((dataset, i) => ({
          label: dataset.name,
          data: dataset.data.map((data, i) => ({x: i, y: data})),
          backgroundColor: chartColors[i % 3],
          borderColor: chartColors[i % 3]
        }))
      }
     : emptyData(),
    options: {
      maintainAspectRatio: false,
      parsing: false,
      radius: 0
    }
  }

  return (
    <div className='chart'>
      <Chart { ...config } />
    </div>
  )
}

const Calibrate = () => {
  return (
    <Row>
      <Col xs={12} md={12} lg={6}>
        <Card>
          <Card.Header>
            Calibration
          </Card.Header>
          <Card.Body>
            <Table>
              <tbody>
                <tr>
                  <td>Coefficient:</td>
                  <td>{<SettingInput />}</td>
                </tr>
                <tr>
                  <td>Sample cycle count:</td>
                  <td>{<SettingInput />}</td>
                </tr>
              </tbody>
            </Table>
            <ButtonGroup>
              <Button>
                Reset
              </Button>
              <Button>
                Sample once
              </Button>
              <Button>
                Sample rounds
              </Button>
            </ButtonGroup>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={12} lg={6}>
        <CalibrationChart />
      </Col>
    </Row>
  )
}

export default Calibrate