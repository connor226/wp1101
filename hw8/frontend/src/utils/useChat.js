import {useState} from 'react'

const client = new WebSocket('ws://localhost:4000');
const sendData = async(data, client) => {
    await client.send(JSON.stringify(["input", data]));
}

const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const sendMessage = (payload) => {
        sendData(payload, client);
    }
    const clearMessages = () => {
        client.send(JSON.stringify(["clear"]));
    }

    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [ task, payload ] = JSON.parse(data);
        switch(task){
            case 'output': {
                setMessages(() => [...messages, ...payload]);
                break;
            }
            case 'status': {
                setStatus(payload);
                break;
            }
            case 'init': {
                setMessages(() => payload);
                break;
            }
            case 'cleared': {
                setMessages([]);
                break;
            }
            default: break;
        }
    }
    return {
        status,
        messages,
        sendMessage,
        clearMessages,
    }
}

export default useChat;