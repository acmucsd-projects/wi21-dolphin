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
    const [numLikes, setNumLikes] = useState(props.post.likes.length);

    function toggle() { 
        let localLiked = liked;
        localLiked = !localLiked; 
        setLiked(localLiked);
        let currLiked = numLikes;
        
        if (localLiked) {
            API.addLike(props.post.user_name, props.post.content, props.hobby, props.post.title, user);
            setNumLikes(currLiked+1);
        } else {
            API.removeLike(props.post.user_name, props.post.content, props.hobby, props.post.title, user);
            setNumLikes(currLiked-1);
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
                    <p className="num-likes">{numLikes}</p>
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