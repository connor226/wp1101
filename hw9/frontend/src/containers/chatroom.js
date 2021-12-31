import { Button, Input, Tabs } from 'antd';
import { useMutation } from '@apollo/client';
import { SearchOutlined } from '@ant-design/icons'
import {React, useState} from 'react';
import { CREATE_MESSAGE_MUTATION } from '../graphql';
import Chatbox from './chatbox';
import displayStatus from '../hooks/displayStatus';
import useChatbox from '../hooks/useChatbox';

const shorter = (name) => {
  if(name.length > 10){
    name = name.substr(0, 7) + '...';
  }
  return name;
}

export default function Chatroom({ username }){
  const [ body, setBody ] = useState('');
  const [ activateKey, setActivateKey ] = useState();
  const [ newFriend, setNewFriend ] = useState("");
  const { chatboxes, addChatbox, removeChatbox } = useChatbox();
  const [ sendMessage ] = useMutation(CREATE_MESSAGE_MUTATION);

  return (
    <div className="App">
      <div className="App-title">
        <h1>{ username }'s Chat</h1>
        {/*}
        <Button type="primary" danger>
          Clear
        </Button>
        */}
      </div>
      <Input.Search
        value={newFriend}
        prefix={<SearchOutlined />}
        enterButton="Add"
        onChange={(e) => setNewFriend(e.target.value)}
        placeholder="Finding a new friend?"
        onSearch={async() => {
          if(!newFriend){
            displayStatus({ type: "error", msg: "Please enter a friend name." });
            return ;
          }
          setActivateKey(await addChatbox(username, newFriend));
          setNewFriend('');
        }}
      />
      <Tabs
        tabBarStyle={{height: "36px"}}
        style={{width: "100%"}}
        type="editable-card"
        activeKey={activateKey}
        onChange={(key) => {
          setActivateKey(key);
        }}
        onEdit={(targetKey, action) => {
          if(action === 'remove'){
            setActivateKey(removeChatbox(targetKey, activateKey));
          }
        }}
        hideAdd
      >{
        chatboxes.map((friend) => {
          return(
            <Tabs.TabPane tab={ shorter(friend) } closable key={friend}>
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
          if(!msg){
            displayStatus({ type: "error", msg: "Please enter a message body." });
            return ;
          }
          sendMessage({variables: {
            sender: username,
            to: activateKey,
            body: body,
          }})
          setBody('');
        }}
      />
    </div>
  )
}