import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Navbar from './components/Navbar';
import HobbyArray from './pages/Home/hobbies.json';
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

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

  API.verifyToken(token)
  .then((response) => {
    setUserSession(response.data.token, response.data.user);
    setAuthLoading(false);
  })
  .catch((error) => {
    removeUserSession();
    setAuthLoading(false);
  });

}, []);

if (authLoading && getToken()) {
  return <div className="content">Checking Authentication...</div>
}

  const routeComponents = HobbyArray.map(item => {
    return(
      item.hobbies.map((hobby, index) => {
        return(
          <Route key={index} exact path={`/${hobby}`}>
            <HobbySub key={index} hobby={hobby}/>
          </Route>
        )
      })
    )
  })



  const newPostComponents = HobbyArray.map(item => {
    return(
      item.hobbies.map((hobby, index) => {
        return(
          <Route key={index} exact path={`/new_post/${hobby}`}>
            <NewPost key={index} hobby={hobby}/>
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
          <Route exact path="/signin">
            <SignIn />
          </Route>
        <div>
          <Navbar />
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/take-quiz">
            <TakeQuiz />
          </Route>
          {routeComponents}
          {newPostComponents}
        </div>
      </Switch>
    </Router>
  )
}

export default App;
