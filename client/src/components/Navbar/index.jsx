import {Link} from "react-router-dom";
import "./style.css";

function Navbar() {

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <p className="navbar-component">
            <Link className="link" to="/" style={{ textDecoration: 'none', color: "#111111" }}>Hobbies Inc.</Link>
        </p>
      </div>
      <div className="navbar-right">
        <p className="navbar-component">
            <Link className="link" to="/take-quiz" style={{ textDecoration: 'none', color: "#111111" }}>Take Quiz</Link>
        </p>
        <p className="navbar-component">
            <Link className="link" to="/profile" style={{ textDecoration: 'none', color: "#111111" }}>Profile</Link>
        </p>
      </div>
    </nav>
  )
}

export default Navbar;
