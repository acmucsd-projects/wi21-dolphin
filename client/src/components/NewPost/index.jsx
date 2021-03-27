import './style.css';
import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import API from '../../API';

function NewPost(props) {
  const nameEl = React.useRef(null);
  const [title, setTitle] = useState("");
  const username = props.username;
  let history = useHistory();

  function HandleSubmit(e) {
    // send post to backend to process
    if (title === "") {
      alert("Title cannot be empty");
      e.target.reset();
    }
    else {
      API.postPost(username, nameEl.current.value, props.hobby, title).then((response) => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
        if (err.response) {
            console.log("Client received an error response");
        } else if (err.request) {
            console.log("Client never received a response, or request never left");
        } else {
            console.log("Something else went wrong")
        }
      })
      history.push(`/${props.hobby}`);
    }
  }

  return (
    <div className="post-component1">
      <div className="post-component2">
        <h1 className="title">New Post in {props.hobby}: </h1>
        <form className="post" onSubmit={HandleSubmit}>
          <input className="post-title" type="text" name="title" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}/>
          <br />
          <textarea className="post-body" type="text" name="body" placeholder="Text" ref={nameEl} />
          <br />
          <input className="submit" type="submit" value="Post" />
        </form>
      </div>
    </div>
  );
}

export default NewPost;