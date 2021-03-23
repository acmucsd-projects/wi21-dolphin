import "./style.css";
import React, {useState} from 'react';
import { faHeart } from "@fortawesome/free-solid-svg-icons"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import API from '../../API';

// This should be an object stored in the database that has:
// 
function Post(props) {
    const [liked, setLiked] = useState(false);
    const user = "pagman";

    function toggle() { 
        let localLiked = liked;
        localLiked = !localLiked; 
        setLiked(localLiked);
        
        if (localLiked) {
            API.addLike(props.post.user_name, props.post.content, props.hobby, props.post.title, user);
        } else {
            API.removeLike(props.post.user_name, props.post.content, props.hobby, props.post.title, user);
        }

    }

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