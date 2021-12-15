import { ListGroup } from 'react-bootstrap'
import './MeasurementList.css'
import Measurement from './MeasurementListItem'

const MeasurementList = ({ measurements, selected, setSelected }) => (
  <ListGroup>
    <div className='list-info'>
      <p>{measurements.length} measurements</p>
    </div>
    { 
      measurements.length 
      ?
        measurements.sort((x, y) => new Date(y.created) - new Date(x.created)).map((x, i) =>
          <ListGroup.Item 
            action 
            onClick={() => setSelected(x.name)} 
            active={x.name === selected}
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
)

export default MeasurementList