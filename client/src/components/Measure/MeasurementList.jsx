import { Button, ListGroup } from 'react-bootstrap'
import Measurement from '../MeasurementListItem'
import { socket } from '../../socket'

const MeasurementList = ({ measurements, selected, setSelected }) => (
  <div className='measurement-list'>
    <ListGroup>
      <div className='list-info'>
        <p>{measurements.length} measurements</p>
      </div>
      { 
        measurements.length 
        ?
          [...measurements].sort((x, y) => new Date(y.created) - new Date(x.created)).map((x, i) =>
            <ListGroup.Item 
              action 
              onClick={() => setSelected(x.id)} 
              active={x.id === selected}
              key={i}
            >
              <Measurement measurement={x} />
            </ListGroup.Item>
          )
        :
            <ListGroup.Item>
              No measurements found.
            </ListGroup.Item>
      }
    </ListGroup>
    <Button
      className="erase-button"
      variant="danger"
      onClick={() => socket.emit('DELETE_MEASUREMENTS')}
    >
      Clear all measurements
    </Button>
  </div>
)

export default MeasurementList