import { Button, ListGroup } from 'react-bootstrap'
import { BsPlusLg } from 'react-icons/bs'
import { socket } from '../../socket'
import Measurement from '../MeasurementListItem'

const createNewCalibration = () =>
  socket.emit('CREATE_CALIBRATION')

const deleteCalibrations = () =>
  socket.emit('DELETE_CALIBRATIONS')

const CalibrationList = ({ calibrations, selected, setSelected }) => (
  <div className='calibration-list'>
    <ListGroup>
      <div className='list-info'>
        <p>{calibrations.length} calibrations</p>
      </div>
      <ListGroup.Item
        action
        onClick={createNewCalibration}
        id='create-calibration-button'
      >
        <BsPlusLg className='mx-2' /><b>Create a new calibration</b>
      </ListGroup.Item>
      { 
        calibrations.length 
        ?
          [...calibrations].sort((x, y) => new Date(y.created) - new Date(x.created)).map((x, i) =>
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
              No calibrations found.
            </ListGroup.Item>
      }
    </ListGroup>
    <Button
      className="erase-button"
      variant="danger"
      onClick={deleteCalibrations}
    >
      Clear all calibrations
    </Button>
  </div>
)

export default CalibrationList