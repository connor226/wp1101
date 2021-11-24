import './App.css'
import { Button, Input, Tag, message } from 'antd'
import {React, useState} from 'react'
import useChat from './useChat'

function App() {
  const { status, messages, sendMessage } = useChat();
  const [username, setUsername] = useState('');
  const [body, setBody] = useState('');
  const displayStatus = (payload) => {
    if(payload.msg){
      const {type, msg} = payload;
      const content = {content: msg, duration: 0.5};
      switch(type){
        case 'success':{
          message.success(content);
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
  return (
    <div className="App">
      <div className="App-title">
        <h1>Simple Chat</h1>
        <Button type="primary" danger >
          Clear
        </Button>
      </div>
      <div className="App-messages">
        {messages.length === 0 ? (
          <p style={{ color: '#ccc' }}>
            No messages...
          </p>) : (messages.map(({name, body}, i) => {
            <p className="App-message" key={i}>
              <Tag color="blue">{name}</Tag>
            </p>
          })
        )}
        
      </div>
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: 10 }}
      ></Input>
      <Input.Search
      value={body}
        enterButton="Send"
        onChange={(e) => setBody(e.target.value)}
        placeholder="Type a message here..."
        onSearch={(msg) => {
          sendMessage({name: username, body: body});
          setBody('');
        }}
      ></Input.Search>
    </div>
  )
}

export default App
