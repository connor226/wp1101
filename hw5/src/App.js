import React, {useState} from 'react'
import Output from './Containers/output'
import Keyboard from './Containers/keyboard'

const digits = '0123456789';
const operands = '+/-*%';
const sqrt = (num) => Math.sqrt(num);
const sin = (num) => Math.sin(num);
const cos = (num) => Math.cos(num);
const tan = (num) => Math.tan(num);
const sec = (num) => Math.sec(num);
const csc = (num) => Math.cos(num);
const cot = (num) => Math.cot(num);
const asin = (num) => Math.asin(num);
const acos = (num) => Math.acos(num);
const atan = (num) => Math.atan(num);
const asec = (num) => Math.asec(num);
const acsc = (num) => Math.acos(num);
const acot = (num) => Math.acot(num);
const log2 = (num) => Math.log2(num);
const log10 = (num) => Math.log10(num);
const logE = (num) => Math.log(num);
const PI = Math.PI;
const E = Math.E;

export default function App() {
  const [number, setNumber] = useState("0");
  const [expression, setExpression] = useState("");
  const [type, setType] = useState("basic");  // basic, geometric, complex, (Matrix)

  const changeExpression = (e) =>{
    if(e.target.innerText === 'AC'){  // all clear
      setNumber('0');
      setExpression('');
    }
    else  if(!e.target.innerText){  // backspace
      if(number.length === 1)  setNumber('0');  // no more digits to remove
      else  setNumber(number => number.slice(0, number.length-1));
    }  
    else  if(e.target.innerText === '='){  // =
      if(expression.includes('=')) return;  // first input after '='
      let answer = String(eval(expression + number));
      if(answer.length > 13)  answer = Number(answer).toExponential(6).toString();
      if(answer === "Infinity"){
        if((expression + number).includes('/ 0'))  setNumber("錯誤: 不能除以0");
        else  setNumber("錯誤: 溢位");
      }
      else  setNumber(answer);
      setExpression(expression => expression + number + ' =');
    }
    else{
      if(digits.includes(e.target.innerText)){  // pure digits
        if(expression.includes('=')){  // first input after '='
          setExpression('');
          setNumber(e.target.innerText);
        }
        else{
          if(number === '0')  setNumber('');
          setNumber(number => number + e.target.innerText);
        }
      }
      else  if(e.target.innerText === '.'){  // .
        if(expression.includes('=')){  // first input after '='
          setExpression('');
          setNumber('0.');
        }
        else  if(!number.includes('.'))  setNumber(number => number + e.target.innerText);  // can only have one .
      }
      else  if(operands.includes(e.target.innerText)){  // operands
        console.log(number);
        if(number.includes('錯誤'))  return;
        if(e.target.innerText === '+/-'){  // toggle +/-
          if(expression.includes('='))  setExpression('');
          setNumber(number => String(eval(number + '*(-1)')));
        }
        else  if(e.target.innerText === '%'){
          if(expression.includes('='))  setExpression('');
            setNumber(number => String(eval(number + '*0.01')));
        }
        else{  // pure + - * /
          if(expression.includes('='))  setExpression(number + ' ' + e.target.innerText + ' ');  // first input after '='
          else  setExpression(expression => expression + number + ' ' + e.target.innerText + ' ');
          setNumber("0");
        }
      }
    }
  }

  return (
    <div className="calculator-container">
      <Output number={number} expression={expression}></Output>
      <Keyboard type={type} changeExpression={changeExpression}></Keyboard>
    </div>
  );
}

/*
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));
*/