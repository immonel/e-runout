import React from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import MeasurementChart from './MeasurementChart'

const MeasurementModal = ({ measurement, show, setShow }) => {

  const measurementInfo = JSON.stringify({
    ...measurement,
    datasets: measurement.datasets.map(dataset => ({
      ...dataset,
      data: `${dataset.data.length} data points`
    }))
  }, null, 2)

  return (
    <Modal size='xl' centered show={show} onHide={() => setShow(false)}>
      <Modal.Header>
        <h3>Measurement {measurement.name}</h3>
        <Button variant='outline-secondary' onClick={() => setShow(false)}>⨉</Button>
      </Modal.Header>
      <Modal.Body>
        <MeasurementChart measurement={measurement}  />
      </Modal.Body>
      <Card>
        <Card.Body>
          <h5>Measurement info:</h5>
          <pre>{measurementInfo}</pre>
        </Card.Body>
      </Card>
    </Modal>
  )
}

export default MeasurementModal