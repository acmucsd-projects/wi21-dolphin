import "./style.css";
import React, {useState} from 'react';

// This should be an object stored in the database that has:
// 
function Post(props) {
    const [liked, setLiked] = useState(false);

    function toggle() { 
        let localLiked = liked; 
        localLiked = !localLiked; 
        setLiked(localLiked);
    };

    return (
        <div className="post-container">
            <div className="like-component">
                {liked === false ? ( 
                    <button className="like-button" onClick={toggle}>Like</button>
                ) : ( 
                    <button className="like-button" onClick={toggle}>Unlike</button>
                )}
                
            </div>
            <div className="post-component">
                <p>Posted by {props.post.user_name}</p>
                <h2>{props.post.title}</h2>
                <p>{props.post.content}</p>
            </div>
        </div>
    )
}

export default Post;