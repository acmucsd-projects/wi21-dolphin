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

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        {routeComponents}
      </Switch>
    </Router>
  )
}

export default App;
