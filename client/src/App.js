import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {createUploadLink} from "apollo-upload-client";

import {JobProvider} from "./utils/GlobalState";

// Components and Page imports
import Home from './pages/Home'; 
import LoginPage from './pages/Login'; 
import SignUp from './pages/SignUp'
import Dev from "./pages/Dev";
import Footer from "./components/Footer";


import {library} from "@fortawesome/fontawesome-svg-core";
import {
  faHouse,
  faHeart,
  faCircleUser,
  faBars,
  faFile,
  faEnvelope,
  faX,
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import {faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";

library.add(
  faHouse,
  faHeart,
  faCircleUser,
  faBars,
  faFile,
  faEnvelope,
  faX,
  faGithub,
  faLinkedin,
  faChevronLeft,
  faChevronRight
);

const httpLink = createUploadLink({
  uri: "/graphql",
});

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
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
        <JobProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dev" element={<Dev />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/create" element={<SignUp />} /> 
          </Routes>
          <Footer />
        </JobProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
