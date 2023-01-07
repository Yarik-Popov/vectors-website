import { useState } from 'react';
import './TextInput.css';

interface Input {
  text: string,
  id: string
}

export function TextInput(props: Input) {
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <p className='center'> {props.text}</p>

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