import {Link} from "react-router-dom";
import "./style.css";

function Navbar() {
  // if logged in, show profile in navbar. otherwise, show login
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <p className="navbar-component">
            <Link className="link" to="/home" >Hobbies Inc.</Link>
        </p>
      </div>
      <div className="navbar-right">
        <p className="navbar-component">
            <Link className="link" to="/take-quiz" >Take Quiz</Link>
        </p>
        <p className="navbar-component">
            <Link className="link" to="/profile" >Profile</Link>
        </p>
      </div>
    </nav>
  )
}

export default Navbar;
