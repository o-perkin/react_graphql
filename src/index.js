import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import App from './App';
import 'antd/dist/antd.css';

const client = new ApolloClient({
  uri: 'https:' + '/' + '/' + 'api.github.com/graphql',
  headers: {
    authorization: process.env.REACT_APP_GITHUB_TOKEN
  }
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);