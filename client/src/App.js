import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {createUploadLink} from "apollo-upload-client";

import {JobProvider} from "./utils/GlobalState";

// Components and Page imports
import Home from "./pages/Home";
import LoginForm from "./components/LoginForm";
import SignUp from "./pages/SignUp";
import Dev from "./pages/Dev";
import Footer from "./components/Footer";
import JobSearch from "./pages/JobSearch";
import Header from "./components/Header/Header";
import UserProfile from "./pages/UserProfile";
import EmpProfile from "./pages/EmpProfile";
import EmployerLanding from "./pages/EmployerLanding";
import Lost from "./pages/404";
import BlogPost1 from "./pages/BlogPost1";
import BlogPost2 from "./pages/BlogPost2";
import BlogPost3 from "./pages/BlogPost3";
import BlogPost4 from "./pages/BlogPost4";

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
  faChevronRight,
  faCircleInfo,
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
  faChevronRight,
  faCircleInfo
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
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="user/myprofile" element={<UserProfile />} />
            <Route path="/cmp/myprofile" element={<EmpProfile />} />
            <Route path="/dev" element={<Dev />} />
            <Route path="/employer" element={<EmployerLanding />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/search" element={<JobSearch />} />
            <Route path="*" element={<Lost />} />
            <Route path="/blog/post-1" element={<BlogPost1 />} />
            <Route path="/blog/post-2" element={<BlogPost2 />} />
            <Route path="/blog/post-3" element={<BlogPost3 />} />
            <Route path="/blog/post-4" element={<BlogPost4 />} />
          </Routes>
          <Footer />
        </JobProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
