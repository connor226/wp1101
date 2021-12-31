import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import ReactDOM from 'react-dom';
import App from './containers/App';

const httpLink = new HttpLink({
    uri: "http://localhost:5000/",
});

const wsLink = new WebSocketLink({
    uri: "ws://localhost:5000/",
})

const link = split(({ query }) => {
    const defintion = getMainDefinition(query);
    return (
        defintion.kind === 'OperationDefinition' && defintion.operation === 'subscription'
    )},
    wsLink,
    httpLink,
)

const client = new ApolloClient({
    link,
    cache: new InMemoryCache().restore({})
})

ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('root')
  )