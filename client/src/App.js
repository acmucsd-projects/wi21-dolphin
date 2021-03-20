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

function App() {
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
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/take-quiz">
          <TakeQuiz />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        {routeComponents}
        {newPostComponents}
      </Switch>
    </Router>
  )
}

export default App;
