import { Chart } from 'react-chartjs-2'
import regression from 'regression'
import './CalibrationChart.css'

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
  let linregr = {}
  let linregrPoints = []

  if (measurement) {
    linregr = regression.linear(
      measurement.datasets[0].data.map((x, i) => [x, measurement.datasets[1].data[i]])
        .filter(([x, y]) => y < 3500)
    )
    linregrPoints = [
      {
        x: 0,
        y: linregr.equation[1]
      },
      {
        x: (-1 * linregr.equation[1]) / linregr.equation[0],
        y: 0
      }
    ]
  }

  const config = {
    type: 'scatter',  
    data: measurement ? 
      {
        // labels: Array.from({length: measurement.datasets[0].data.length}, (x, i) => i),
        datasets: [{
          type: 'scatter',
          label: 'nauraa',
          data: measurement.datasets[0].data.map((ttlSensorPoint, i) => {
            const eddySensorPoint = measurement.datasets[1].data[i]
            return ({
              x: ttlSensorPoint,
              y: eddySensorPoint
            })
          }),
          backgroundColor: 'rgba(255, 206, 86, 0.7)',
          order: 1
        },
        {
          type: 'line',
          label: 'Linear regression',
          data: linregrPoints,
          borderColor: 'rgb(0, 0, 0)',
          radius: 0,
          order: 0
        }
      ]
      }
     : emptyData(),
    options: {
      maintainAspectRatio: false,
      animation: false,
      scales: {
        x: {
          title: {
            display: true,
            text: 'TTL Sensor reading (m)'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Eddy Current Probe Voltage (V)'
          }
        }
      }
    }
  }

  return (
    <>
      Linear regression:
      {' '}
      {linregr.string}
      <div className='chart'>
        <Chart { ...config } />
      </div>
    </>
  )
}

export default CalibrationChart