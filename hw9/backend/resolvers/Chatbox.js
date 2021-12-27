const Chatbox = {
    messages(parent, args, {db}, info) {
        return Promise.all(
            parent.messages.map(mId => db.Message.findById(mId))
        )
    }
}
export default Chatbox;