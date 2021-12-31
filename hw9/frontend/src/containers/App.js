import { useEffect, useState } from 'react';
import './App.css';
import "antd/dist/antd.css";
import Chatroom from './chatroom';
import SignIn from './signin';

const LOCAL_STORAGE_KEY = "Easter-Eggg";

function App() {
  const savedMe = localStorage.getItem(LOCAL_STORAGE_KEY);
  const [ signedIn, setSignedIn ] = useState(false);
  const [ me, setMe ] = useState(savedMe || '');

  useEffect(() => {
    if(signedIn)  localStorage.setItem(LOCAL_STORAGE_KEY, me);
  }, [signedIn, me]);

  return (signedIn ? 
    <Chatroom username={ me }/> : 
    <SignIn username={ me } setName={ setMe } setSignedIn={ setSignedIn }/>
  )
}

export default App
