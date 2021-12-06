import axios from 'axios';

const instance = axios.create({baseURL: 'http://localhost:5000/api'})

const initNum = async() => {
    const {data} = await instance.get('/');
    return data;
}

const incNum = async(val) => {
    const {data} = await instance.get('/add', {params: {val}});
    return data;
}

export {initNum, incNum};