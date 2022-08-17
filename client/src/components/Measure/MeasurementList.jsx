import { ListGroup } from 'react-bootstrap'
import Measurement from '../MeasurementListItem'
import DeleteAllButton from '../DeleteAllButton'

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
    <DeleteAllButton type='measurement' />
  </div>
)

export default MeasurementList