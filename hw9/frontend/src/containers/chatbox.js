import { Tag } from 'antd';
import { useQuery } from '@apollo/client';
import { CHATBOX_QUERY } from '../graphql';
import { useState, useEffect } from 'react';

const makeName = (username, friend) => {
  if(username < friend)  return `${username}-${friend}`;
  else  return `${friend}-${username}`;
}

export default function Chatbox({ username, friend }){
    const [messages, setMessages] = useState([]);
    const { data, subscribeToMore } = useQuery(CHATBOX_QUERY, {
        variables: {
            name: makeName(username, friend),
        }
    })
    useEffect(() => {
      if (!data) return;
      setMessages(data.chatboxs.messages);
    }, [data]);
  
    console.log(data)
    return (
        <div className="App-messages">
          {messages.length === 0 ? (
          <p style={{ color: '#ccc' }}>
            No messages...
          </p>) : (messages.map(({sender: {name}, body}, i) => {
            return (name === username ? 
              <p className="App-message my-message" key={i}>
                { body }
                <Tag color="blue" style={{marginLeft: "8px"}}>{ name }</Tag>
              </p> : 
              <p className="App-message" key={i}>
                <Tag>{ name }</Tag>
                { body }
              </p>
            )
          })
        )}
      </div>
    )
}