import './App.css'
import { Button, Input, Tag, message } from 'antd'
import {React, useEffect, useRef, useState} from 'react'
import useChat from './hooks/useChat'

function App() {
  const { status, messages, sendMessage, clearMessages } = useChat();
  const [ username, setUsername ] = useState('');
  const [ body, setBody ] = useState('');
  const bodyRef = useRef(null);

  const displayStatus = (payload) => {
    if(payload.msg){
      const {type, msg} = payload;
      const content = {content: msg, duration: 0.5};
      switch(type){
        case 'success':{
          message.success(content);
          break;
        }
        case 'info':{
          message.info(content);
          break;
        }
        case 'error':{
          message.error(content);
          break;
        }
        default: break;
      }
    }
  }

  useEffect(() => {
    displayStatus(status);
  }, [status]);

  return (
    <div className="App">
      <div className="App-title">
        <h1>Simple Chat</h1>
        <Button type="primary" danger onClick={ clearMessages }>
          Clear
        </Button>
      </div>
      <div className="App-messages">
        {messages.length === 0 ? (
          <p style={{ color: '#ccc' }}>
            No messages...
          </p>) : (messages.map(({name, body}, i) => {
            return (
            <p className="App-message" key={i}>
              <Tag color="blue">{ name }</Tag>
              { body }
            </p>)
          })
        )}
        
      </div>
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={(e) => {
          if(e.key === 'Enter'){
            bodyRef.current.focus();
          }
        }}
        style={{ marginBottom: 10 }}
      ></Input>
      <Input.Search
      value={body}
        enterButton="Send"
        onChange={(e) => setBody(e.target.value)}
        placeholder="Type a message here..."
        ref={ bodyRef }
        onSearch={(msg) => {
          if(!msg || !username){
            displayStatus({ type: "error", msg: "Please enter a username and a message body." });
            return ;
          }
          sendMessage({name: username, body: body});
          setBody('');
        }}
      ></Input.Search>
    </div>
  )
}

export default App
