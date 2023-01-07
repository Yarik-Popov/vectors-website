import { useEffect, useRef, useState } from 'react';
import {Vector2D} from '../support/vector';
import './TurtleCanvas.css';

export const LIST_ID = 'list';
const OUTPUT = 'output';

const SIZE = 800;
const MID_POINT = SIZE/2;

const COLOURS_VECTORS = ["red", "orange", "green", "blue", "purple", "violet"];
const COLOUR_AXES = "grey";
const COLOUR_VECTOR_RESULT = "black";


export function TurtleCanvas(props: {vectors: Vector2D[]}){
    const CANVAS_REFERENCE = useRef<HTMLCanvasElement | null>(null);
    const [text, setText] = useState('');
    const CANVAS = CANVAS_REFERENCE.current ?? document.createElement('canvas');

    useEffect(() => {
        window.addEventListener('load', initialize)


    return () => {
        window.removeEventListener('load', initialize);
    }
 }, []);


    const initialize = () => {
        makeGrid();
        console.log('Init');
        // setText('');
    }

    const drawVector = (vec: Vector2D, x=MID_POINT, y=MID_POINT, scaling=1) => 
    {
        const ctx = CANVAS.getContext('2d');
        if(ctx !== null)
        {
            console.log('draw?')
            ctx.strokeStyle = 'red';
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x+vec.x, y-vec.y);
            ctx.stroke();
        }
    }

    const makeGrid = (clear=true) => {
        const ctx = CANVAS.getContext('2d');
        if(ctx !== null)
        {
            if(clear)
            {
                console.log('clearing canvas')
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

    const generateResult = () => 
    {
        makeGrid();
        console.log('generate')

        let outputVector = new Vector2D()
        for(let i of props.vectors)
        {
            console.log(i.toString());
          outputVector.iadd(i);
          drawVector(i);
        }

        let ul = document.getElementById(LIST_ID);
        while(ul?.firstChild) 
        {
          ul.removeChild(ul.firstChild);
        }
        
        props.vectors.splice(0, props.vectors.length);
        setText(outputVector.toString());
    }

    return (<div>
    <button className='col-centered' onClick={generateResult}> Generate Vectors </button>
      <p id={OUTPUT}> {text} </p>
      <canvas 
        ref={CANVAS_REFERENCE} height={SIZE} width={SIZE} className='canvas'>
    </canvas>
    </div>
    )
}


// function drawVector(canvas: HTMLCanvasElement, vec: Vector2D, x=0, y=0, scaling=1, colour='red')
// {
//     const ctx = canvas.getContext('2d');
//     if(ctx !== null)
//     {

//     }
// }

// function draw_vector(length: number, angle: number, {
//     back_to_east = true,
//     scaling = 1,
//     arrow_decimal = 0.1,
//     arrow_angle = 30
//   } = {}) {
//     /*
//     Draws the vector of the given length and angle to the right or east direction.
//      :param length: Length of vector
//     :param angle: Angle relative to east
//     :param back_to_east: Returns the turtle back to facing east
//     :param scaling: Scales the vector
//     :param arrow_decimal: The decimal of how long the arrow of the vector will be
//     :param arrow_angle: The angle the arrows will make with the original line
//     :return:
//     */
//     var arrow_length;
//   //   turtle.lt(angle);
//   //   turtle.forward(length * scaling);
//   //   arrow_length = length * scaling * arrow_decimal;
//   //   turtle.lt(arrow_angle);
//   //   draw_back_forward(arrow_length);
//   //   turtle.rt(2 * arrow_angle);
//   //   draw_back_forward(arrow_length);
//   //   turtle.lt(arrow_angle);
  
//     if (back_to_east) {
//       // turtle.rt(angle);
//     }
//   }
  
//   // function draw_back_forward(length) {
//   //   /* Moves the turtle back and forward a set length. Used in the draw_vectors() function */
//   //   turtle.back(length);
//   //   turtle.forward(length);
//   // }
  
// function draw_vectors(...vectors: Vector2D[]) {
//     /*
//     Draws the list of Vector2D objects to a turtle window, adds the vectors together and returns it. Returns None if
//     there are no vectors
//      :param vectors: List of Vector2D objects
//     :return: Result Vector or None
//     */
//     var canvas_height, canvas_width, scaling, vector_result, vectors: Vector2D[], x, x_max, x_min, x_range, x_scaling, y, y_max, y_min, y_range, y_scaling;
  
//     if (!vectors || vectors.length === 1 && !vectors[0]) {
//       return;
//     }
  
//     if (vectors.length === 1 && vectors[0] instanceof Array) {
//       vectors = vectors[0];
//     }
  
//   //   turtle.TurtleScreen._RUNNING = true;
//   //   turtle.home();
//   //   turtle.clear();
//     vector_result = new Vector2D();
//     canvas_height = canvas_width = 600;
//   //   [canvas_width, canvas_height] = turtle.screensize();
//     x_min = x_max = y_min = y_max = 0;
//     x_scaling = y_scaling = 1;
  
//     for (var i, _pj_c = 0, _pj_a = vectors, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
//       i = _pj_a[_pj_c];
//       vector_result.iadd(i);
//       x = vector_result.x;
//       y = vector_result.y;
  
//       if (x_min > x) {
//         x_min = x;
//       } else {
//         if (x_max < x) {
//           x_max = x;
//         }
//       }
  
//       if (y_min > y) {
//         y_min = y;
//       } else {
//         if (y_max < y) {
//           y_max = y;
//         }
//       }
//     }
  
//     x_range = x_max - x_min;
//     y_range = y_max - y_min;
  
//     if (x_range) {
//       x_scaling = canvas_width / x_range;
//     }
  
//     if (y_range) {
//       y_scaling = canvas_height / y_range;
//     }
  
//     scaling = Math.min(x_scaling, y_scaling);
  
//     if (x_range && !y_range) {
//       scaling = x_scaling;
//     } else {
//       if (y_range && !x_range) {
//         scaling = y_scaling;
//       }
//     }
  
//     for(let i=0, val; i < vectors.length; i++)
//     {
      
//     }
  
//   //   turtle.pencolor(COLOUR_VECTOR_RESULT);
//   //   turtle.home();
//     // draw_vector(vector_result.magnitude, vector_result.angle, {
//     //   "back_to_east": false,
//     //   "scaling": scaling
//     // });
//     return vector_result;
// }
  