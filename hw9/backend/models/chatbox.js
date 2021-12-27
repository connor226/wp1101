import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ChatboxSchema = new Schema({
    name: { type: String, required: true },
    messages: [{ type: mongoose.Types.ObjectId, ref: "Message" }]
})

const Chatbox = mongoose.model('Chatbox', ChatboxSchema);
export default Chatbox;