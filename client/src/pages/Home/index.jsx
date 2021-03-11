import HobbyArray from './hobbies.json';
import { Link } from 'react-router-dom';
import './style.css';

function Home() {

  return (
    <div className="home-component">
      {HobbyArray.map((item, index) => {
          return (
            <div>
                <h1 key={index}>{item.name}</h1>
                {item.hobbies.map(hobby => { 
                  return (
                    <li>
                      <Link to={`/${hobby}`} style={{ textDecoration: 'none', color: "#111111" }}>{hobby}</Link>
                    </li>
                  )
                })}
            </div>
          )
      })}
    </div>
  )
}

export default Home;
