import axios from 'axios';
const instance = axios.create({ baseURL: 'http://localhost:4000/api'});

const getStatus = async() => {
    const {data} = await instance.get('/');
    return data;
}
const startGame = async() => {
    const {data} = await instance.post('/start');
    return data;
}
const putO = async(posX, posY) => {
    const {data} = await instance.post('/grid', {posX, posY});
    return data;
}

export {startGame, getStatus, putO};