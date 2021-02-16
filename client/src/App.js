import logo from './logo.svg';
import './App.css';
import HobbyArray from './hobbies.json';

function App() {

  return (
    <div >
      {HobbyArray.map((item, index) => {
        return (
          <div>
            <h1 key={index}>{item.name}</h1>
            {item.hobbies.map(hobby => <li>{hobby}</li>)}
          </div>
        )
      }
      )}
    </div>
  )
}

export default App;
