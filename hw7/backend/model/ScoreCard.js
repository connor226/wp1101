import mongoose from 'mongoose';
const schema = mongoose.Schema;

const ScoreCardSchema = new schema({
    name: String,
    subject: String,
    score: Number
});
const ScoreCard = mongoose.model('ScoreCard', ScoreCardSchema);

export default ScoreCard;