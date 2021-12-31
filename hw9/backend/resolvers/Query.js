const Query = {
    async chatboxs(parent, {name}, {db}, info) {
        if(!name)  return null;
        const Chatroom = await db.Chatbox.findOne({name});
        return Chatroom;
    },
}

export default Query;