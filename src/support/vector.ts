// const COLOURS_VECTORS = ["red", "orange", "green", "blue", "purple", "violet"] as const;
// const COLOUR_AXES = "grey";
// const COLOUR_VECTOR_RESULT = "black";

/**
 * This is a 2D vector class. It handles the storing and modifying of a vector. All parameters are optional
  * @param x The x component
    @param y The y component
    @param magnitude The magnitude (If this is passed, it will create a vector using the magnitude and angle
    ignoring x, y)
    @param angle: The angle of the vector (This is only needed when the magnitude is passed in)
    @param rounding_decimal: How many decimals to round the other parameters in the vector
 */
class Vector2D 
{
    x: number
    y: number
    magnitude: number
    angle: number
    angle_rad: number
    rounding_decimal: number

  constructor(x = 0, y = 0, magnitude = 0, angle = 0, {
    rounding_decimal = 12
  } = {}) {
    
    this.x = x;
    this.y = y;
    this.magnitude = magnitude;
    this.angle = angle % 360;
    this.angle_rad = degsToRads(angle);
    this.rounding_decimal = rounding_decimal;

    if (this.magnitude > 0) {
      this.generateXY();
    } 
    else {
      if (this.magnitude < 0) {
        this.angle += 180;
        this.angle_rad = degsToRads(this.angle);
        this.magnitude *= -1;
        this.generateXY();
      } else {
        this.generateLengthAngle();
      }
    }
  }

  generateXY() {
    /* This method generates the x and y of the vector based on the angle_rad (radian of angle) and length */
    this.x = roundDecimal(this.magnitude * Math.cos(this.angle_rad), this.rounding_decimal);
    this.y = roundDecimal(this.magnitude * Math.sin(this.angle_rad), this.rounding_decimal);
  }

  generateLengthAngle() {
    /* This method generates the length and angle based on the x and y */
    this.calculateMagnitude();

    if (!this.x) {
      if (this.y > 0) {
        this.angle = 90;
      } else {
        if (this.y < 0) {
          this.angle = 270;
        } else {
          this.angle = 0;
        }
      }

      this.convertToRadianAngle();
    } else {
      this.angle_rad = roundDecimal(Math.atan(this.y / this.x), this.rounding_decimal);
      this.angle = radsToDegs(this.angle_rad);

      if (this.x < 0) {
        this.angle += 180;
      } else {
        if (this.y < 0) {
          this.angle += 360;
        }
      }
    }
  }

  convertToRadianAngle() {
    /* Converts the angle from degrees to radians and sets it to the internal variable of self.angle_rad. */
    this.angle_rad = roundDecimal(degsToRads(this.angle), this.rounding_decimal);
  }

  calculateMagnitude() {
    /* Calculates the length of the vector based on the x and y components. */
    this.magnitude = roundDecimal(Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)), this.rounding_decimal);
  }

  isOpposite(other: Vector2D) {
    /* Compares if 2 vectors are opposites to each other by comparing the x and y components */
    if (other instanceof Vector2D) {
      return this.x === -other.x && this.y === -other.y;
    }
  }


  equals(other: Vector2D) {
    if (other instanceof Vector2D) {
      return this.x === other.x && this.y === other.y;
    }

    throw TypeError;
  }

  neg() {
    return new Vector2D(-this.x, -this.y);
  }

  pow(power: number, modulo = null) {
    if (modulo !== null) {
      return new Vector2D(Math.pow(this.x, power) % modulo, Math.pow(this.y, power) % modulo);
    }

    return new Vector2D(Math.pow(this.x, power), Math.pow(this.y, power));
  }

  sub(other: Vector2D) {
    if (other instanceof Vector2D) {
      return new Vector2D(this.x - other.x, this.y - other.y);
    }
  }

  isub(other: Vector2D) {
    if (other instanceof Vector2D) {
      this.x -= other.x;
      this.y -= other.y;
      this.generateLengthAngle();
      return this;
    }
  }

  add(other: Vector2D) {
    if (other instanceof Vector2D) {
      return new Vector2D(this.x + other.x, this.y + other.y);
    }
  }

  iadd(other: Vector2D) {
    if (other instanceof Vector2D) {
      this.x += other.x;
      this.y += other.y;
      this.generateLengthAngle();
      return this;
    }
  }

  multiply(other: number | Vector2D) {
    if (other instanceof Vector2D) {
      return new Vector2D(this.x * other.x, this.y * other.y);
    }

    return new Vector2D(this.x * other, this.y * other);
  }

  imultiply(other: number) {
    this.x *= other;
    this.y *= other;
    this.calculateMagnitude();

    if (other < 0) {
      this.angle += 180;

      if (this.angle >= 360) {
        this.angle -= 360;
        this.convertToRadianAngle();
        return this;
      }
    }
  }

  trueDivide(other: Vector2D) {
    if (other instanceof Vector2D) {
      return new Vector2D(this.x / other.x, this.y / other.y);
    }

    return new Vector2D(this.x / other, this.y / other);
  }

  toBool() {
    return this.magnitude !== 0;
  }

  toString()
  {
    return 'Vector ('+this.x+', '+this.y+') with magnitude: '+this.magnitude+' and angle '+this.angle;
  }

}

function isFloat(value: any) {
  /*
  A function to check if the given string named value is a float
   >>> is_float('3')
  True
  >>> is_float('-0.1')
  True
  >>> is_float('3.3.3')
  False
  >>> is_float('A three')
  False
  */
  try {
    Number.parseFloat(value);
    return true;
  } catch (e) {
    if (e instanceof EvalError) {
      return false;
    } else {
      throw e;
    }
  }
}

function roundDecimal(val: number, digits: number=0){
    return Number(val.toFixed(digits));
}

const radsToDegs = (rad: number) => rad * 180 / Math.PI;

const degsToRads = (deg: number) => (deg * Math.PI) / 180.0;

export {Vector2D, isFloat}