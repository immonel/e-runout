import React from 'react'
import { useRef } from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import { BsPrinter } from 'react-icons/bs';
import ReactToPrint from 'react-to-print';
import MeasurementChart from './MeasurementChart'

const PrintWrapper = React.forwardRef((props, ref) => (
  <div className='print-wrapper' ref={ref}>
    {props.children}
  </div>
))

const MeasurementModal = ({ measurement, show, setShow }) => {
  const componentRef = useRef()

  const measurementInfo = JSON.stringify({
    ...measurement,
    datasets: measurement.datasets.map(dataset => ({
      ...dataset,
      data: `${dataset.data.length} data points`
    }))
  }, null, 2)

  return (
    <Modal size='xl' centered show={show} onHide={() => setShow(false)}>
      <PrintWrapper ref={componentRef}>
        <Modal.Header>
          <h3>Measurement {measurement.name}</h3>
          <div>
            <ReactToPrint
              trigger={() =>
                <Button className='mx-2' variant='outline-secondary'>
                  <BsPrinter />
                </Button>}
              content={() => componentRef.current}
            />
            <Button variant='outline-secondary' onClick={() => setShow(false)}>⨉</Button>
          </div>
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
      </PrintWrapper>
    </Modal>
  )
}

export default MeasurementModal