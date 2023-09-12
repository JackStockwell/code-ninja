import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {createUploadLink} from "apollo-upload-client";

import {JobProvider} from "./utils/GlobalState";


import {library} from "@fortawesome/fontawesome-svg-core";
import {
  faHouse,
  faHeart,
  faCircleUser,
  faBars,
  faFile,
  faEnvelope,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import {faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";


library.add(faHouse, faHeart, faCircleUser, faBars, faFile, faEnvelope, faX, faGithub, faLinkedin)


// Components and Page imports
import Homepage from './pages/Homepage'; 
import LoginPage from './pages/Loginpage'; 


import CategoryMenu from "./components/CategoryMenu";
import Dev from "./pages/dev";


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
            <Route path="/" element={<Homepage />} />
            <Route path="/dev" element={<Dev />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/category" element={<CategoryMenu />} /> {/* Add this line */}
          </Routes>
        </JobProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
