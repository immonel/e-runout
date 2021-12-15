import './MeasurementListItem.css'
import React from 'react'
import { Button, ButtonGroup, Row } from 'react-bootstrap'
import { BsDownload, BsTrash, BsFileEarmarkText } from 'react-icons/bs'
import { socket } from '../socket'
import { baseUrl } from '../config'

const path = `${baseUrl}/api/measurements`

const ActionButtons = ({ measurement }) => (
  <ButtonGroup className='list-item-buttons'>
    <Button variant='outline-danger'
      onClick={async (event) => {
        event.stopPropagation()
        socket.emit('DELETE_MEASUREMENT', measurement.name)
      }}
    >
      <BsTrash />
    </Button>
    <Button variant='outline-secondary'
      href={`${path}/${measurement.name}`}
      onClick={(event) => event.stopPropagation()}
    >
      <BsFileEarmarkText />
    </Button>
    <Button variant='outline-secondary' download
      href={`${path}/${measurement.name}?download=1`}
      onClick={(event) => event.stopPropagation()}
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