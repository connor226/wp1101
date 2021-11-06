import React, {useState} from 'react'
import Output from './Containers/output'
import Keyboard from './Containers/keyboard'
import Augment from './Containers/augment'
import Memory from './Containers/memory'

const digits = '0123456789';
const operands = '+/-*%^';
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
const ln = (num) => Math.log(num);
const PI = Math.PI;
const E = Math.E;

export default function App() {
  const [number, setNumber] = useState("0");
  const [expression, setExpression] = useState("");

  const changeExpression = (e) =>{
    if(e.target.innerText === 'AC'){  // all clear
      setNumber('0');
      setExpression('');
    }
    else  if(!e.target.innerText){  // backspace
      if(number.length === 1)  setNumber('0');  // no more digits to remove
      else  if(number.includes('e'))  setNumber('0');
      else  if(number.length === 2 && number.includes('-'))  setNumber('0');
      else  setNumber(number => number.slice(0, number.length-1));
    }  
    else  if(e.target.innerText === '='){  // =
      if(expression.includes('=')) return;  // first input after '='
      let answer;
      if(expression[expression.length - 1] === ')')  answer = String(eval(expression));
      else  answer = String(eval(expression + number));
      if(answer.length > 22 && answer.includes('0.000'))  answer = Number(answer).toExponential(15).toString();
      if(answer.length > 22)  answer = answer.slice(0,22);
      if(answer.includes("Infinity") || answer.includes("NaN")){
        if((expression + number).includes('/ 0'))  setNumber("錯誤: 不能除以0");
        else  setNumber("錯誤: 溢位");
      }
      else  setNumber(answer);
      if(expression[expression.length - 1] === ')')  setExpression(expression => expression + ' =');
      else  setExpression(expression => expression + number + ' =');
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
      else  if(e.target.innerText === '('){  // (
        if(expression.includes('='))  setExpression(e.target.innerText);
        else  setExpression(expression => expression + e.target.innerText);
      }
      else  if(e.target.innerText === ')'){  // )
        if(expression.includes('='))  return ;
        else{
          setExpression(expression => expression + number + e.target.innerText);
          setNumber('0');
        }
      }
      else  if(e.target.innerText === 'e' || e.target.innerText === "Pi"){  //constant
        if(expression.includes('=')){  // first input after '='
          setExpression('');
        }
        setNumber(String(eval(e.target.innerText.toUpperCase())));
      }
      else  if(operands.includes(e.target.innerText)){  // operands
        if(number.includes('錯誤'))  return;
        if(e.target.innerText === '+/-'){  // toggle +/-
          if(expression.includes('='))  setExpression('');
          setNumber(number => String(eval(number + '*(-1)')));
        }
        else  if(e.target.innerText === '%'){
          if(expression.includes('='))  setExpression('');
          const tmp = String(eval(number + '*0.01'));
          if(tmp.length > 22)  setNumber(tmp.slice(0, 22));
          else  setNumber(tmp);
        }
        else{  // pure + - * /
          if(expression[expression.length - 1] === ')'){
            if(e.target.innerText === '^')  setExpression(expression => expression + ' ** ');
            else  setExpression(expression => expression + ' ' + e.target.innerText + ' ');
          }
          else  if(e.target.innerText === '^'){
            if(expression.includes('='))  setExpression(number + ' ** ');  // first input after '='
            else  setExpression(expression => expression + number + ' ** ');
          }
          else  if(expression.includes('='))  setExpression(number + ' ' + e.target.innerText + ' ');  // first input after '='
          else  setExpression(expression => expression + number + ' ' + e.target.innerText + ' ');
          setNumber("0");
        }
      }
      else{  // sin
        if(e.target.innerText === 'mod'){
          if(expression.includes('='))  setExpression(number + ' % ');
          else  setExpression(expression => expression + number + ' % ');
          setNumber('0');
        }
        else{
          if(expression.includes('='))  setExpression(e.target.innerText + '(');
          else  setExpression(expression => expression + e.target.innerText + '(');
        }
      }
    }
  }

  return (
    <>
      <div className="calculator-container">
        <Augment />
        <Output number={number} expression={expression}></Output>
        <Keyboard changeExpression={changeExpression}></Keyboard>
      </div>
      {/*<Memory />*/}
    </>
  );
}