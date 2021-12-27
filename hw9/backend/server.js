import { GraphQLServer, PubSub } from "graphql-yoga";
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subsciption';
import Chatbox from './resolvers/Chatbox';
import Message from './resolvers/Message';

const pubsub = new PubSub();
const server = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers: { Query, Mutation, Subscription, Chatbox, Message },
    context: {db, pubsub},
})

server.start({ port: process.env.PORT || 5000 }, () => {
    console.log(`Server is up on port ${process.env.PORT || 5000}`);
})