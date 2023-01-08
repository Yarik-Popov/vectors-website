import { useRef, useEffect, useState } from 'react';
import { Vector2D } from '../support/vector';
import './Turtle.css';

// Necessary constants
const SIZE = 800;
const MID_POINT = SIZE/2;
const COLOUR_AXES = "grey";
const COLOURS_VECTORS = ["red", "orange", "green", "blue", "purple", "violet"];
const COLOUR_RESULT_VECTOR = 'black';

/**
 * Component used for drawing of the vectors
 * @param props The vectors and if the Turtle is to generate them or not
 * @returns 
 */
export function Turtle(props: {vectors: Vector2D[], generate: boolean}) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const outputVector = new Vector2D();
    const [text, setText] = useState('');

  useEffect(() => {
    const canvas = canvasRef.current ?? document.createElement('canvas');

    // Makes the grid and generate the vectors if needed
    makeGrid();
    if (props.generate)
        drawVectors(props.vectors);

    // Clean up function to clear the grid
    return () => 
    {
      const ctx = canvas.getContext('2d');
      if(ctx !== null)
          ctx.clearRect(0, 0, SIZE, SIZE);
    }
    
  }, [props.generate]);

  /**
   * 
   * @param vectors Array of Vectors to be drawn
   * @param scaling The scaling (currently unused)
   * @param head The scaling of the arrowhead of each vector
   */
  const drawVectors = (vectors: Vector2D[], scaling=1, head=0.1) => {
    let x = MID_POINT;
    let y = MID_POINT;

    for(let i = 0; i < vectors.length; i++)
    {
        const ctx = (canvasRef.current ?? document.createElement('canvas')).getContext('2d');
        if(ctx !== null)
        {
          // Gets and sets the necessary values used
          let vec = vectors[i];
          outputVector.iadd(vec);
          let xDis = vec.x * scaling;
          let yDis = vec.y * scaling;
          ctx.strokeStyle = COLOURS_VECTORS[i % COLOURS_VECTORS.length];

          // Draws the vector
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x+xDis, y-yDis);
          x += xDis;
          y -= yDis;
          ctx.stroke();

          // Draw arrow; for some reason putting this into seperate function causes a bug
          // Sets the variables used to drawing the vector head
          let arrowLength = head * Math.tan(Math.PI/6) * vec.magnitude;
          let xArrow = arrowLength * Math.sin(vec.angle_rad);
          let yArrow = arrowLength * Math.cos(vec.angle_rad);
          let xShort = xDis * head;
          let yShort = yDis * head;

          // Draw right arrowhead side
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x - xShort + xArrow, y + yShort + yArrow);
          ctx.stroke();

          // Draw left arrowhead side
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x - xShort - xArrow, y + yShort - yArrow);
          ctx.stroke();
        }
    }

    // Draws the result vector
    const ctx = (canvasRef.current ?? document.createElement('canvas')).getContext('2d');
    if(ctx !== null)
    {
      ctx.strokeStyle = COLOUR_RESULT_VECTOR;
      ctx.beginPath();
      ctx.moveTo(MID_POINT, MID_POINT);
      ctx.lineTo(MID_POINT+outputVector.x, MID_POINT-outputVector.y);
      ctx.stroke();

      // Sets the variables used to drawing the vector head
      let arrowLength = head * Math.tan(Math.PI/6) * outputVector.magnitude;
      let xArrow = arrowLength * Math.sin(outputVector.angle_rad);
      let yArrow = arrowLength * Math.cos(outputVector.angle_rad);
      let xShort = outputVector.x * scaling * head;
      let yShort = outputVector.y * scaling * head;

      // Draw right arrowhead side
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - xShort + xArrow, y + yShort + yArrow);
      ctx.stroke();

      // Draw left arrowhead side
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - xShort - xArrow, y + yShort - yArrow);
      ctx.stroke();
    }

    setText('Result Vector: '+outputVector.toString());
  }

  /**
   * Makes the grid at the center of the canvas and clears the previous drawings if clear = true.
   * @param clear Clears the grid
   */
  const makeGrid = (clear=true) => {
    const canvas = canvasRef.current ?? document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if(ctx !== null)
    {
        if(clear)
        {
            ctx.clearRect(0, 0, SIZE, SIZE);
        }

        // X-axis
        ctx.beginPath();
        ctx.strokeStyle = COLOUR_AXES;
        ctx.moveTo(0, MID_POINT);
        ctx.lineTo(SIZE, MID_POINT);
        ctx.stroke();

        // Y-axis
        ctx.moveTo(MID_POINT, 0);
        ctx.lineTo(MID_POINT, SIZE);
        ctx.stroke();
        ctx.moveTo(MID_POINT, MID_POINT);
        ctx.save();
    }
}

  return (
    <>
    <p>{text}</p> 
    <canvas ref={canvasRef} width={SIZE} height={SIZE} className='my-canvas' />
    </> 
  );
}
