import { useRef, useEffect, useState } from 'react';
import { Vector2D } from '../support/vector';
import './TurtleCanvas.css';

const SIZE = 800;
const MID_POINT = SIZE/2;
const COLOUR_AXES = "grey";
const COLOURS_VECTORS = ["red", "orange", "green", "blue", "purple", "violet"];

export function Turtle(props: {vectors: Vector2D[], generate: boolean}) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const outputVector = new Vector2D();
    const [text, setText] = useState('');

  useEffect(() => {
    const canvas = canvasRef.current ?? document.createElement('canvas');
    makeGrid();
    if (props.generate)
        drawVectors(props.vectors);

    return () => {
        // const canvas = canvasRef.current ?? document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if(ctx !== null)
        ctx.clearRect(0, 0, SIZE, SIZE);
    }
    
  }, [props.generate]);

  const drawVectors = (vectors: Vector2D[], scaling=1) => {
    
    let x = MID_POINT;
    let y = MID_POINT;

    for(let i = 0; i < vectors.length; i++)
    {
        const ctx = (canvasRef.current ?? document.createElement('canvas')).getContext('2d');
        if(ctx !== null)
        {
            let vec = vectors[i];
            outputVector.iadd(vec);
            let xDis = vec.x * scaling;
            let yDis = vec.y * scaling;
            ctx.strokeStyle = COLOURS_VECTORS[i % COLOURS_VECTORS.length];
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x+xDis, y-yDis);
            x += xDis;
            y -= yDis;
            ctx.stroke();
        }
    }
    setText('Result Vector: '+outputVector.toString());
  }

  const makeGrid = (clear=true) => {
    const canvas = canvasRef.current ?? document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if(ctx !== null)
    {
        if(clear)
        {
            ctx.clearRect(0, 0, SIZE, SIZE);
        }
        ctx.beginPath();
        ctx.strokeStyle = COLOUR_AXES;
        ctx.moveTo(0, MID_POINT);
        ctx.lineTo(SIZE, MID_POINT);
        ctx.stroke();

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
