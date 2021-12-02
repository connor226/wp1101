import {WebSocketServer} from "ws";
import http from 'http';
import express  from 'express';
import dotenv from 'dotenv-defaults';
import mongoose from 'mongoose';
import { sendData, sendStatus } from "./wssConnect.js";
import Message from "./models/message.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({server});
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true
})
.then(() => console.log("Mongodb connected!"))

const db = mongoose.connection;
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
        }
    })
    const PORT = process.env.PORT || 4000;
    server.listen(PORT, () => {
        console.log(`app listening on port ${PORT}`);
    })
})