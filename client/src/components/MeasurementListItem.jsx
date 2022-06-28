import React from 'react'
import { Button, ButtonGroup, Row } from 'react-bootstrap'
import { BsDownload, BsTrash, BsFileEarmarkText } from 'react-icons/bs'
import { socket } from '../socket'

const createBlobUrl = (data) => {
  return URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json'
  }))
}

const handleGetMeasurement = (event, measurementId) => {
  event.stopPropagation()
  socket.emit('GET_MEASUREMENT_BY_ID', measurementId, (response) => {
    const blobURL = createBlobUrl(response)
    window.location.href = blobURL
  })
}

const handleDeleteMeasurement = (event, id) => {
  event.stopPropagation()
  socket.emit('DELETE_MEASUREMENT', id)
}

const ActionButtons = ({ measurement }) => (
  <ButtonGroup className='list-item-buttons'>
    <Button variant='outline-danger'
      onClick={(event) => handleDeleteMeasurement(event, measurement.id)}
    >
      <BsTrash />
    </Button>
    <Button variant='outline-secondary'
      onClick={(event) => handleGetMeasurement(event, measurement.id)}
    >
      <BsFileEarmarkText />
    </Button>
    <Button variant='outline-secondary'
      download={`${measurement.name}.json`}
      onClick={(event) => handleGetMeasurement(event, measurement.id)}
    >
      <BsDownload />
    </Button>
  </ButtonGroup>
)

const Measurement = ({ measurement }) => {
  const sampleSize = measurement.datasets[0].data.length
  return (
    <div className="measurement-list-item">
      <Row>
        <span>{measurement.name}</span>
        <span className='text-details'>{sampleSize} sample{sampleSize !== 1 && 's'}</span>
        <span className='text-details'>{measurement.created}</span>
      </Row>
      <ActionButtons measurement={measurement} />
    </div>
  )
}

export default Measurement