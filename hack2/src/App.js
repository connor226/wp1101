import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import {initNum, incNum} from './api'
import Button from '@material-ui/core/Button'

function App() {
  const [num, setNum] = useState(0);

  const add1 = async() => {
    const {num} = await incNum(17);
    setNum(num);
  }

  const minus1 = async() => {
    const {num} = await incNum(-100);
    setNum(num);
  }
  
  useEffect(() => {
    const init = async() => {
      const {num} = await initNum();
      setNum(num);
    }
    init()
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <Button onClick={minus1} color="primary">-</Button>
          <h2>{num}</h2>
          <Button onClick={add1} color="primary">+</Button>
        </div>
      </header>
    </div>
  );
}

export default App;
