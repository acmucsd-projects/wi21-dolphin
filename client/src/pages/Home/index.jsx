import HobbyArray from './hobbies.json';
import { Link } from 'react-router-dom';

function Home() {

  return (
    <div >
      {HobbyArray.map((item, index) => {
          return (
            <div>
                <h1 key={index}>{item.name}</h1>
                {item.hobbies.map(hobby => { 
                  return (
                    <li>
                      <Link to={`/${hobby}`}>{hobby}</Link>
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
