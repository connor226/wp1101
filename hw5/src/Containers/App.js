import React, {useState} from 'react'
import Output from '../Components/output'
import Keyboard from '../Components/keyboard'
import Memory from '../Components/memory'

const digits = '0123456789';
const operands = '+/-*%^';
const sqrt = (num) => Math.sqrt(num);
const sin = (num) => Math.sin(num);
const cos = (num) => Math.cos(num);
const tan = (num) => Math.tan(num);
const sinh = (num) => Math.sinh(num);
const cosh = (num) => Math.cosh(num);
const tanh = (num) => Math.tanh(num);
const asin = (num) => Math.asin(num);
const acos = (num) => Math.acos(num);
const atan = (num) => Math.atan(num);
const asinh = (num) => Math.asinh(num);
const acosh = (num) => Math.acosh(num);
const atanh = (num) => Math.atanh(num);
const log2 = (num) => Math.log2(num);
const log10 = (num) => Math.log10(num);
const ln = (num) => Math.log(num);
const PI = Math.PI;
const E = Math.E;
let key = 0;

export default function App() {
  const [number, setNumber] = useState("0");
  const [expression, setExpression] = useState("");
  const [register, setRegister] = useState([{expression:'none', number: '0', key: 0}]);
  const [currentpos, setCurrentpos] = useState(0);

  const changeExpression = (e) =>{
    if(e.target.innerText === 'AC'){  // all clear
      setNumber('0');
      setExpression('');
    }
    else  if(!e.target.innerText){  // backspace
      if(number.length === 1)  setNumber('0');  // no more digits to remove
      else  if(number.includes('e') || number.includes('錯誤'))  setNumber('0');
      else  if(number.length === 2 && number.includes('-'))  setNumber('0');
      else  setNumber(number => number.slice(0, number.length-1));
    }  
    else  if(e.target.innerText === '='){  // =
      if(expression.includes('=')) return;  // first input after '='
      let answer;
      try{
        if(expression[expression.length - 1] === ')')  answer = String(eval(expression));
        else  answer = String(eval(expression + number));
        if(answer.length > 22 && answer.includes('0.000'))  answer = Number(answer).toExponential(15).toString();
        if(answer.length > 22)  answer = answer.slice(0,22);
        if(answer.includes("Infinity")){
          if((expression + number).includes('/ 0'))  setNumber("錯誤: 不能除以0");
          else  setNumber("錯誤: 溢位");
        }
        else  if(answer.includes("NaN")){
          setNumber("錯誤: 非實數");
        }
        else  setNumber(answer);
      }
      catch(err){
        setNumber("錯誤: 括號未匹配");
      }
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
        else  if(expression && expression[expression.length - 1] === ')')  setExpression(expression => expression + e.target.innerText);
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

  const handlePosForward = () => {
    setCurrentpos(currentpos => currentpos + 1);
  }

  const handlePosBack = () => {
    setCurrentpos(currentpos => currentpos - 1);
  }

  const handleMemSave = () => {
    if(number.includes('錯誤'))  return ;
    let newReg = {key: ++key};
    if(expression.includes('='))  newReg.expression = expression;
    else  newReg.expression = '沒有算式';
    newReg.number = number;
    const deepCopyReg = JSON.parse(JSON.stringify(register));
    deepCopyReg.push(newReg);
    setRegister(deepCopyReg);
    setCurrentpos(currentpos => currentpos + 1);
  }

  const handleMemRead = () => {
    setNumber(register[currentpos].number);
    if(expression.includes('='))  setExpression('');
  }

  const handleMemClear = () => {
    const target = register[currentpos];
    const deepCopyReg = JSON.parse(JSON.stringify(register));
    setRegister(deepCopyReg.filter(reg => {return reg.key !== target.key}));
    if(currentpos >= deepCopyReg.length - 1)  setCurrentpos(currentpos => currentpos - 1);
  }

  return (
    <>
      <div className="calculator-container">
        <Output number={number} expression={expression}></Output>
        <Keyboard changeExpression={changeExpression}></Keyboard>
      </div>
      <Memory register={register} currentpos={currentpos} number={number} handleMemSave={handleMemSave} handleMemRead={handleMemRead} handlePosForward={handlePosForward} handlePosBack={handlePosBack} handleMemClear={handleMemClear}/>
    </>
  );
}