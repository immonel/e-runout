import { Chart } from 'react-chartjs-2'
import './Chart.css'

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

const _Chart = ({ measurement }) => {

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

export default _Chart