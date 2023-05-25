import { useState } from 'react';
import './TextInput.css';

/**
 * Input interface used for the TextInput component
 */
interface Input {
  text: string,
  id: string
}

/**
 * The TextInput and what the user is supposed to put in
 * @param props The input parameters
 */
export function TextInput(props: Input) {
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <p className='center'> {props.text}</p>

      {/* Input */}
      <input
      id={props.id}
      className='center'
      type="text"
      value={inputValue}
      onChange={event => setInputValue(event.target.value)}
      />
    </div>
  );
}