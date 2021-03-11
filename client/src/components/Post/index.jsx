import "./style.css";
import React, {useState} from 'react';
import { faHeart } from "@fortawesome/free-solid-svg-icons"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
                <div onClick={toggle}> 
                    {liked === false ? ( 
                        <FontAwesomeIcon icon={faHeart} size="2x" color="white"/> 
                    ) : ( 
                        <FontAwesomeIcon icon={faHeart} size="2x" color="red"/> 
                    )} 
                </div>    
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