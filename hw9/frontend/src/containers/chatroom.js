import { Button, Input, Tabs } from 'antd';
import {React, useState} from 'react';
import Chatbox from './chatbox';
import displayStatus from '../hooks/displayStatus';
import useChatbox from '../hooks/useChatbox';

export default function Chatroom({ username }){
  const [ body, setBody ] = useState('');
  const [ activateKey, setActivateKey ] = useState();
  const { chatboxes, addChatbox, removeChatbox } = useChatbox();

  return (
    <div className="App">
      <div className="App-title">
        <h1>{ username }'s Chat</h1>
        <Button type="primary" danger>
          Clear
        </Button>
      </div>
      <Tabs
        tabBarStyle={{height: "36px"}}
        style={{width: "100%"}}
        type="editable-card"
        activeKey={activateKey}
        onChange={(key) => {
          setActivateKey(key);
        }}
        onEdit={(targetKey, action) => {
          if(action === 'add'){
            setActivateKey(addChatbox());
          }
          else  if(action === 'remove'){
            setActivateKey(removeChatbox(targetKey, activateKey));
          }
        }}
      >{
        chatboxes.map((friend) => {
          return(
            <Tabs.TabPane tab={ friend } closable key={friend}>
              <Chatbox username={ username } friend={ friend } key={ friend } />
            </Tabs.TabPane>
          )
        })
      }</Tabs>
      <Input.Search
      value={body}
        enterButton="Send"
        onChange={(e) => setBody(e.target.value)}
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if(!msg || !username){
            displayStatus({ type: "error", msg: "Please enter a username and a message body." });
            return ;
          }
          setBody('');
        }}
      ></Input.Search>
    </div>
  )
}