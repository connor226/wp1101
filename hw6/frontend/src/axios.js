import axios from 'axios';
const instance = axios.create({ baseURL: 'http://localhost:4000/api'});
const startGame = async() =>{
    const {data: {msg}} = await instance.post('/start');
    return msg;
}

export {startGame};