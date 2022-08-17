import { Chart } from 'react-chartjs-2'

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

const MeasurementChart = ({ measurement }) => {

  const config = {
    type: 'line',  
    data: measurement ? 
      {
        labels: Array.from({length: measurement.datasets[0].data.length}, (x, i) => i),
        datasets: measurement.datasets.map((dataset, i) => {
          const average = dataset.data.reduce((a, b) => a + b, 0) / dataset.data.length
          return {
            label: dataset.name,
            data: dataset.data.map((data, i) => ({x: i, y: data - average})),
            backgroundColor: chartColors[i % 3],
            borderColor: chartColors[i % 3]
        }})
      }
     : emptyData(),
    options: {
      scales: {
        x: {
          type: 'linear'
        },
        y: {
          title: {
            display: true,
            text: 'Runout (μm)'
          }
        }
      },
      elements: {
        line: {
          tension: 0
        }
      },
      maintainAspectRatio: false,
      parsing: false,
      animation: false,
      radius: 0
    }
  }

  return (
    <div className='chart'>
      <Chart { ...config } />
    </div>
  )
}

export default MeasurementChart