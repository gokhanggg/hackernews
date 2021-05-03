import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NumberInput from '../../components/numberInput';

const inputTestID = 'numberInput';

it('should not allow to enter text input', () => {
  const { getByTestId, queryByText } = render(<NumberInput onChange={f => f} />);
  const input = getByTestId(inputTestID);

  fireEvent.change(input, { target: { value: 'test' } });
  expect(queryByText('test')).toBeNull();
});

it('should have default value 1 which is minValue', () => {
  const { getByTestId } = render(<NumberInput onChange={f => f} />);
  const input = getByTestId(inputTestID);

  expect(input.value).toBe('1');
});

it('minValue and maxValue props should work', () => {
  const { getByTestId } = render(<NumberInput minValue={10} maxValue={25} onChange={f => f} />);
  const input = getByTestId(inputTestID);

  fireEvent.change(input, { target: { value: 5 } });
  expect(input.value).toBe('10');
  fireEvent.change(input, { target: { value: 15 } });
  expect(input.value).toBe('15');
  fireEvent.change(input, { target: { value: 26 } });
  expect(input.value).toBe('15');
});

it('should be able to change value to empty string', () => {
  const { getByTestId } = render(<NumberInput onChange={f => f} />);
  const input = getByTestId(inputTestID);

  fireEvent.change(input, { target: { value: '' } });
  expect(input.value).toBe('');
});

it('should call onChange prop with correct value', () => {
  const mockOnChange = jest.fn();
  const { getByTestId } = render(<NumberInput minValue={10} maxValue={25} onChange={mockOnChange} />);
  const input = getByTestId(inputTestID);

  fireEvent.change(input, { target: { value: '' } });
  expect(mockOnChange).toHaveBeenCalledTimes(1);
  expect(mockOnChange).toHaveBeenCalledWith('');

  fireEvent.change(input, { target: { value: 15 } });
  expect(mockOnChange).toHaveBeenCalledTimes(2);
  expect(mockOnChange).toHaveBeenCalledWith(15);

  fireEvent.change(input, { target: { value: 26 } });
  expect(mockOnChange).toHaveBeenCalledTimes(2); // still 2
});