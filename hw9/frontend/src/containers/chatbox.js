import { Tag } from 'antd';
import { useQuery } from '@apollo/client';
import { CHATBOX_QUERY, CHATBOX_SUBSCRIPTION } from '../graphql';
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
      subscribeToMore({
        document: CHATBOX_SUBSCRIPTION,
        variables: {cName: makeName(username, friend)},
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          return {chatboxs : {messages: [...prev.chatboxs.messages, subscriptionData.data.chatbox]}};
        },
      });
    }, [subscribeToMore]);
    
    useEffect(() => {
      if (!data) return;
      setMessages(data.chatboxs.messages);
    }, [data]);
  
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