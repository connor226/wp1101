const Query = {
    async chatboxs(parent, {name}, {db}, info) {
        const Chatrooms = await db.Chatbox.find();
        if(!name)  return Chatrooms;
        return Chatrooms.filter(chatbox => {
            return (chatbox.name === name);
        })
    },
}

export default Query;