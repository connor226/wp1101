import { useState  } from 'react';

const useChatbox = () => {
    const [ chatboxes, setChatboxes ] = useState(['Ann']);
    const addChatbox = (friend) => {
        setChatboxes([ ...chatboxes, friend ])
    }
    const removeChatbox = (targetKey, activateKey) => {

    }
    return { chatboxes, addChatbox, removeChatbox };
}

export default useChatbox;