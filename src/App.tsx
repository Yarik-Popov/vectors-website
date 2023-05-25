import './App.css';
import { TextInput } from './components/TextInput';
import {Vector2D} from './support/vector';
import {Turtle} from './components/Turtle';
import { useState } from 'react';

const INPUT_ID1 = 'textInput1';
const INPUT_ID2 = 'textInput2';
const LIST_ID = 'list';

let vectors = Array<Vector2D>();


function App() {
  const [generate, setGenerate] = useState(false);

  const addVector = () => {
    // Removes the input from the previous run
    if (generate)
    {
      vectors.splice(0, vectors.length);
      setGenerate(false);
    }

    // Gets the values from the user
    let x = getNumOrDefault(getValueFromTextInput(INPUT_ID1));
    let y = getNumOrDefault(getValueFromTextInput(INPUT_ID2));
  
    if(x !== 0 || y !== 0)
    {
      let vec = new Vector2D(x, y)
      vectors.push(vec);
      
      // Adds the vector as a list element to the List
      let li = document.createElement("li");
      li.innerText = vec.toString();
      (document.getElementById(LIST_ID) as HTMLElement)?.appendChild(li);
    }
  };

  /**
   * Removes the vector list elements and sets the generate to true so that Turtle can draw the vectors
   */
  const generateResult = () => {
    setGenerate(prev => {return true});
    let ul = document.getElementById(LIST_ID);
    while(ul?.firstChild) 
    {
      ul.removeChild(ul.firstChild);
    }
  }
  

  return (
    <div className="row-centered">
      {/* Text input related */}
      <TextInput id={INPUT_ID1} text='X Direction:' /> 
      <TextInput id={INPUT_ID2} text='Y Direction:' />
      <button className='col-centered' onClick={addVector}> Add Vector </button>

      {<ul id={LIST_ID}></ul>}

      {/* Turtle related */}
      <button className='col-centered' onClick={generateResult}> Generate Vectors </button>
      <Turtle vectors={vectors} generate={generate}></Turtle> 
    </div>
  );
}

/**
 * Gets the value of the HTML Input Element based on its id
 * @param id The id of the HTML Input Element
 */
function getValueFromTextInput(id: string){
  return (document.getElementById(id) as HTMLInputElement).value;
}

/**
 * 
 * @param text The text to be parsed
 * @param def The default value returned if text is not a number
 * @returns Text (if it can be parsed as a number) or def
 */
function getNumOrDefault(text: any, def = 0){
  let num = Number(text);
  if (!isNaN(num))
  {
    return num;
  }
  return def;
}

export default App;
