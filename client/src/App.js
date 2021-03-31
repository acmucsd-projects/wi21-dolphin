import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Navbar from './components/Navbar';
//import HobbyArray from './pages/Home/hobbies.json';
import HobbySub from './components/HobbySub';
import Profile from './pages/Profile';
import TakeQuiz from './pages/Take-quiz';
import NewPost from './components/NewPost';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import FrontPage from './pages/FrontPage';
import PublicRoute from './utils/PublicRoute';

import { getToken, removeUserSession, setUserSession } from './utils/Common'
import { useEffect, useState } from 'react';
import API from './API';

function App() {

  const [authLoading, setAuthLoading] = useState(true);
  const [username, setUsername] = useState("Sumadhwa13");
  const [categories, setCategories] = useState([]);

  useEffect(() => {

    console.log("The useEffect in App.js is running");
    const token = getToken();
    if (!token) {
      return;
    }

    API.verifyToken(token)
    .then((response) => {
      setUserSession(response.data.token, response.data.user);
      setUsername(response.data.user.username);
      setAuthLoading(false);

      console.log("useEffect then")
    })
    .catch((error) => {
      removeUserSession();
      setAuthLoading(false);

      console.log("useEffect catch")
    });

  }, [getToken]);
  
  useEffect(() => {
    API.getAllCategories().then((response) => {
      setCategories(response.data.categories);
    })
    .catch(err => {
      console.log(err);
      if (err.response) {
          console.log("Client received an error response");
      } else if (err.request) {
          console.log("Client never received a response, or request never left");
      } else {
          console.log("Something else went wrong");
      }
    })
  }, []);

if (authLoading && getToken()) {
  return <div className="content">Checking Authentication...</div>
}

  const routeComponents = categories.map((item) => {
    return(
      item.hobbies.map((hobby, index) => {
        return(
          <Route key={index} exact path={`/${hobby.name}`}>
            <HobbySub key={index} hobby={hobby.name} username={username} description={hobby.description}/>
          </Route>
        )
      })
    )
  })



  const newPostComponents = categories.map((item) => {
    return(
      item.hobbies.map((hobby, index) => {
        return(
          <Route key={index} exact path={`/new_post/${hobby.name}`}>
            <NewPost key={index} hobby={hobby.name} username={username}/>
          </Route>
        )
      })
    )
  })

  return (
    <Router>
      <Switch>
          <Route exact path="/">
            <FrontPage />
          </Route>
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute exact path="/signin" component={SignIn} />
        <div>
          <Navbar />
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/profile">
            <Profile username={username}/>
          </Route>
          <Route exact path="/take-quiz">
            <TakeQuiz username={username}/>
          </Route>
          {routeComponents}
          {newPostComponents}
        </div>
      </Switch>
    </Router>
  )
}

export default App;
