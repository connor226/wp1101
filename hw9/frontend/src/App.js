import { useEffect, useState } from 'react';
import './App.css';
import Chatroom from './components/chatroom';
import SignIn from './components/signin';
import useChat from './utils/useChat';
import displayStatus from './utils/displayStatus';

const LOCAL_STORAGE_KEY = "Easter-Eggg";

function App() {
  const savedMe = localStorage.getItem(LOCAL_STORAGE_KEY);
  const [ signedIn, setSignedIn ] = useState(false);
  const [ me, setMe ] = useState(savedMe || '');
  const { status, messages, sendMessage, clearMessages } = useChat();

  useEffect(() => {
    if(signedIn)  localStorage.setItem(LOCAL_STORAGE_KEY, me);
  }, [signedIn, me]);
  
  useEffect(() => {
    displayStatus(status);
  }, [status]);

  return (signedIn ? 
    <Chatroom username={ me } setName={ setMe } messages={ messages } sendMessage={ sendMessage } clearMessages={ clearMessages }/> : 
    <SignIn username={ me } setName={ setMe } setSignedIn={ setSignedIn }/>
  )
}

export default App
