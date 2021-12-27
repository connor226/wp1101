import { checkUser, newUser, makeName, checkChatbox, newChatbox, newMessage, updateChatbox } from './utility';

const Mutation = {
    async createChatbox(parent, {name1, name2}, {db, pubsub}, info) {
        if(!name1 || !name2)  throw new Error("Missing chatbox name for createChatbox");
        if(!(await checkUser(db, name1, "creatChatbox"))) {
            console.log("User does not exist for CreateChatbox: " + name1);
            await newUser(db, name1);
        }
        if(!(await checkUser(db, name2, "creatChatbox"))) {
            console.log("User does not exist for CreateChatbox: " + name2);
            await newUser(db, name2);
        }
        let chatboxName = makeName(name1, name2);
        let chatbox = await checkChatbox(db, chatboxName, "createChatbox");
        if(!chatbox) {
            chatboxName = makeName(name2, name1);
            chatbox = await checkChatbox(db, chatboxName, "createChatbox");
            if(!chatbox)  chatbox = await newChatbox(db, chatboxName);
        }
        pubsub.publish(`chatbox ${chatboxName}`, {mutation: 'CREATED', chatbox})
        return chatbox;
    },
    async createMessage(parent, {sender, to, body}, {db, pubsub}, info) {
        const nMessage = await newMessage(db, sender, body, "createMessage");
        let chatboxName = makeName(sender, to);
        if(!(await checkChatbox(db, chatboxName, "createMessage")))  chatboxName = makeName(to, sender);
        const oldChatbox = await checkChatbox(db, chatboxName, "createMessage");
        const newChatbox = await updateChatbox(db, oldChatbox, nMessage, "createMessage");
        pubsub.publish(`chatbox ${chatboxName}`, {mutation: 'UPDATED', chatbox: newChatbox});
        return newChatbox;
    }
}

export default Mutation;