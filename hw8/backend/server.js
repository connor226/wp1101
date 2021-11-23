import WebSocket from "ws";
import http from 'http';
import express from 'express';
import dotenv from 'dotenv-defaults';
import mongoose from 'mongoose';

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
                }
            }
            await dbMessage.save();
        }
        sendData(['output', [payload]]);
        break;
    })
    const PORT = env.process.PORT || 4000;
    server.listen(PORT, () => {
        console.log(`app listening on port ${PORT}`);
    })
})