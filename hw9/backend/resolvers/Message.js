const Message = {
    sender(parent, args, {db}, info) {
        return db.User.findById(parent.sender)
    }
}
export default Message;