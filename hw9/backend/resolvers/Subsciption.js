const Subscription = {
    chatbox: {
        subscribe(parent, {cName}, {db, pubsub}, info) {
            const chatbox = db.Chatbox.findOne({ name: cName });
            if(!chatbox)  throw new Error("Chatbox not found");
            return pubsub.asyncIterator(`chatbox ${cName}`);
        }
    }
}

export default Subscription;