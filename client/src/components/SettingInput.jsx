import React, { useState } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setConfig } from '../reducers/configReducer'

const SettingInput = ({ isValid, placeholder, propertyName, disabled, type, optional }) => {
  const [ value, setValue ] = useState('')
  const [ isInvalid, setIsInvalid ] = useState(false)
  const dispatch = useDispatch()

  const widthStyle = type === 'number' ? {
    maxWidth: '150px'
  } : {}

  const handleSubmit = (event) => {
    event.preventDefault()
    let newValue = value
    if (type === 'number') {
      newValue = Number(value)
    }
    if (isValid(newValue) && value.trim().length > 0) {
      setValue('')
      setIsInvalid(false)
      dispatch(setConfig({
        [propertyName]: newValue
      }))
    } else {
      setIsInvalid(true)
    }
  }

  const clearValue = () => {
    setValue('')
    dispatch(setConfig({
      [propertyName]: null
    }))
  }

  return (
    <Form onSubmit={handleSubmit} style={widthStyle}>
      <InputGroup hasValidation className='input-group'>
        <Form.Control 
          className='input-field'
          size='sm'
          placeholder={placeholder}
          isInvalid={isInvalid}
          value={value}
          disabled={disabled}
          onChange={(event) => {
            setValue(event.target.value)
          }} 
        />
        {
          optional &&
            <Button
              size='sm'
              variant='outline-secondary'
              onClick={clearValue}
            >
              ⨉
            </Button>
        }
        <Button
          disabled={!value}
          type='submit'
          size='sm'
          variant='outline-secondary'
        >
          OK
        </Button> 
      </InputGroup>
    </Form>
  )
}

export default SettingInput