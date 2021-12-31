import { useMutation } from '@apollo/client';
import { useState  } from 'react';
import { CREATE_CHATBOX_MUTATION } from '../graphql';
import displayStatus from './displayStatus';

const useChatbox = () => {
    const [ chatboxes, setChatboxes ] = useState([]);
    const [ startChat ] = useMutation(CREATE_CHATBOX_MUTATION);
    const addChatbox = async(me, friend) => {
        friend = friend.trim();
        if(!chatboxes.includes(friend)){
            if(!friend){
                displayStatus({type:'error', msg: "friend name is empty!"})
                return ;
            }
            await startChat({variables: {
                name1: me,
                name2: friend,
            }});
            setChatboxes([...chatboxes, friend]);
        }
        return friend;
    }
    const removeChatbox = (targetKey, activateKey) => {
        const newChatboxes = [...chatboxes].filter(friend => {
            return friend !== targetKey
        });
        setChatboxes(newChatboxes)
        if(targetKey === activateKey){
            return newChatboxes[0];
        }
    }
    return { chatboxes, addChatbox, removeChatbox };
}

export default useChatbox;