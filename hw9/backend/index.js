import { GraphQLServer, PubSub } from "graphql-yoga";
import db from './db'
import Query from './resolvers/Query'

const pubsub = new PubSub();
