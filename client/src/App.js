import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from "apollo-upload-client";
import { JobProvider } from './utils/GlobalState';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import CategoryMenu from './components/CategoryMenu/dev.index';
import Dev from './pages/dev';
import Homepage from './pages/Home'; 
import LoginPage from './pages/Login'; 

const httpLink = createUploadLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <JobProvider>
            <CategoryMenu />
          
            <Route exact path="/" component={Homepage} />
            <Route path="/dev" element={<Dev />} />
            <Route path="/login" component={LoginPage} />
           
          </JobProvider>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
