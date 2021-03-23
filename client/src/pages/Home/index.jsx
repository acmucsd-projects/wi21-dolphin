import HobbyArray from './hobbies.json';
import { Link } from 'react-router-dom';
import './style.css';

function Home() {

  return (
    <div className="home-component">
      {HobbyArray.map((item, index) => {
          return (
            <div className="category-component">
              <div className="category-title">
                <h1 key={index}>{item.name}</h1>
              </div>
              <div className="hobby-list">
                {item.hobbies.map(hobby => { 
                  return (
                    <li>
                      <Link to={`/${hobby}`} style={{ textDecoration: 'none', color: "#111111" }}>{hobby}</Link>
                    </li>
                  )
                })}
              </div>
            </div>
          )
      })}
    </div>
  )
}

export default Home;
