import { Button } from 'react-bootstrap'
import { Chart } from 'react-chartjs-2'
import { useDispatch } from 'react-redux'
import { setConfig } from '../../reducers/configReducer'
import regression from 'regression'

const emptyData = () => ({
  datasets: [{
    label: 'no data',
    data: []
  }]
})

const CalibrationChart = ({ measurement }) => {
  const dispatch = useDispatch()
  let linregr = {}
  let linregrPoints = []

  const setCalibrationButtonDisabled = () =>
    linregr.equation ? !linregr.equation[0] : true

  if (measurement) {
    linregr = regression.linear(
      measurement.datasets[0].data
        .map((ttlSensorPoint, i) => {
          const eddySensorPoint = measurement.datasets[1].data[i]
          return [eddySensorPoint, ttlSensorPoint]
        })
        .filter(([eddySensorPoint, ttlSensorPoint]) => eddySensorPoint < 3500)
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

  const setAsCalibration = () => {
    dispatch(setConfig({
      regressionCoefficient: linregr.equation[0]
    }))
  }

  const config = {
    type: 'scatter',  
    data: measurement ? 
      {
        // labels: Array.from({length: measurement.datasets[0].data.length}, (x, i) => i),
        datasets: [{
          type: 'scatter',
          label: 'Calibration points',
          data: measurement.datasets[0].data.map((ttlSensorPoint, i) => {
            const eddySensorPoint = measurement.datasets[1].data[i]
            return ({
              x: eddySensorPoint,
              y: ttlSensorPoint
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
            text: 'Eddy Current Probe reading'
          }
        },
        y: {
          title: {
            display: true,
            text: 'TTL Sensor reading'
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
      <Button 
        onClick={setAsCalibration}
        disabled={setCalibrationButtonDisabled()}
      >
        Use this calibration
      </Button>
    </>
  )
}

export default CalibrationChart