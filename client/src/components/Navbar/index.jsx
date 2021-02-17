import {Link} from "react-router-dom";
import "./style.css";

function Navbar() {

  return (
    <nav className="navbar">
        <p className="navbar-component">
            <Link to="/">Hobbies Inc.</Link>
        </p>
        <p className="navbar-component">
            <Link to="/take-quiz">Take Quiz</Link>
        </p>
        <p className="navbar-component">
            <Link to="/profile">Profile</Link>
        </p>
    </nav>
  )
}

export default Navbar;
