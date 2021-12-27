import User from '../models/user';
import Chatbox from '../models/chatbox';
import Message from '../models/message';
import db from '../db';

const checkUser = async(db, name, errFunc) => {
    if(!name)  throw new Error("Missing username for " + errFunc);
    return db.User.findOne({ name });
}

const newUser = async(db, name) => {
    return new db.User({ name }).save();
}

const makeName = (name1, name2) => {
    return `${ name1 }-${ name2 }`;
}

const checkChatbox = async(db, name, errFunc) => {
    if(!name)  throw new Error("Missing chatbox name for " + errFunc);
    return db.Chatbox.findOne({ name });
}

const newChatbox = async(db, name) => {
    return new db.Chatbox({ name, messages: [] }).save();
}

const newMessage = async(db, sender, body, errFunc) => {
    const sendUser = await checkUser(db, sender, errFunc);
    return new db.Message({
        sender: sendUser,
        body,
    }).save();
}

const updateChatbox = async(db, oChatbox, nMessage, errFunc) => {
    const newMessages = [...oChatbox.messages, nMessage];
    await db.Chatbox.updateOne({ id: oChatbox.id } , { messages: newMessages });
    return oChatbox;
}

export { checkUser, newUser, makeName, checkChatbox, newChatbox, newMessage, updateChatbox };