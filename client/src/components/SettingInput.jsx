import React, { useState } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'

const SettingInput = ({ isValid, placeholder, propertyName, disabled, config, setConfig }) => {
  const [ value, setValue ] = useState('')
  const [ isInvalid, setIsInvalid ] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const newValue = Number(value)
    if (isValid(newValue)) {
      const newConfig = {...config, [propertyName]: newValue}
      setValue('')
      setIsInvalid(false)
      setConfig(newConfig)
    } else {
      setIsInvalid(true)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup hasValidation className='input-group'>
        <Form.Control 
          className='input-field'
          size='sm'
          placeholder={placeholder}
          isInvalid={isInvalid}
          value={value}
          disabled={disabled}
          onChange={(event) => {
            setValue(event.target.value.trim())
          }} 
        />
        <Button disabled={!value} type='submit' size='sm' variant='outline-secondary'>OK</Button> 
      </InputGroup>
    </Form>
  )
}

export default SettingInput