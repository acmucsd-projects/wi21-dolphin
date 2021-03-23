import HobbyArray from './hobbies.json';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import API from '../../API';

function Home() {

  const [categories, setCategories] = useState([]);
  //let [Hobby, setHobby] = useState(null);

  useEffect(() => {

    API.getAllCategories().then((response) => {
      setCategories(response.data.categories);
      console.log(categories);
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

  return (
    <div className="home-component">
      {categories.map((item, index) => {
          console.log(item.hobbies)
          return (
            <div>
                <h1 key={index}>{item.name}</h1>
                {item.hobbies.map(hobby => {
                  return (
                    <li>
                      <Link to={`/${hobby.name}`} style={{ textDecoration: 'none', color: "#111111" }}>{hobby.name}</Link>
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
