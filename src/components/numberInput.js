import React, { useState } from 'react';
import { number, func } from 'prop-types';

const NumberInput = ({
  minValue,
  maxValue,
  onChange,
  initialValue
}) => {
  const [value, setValue] = useState(initialValue || minValue);

  const validateInput = (e) => {
    const { value } = e.target;

    if (value === '') {
      setValue('');
      onChange('');
    }
    if (parseInt(value, 10).toString() === 'NaN') return;
    if (value < minValue || value > maxValue) return;

    setValue(parseInt(value, 10));
    onChange(parseInt(value, 10));
  }

  return (
    <input
      data-testid='numberInput'
      type='number'
      className='primary-input'
      onChange={validateInput}
      value={value}
      placeholder={`enter a number between ${minValue} and ${maxValue}`}
    />
  )
};

NumberInput.propTypes = {
  minValue: number,
  maxValue: number,
  initialValue: number,
  onChange: func.isRequired
};

NumberInput.defaultProps = {
  minValue: 1,
  maxValue: 50
}

export default NumberInput;