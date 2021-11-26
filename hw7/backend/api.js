import express from 'express';
import ScoreCard from "./model/ScoreCard.js";

const router = express.Router();

const create = async(name, subject, score) => {
    try{
        const newScoreCard = new ScoreCard({name, subject, score});
        newScoreCard.save();
    }
    catch(e){
        throw new Error('Error: ' + e);
    }
}

const update = async(name, subject, score) => {
    try{
        await ScoreCard.updateOne({name, subject}, {score});
    }
    catch(e){
        throw new Error('update error: ' + e);
    }
}

const query = async(type, queryString) => {
    if(type === 'name'){
        try{
            return await ScoreCard.find({name: queryString})
        }
        catch(e){
            throw new Error("query failed");
        }
    }
    else  if(type === 'subject'){
        try{
            return await ScoreCard.find({subject: queryString})
        }
        catch(e){
            throw new Error("query failed");
        }
    }
    else  throw new Error("queryType error");
}

const clear = async() => {
    try{
        await ScoreCard.deleteMany({});
        console.log('db cleared');
    }
    catch(e){
        throw new Error("db deletion failed QQ");
    }
}

router.get('/', (_, res) => {
    res.send('Hello, World!');
});
router.post('/create-card', async(req, res) => {
    const {name, subject, score} = req.body;
    try{
        const existing = await ScoreCard.findOne({name, subject});
        if(existing){
            update(name, subject, score);
            res.status(200).send({message: `Updating (${name}, ${subject}, ${score})`, card: true});
        }
        else{
            create(name, subject, score);
            res.status(200).send({message: `Adding (${name}, ${subject}, ${score})`, card: true});
        }
    }
    catch(e){
        res.status(500).send({message: "Add card error: " + e, card: false});
    }
})
router.get('/query-cards', async(req, res) => {
    const {type, queryString} = req.query;
    const result = await query(type, queryString);
    if(!result.length)  res.status(200).send({messages: null, message: `${type} (${queryString}) not founded!`});
    else{
        let messages = [];
        result.forEach(({name, subject, score}) => {
            messages.push(`${name} ${subject} ${score}`);
        })
        res.status(200).send({messages, message: "Query succeed"});
    }

})
router.delete('/clear-db', (_, res) => {
    try{
        clear();
        res.status(200).send({message: "Database cleared"});
    }
    catch(e){
        res.status(500).send("Deletion encountered error: " + e);
    }
})

export default router;