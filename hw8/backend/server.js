const WebSocket = require("ws");
const http = require('http');
const express = require('express');
const dotenv = require('dotenv-defaults');
const mongoose = require('mongoose');
import { sendData, sendStatus } from "./wssConnect";
import Message from "./models/message";

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});
const db = mongoose.connection
db.once('open', () => {
    wss.on('connection', (ws) => {
        ws.onmessage = async(byteString) => {
            const {data} = byteString;
            const [task, payload] = JSON.parse(data);
            switch(task){
                case 'input':{
                    const {name, body} = payload;
                    const message = new Message({name, body});
                    try{
                        await message.save();
                    }
                    catch(e){
                        throw new Error("Message DB Save error: " + e);
                    }
                    sendData(['output', [payload]], ws);
                    sendStatus({
                        type: 'success',
                        msg: 'Message sent'
                    }, ws);
                    break;
                }
                default: break
            }
            await dbMessage.save();
        }
    })
    const PORT = env.process.PORT || 4000;
    server.listen(PORT, () => {
        console.log(`app listening on port ${PORT}`);
    })
})