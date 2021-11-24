import {useState} from 'react'

const client = new WebSocket('ws://localhost:4000');

const sendData = async(data, client) => {
    await client.send(["input", data]);
}

const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const sendMessage = (payload) => {
        // TODO
        sendData('input', [payload]);
    }
    client.onmessage = (byteString) => {
        const {data} = byteString;
        const {task, payload} = JSON.parse(data);
        switch(task){
            case 'output': {
                setMessages(() => [...messages, ...payload]);
                break;
            }
            case 'status': {
                setStatus(payload);
                break;
            }
            default: break;
        }
    }
    return {
        status,
        messages,
        sendMessage
    }
}

export default useChat;