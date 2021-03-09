import './style.css';
import React, {useState} from 'react';

function NewPost(props) {
  const nameEl = React.useRef(null);
  const [title, setTitle] = useState("");

  const handleSubmit = e => {
    // send post to backend to process
  }

  return (
    <div className="post-component1">
      <div className="post-component2">
        <h1 className="title">New Post in {props.hobby}: </h1>
        <form className="post" onSubmit={handleSubmit}>
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