import HobbyArray from '../../hobbies.json';

function Home() {

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

export default Home;
