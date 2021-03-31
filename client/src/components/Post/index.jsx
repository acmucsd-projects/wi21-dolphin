import "./style.css";
import React, {useState, useEffect} from 'react';
import { faHeart } from "@fortawesome/free-solid-svg-icons"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import API from '../../API';

// This should be an object stored in the database that has:
// 
function Post(props) {

    const username = props.username;

    console.log("Username: " + username);

    const [userId, setUserId] = useState(null);
    const [liked, setLiked] = useState(false);
    const [numLikes, setNumLikes] = useState(props.post.likes.length);
    
    
    useEffect(() => {

        console.log("The useEffect in Profile is running")

        API.getUser(username)
        .then((response) => {
            console.log(response.data.user);
            const id = response.data.user._id;
            console.log(id);
            setUserId(id);
        })
        .catch(err => {
            if (err.response) {
                console.log("Client received an error response");
            } else if (err.request) {
                console.log("Client never received a response, or request never left");
            } else {
                console.log("Something else went wrong");
            }
        })

        console.log(userId + "");
        
    }, []);

    useEffect(() => {
        let alreadyLiked = false;
        
        for (let i = 0; i < props.post.likes.length; i++) {
            const compare = props.post.likes[i].toString();
            console.log(compare);
            if (compare === userId) {
                alreadyLiked = true;
                break;
            }
        }
        
        console.log(alreadyLiked);

        setLiked(alreadyLiked);

    }, [userId]);
    

    function toggle() { 
        let localLiked = liked;
        localLiked = !localLiked; 
        setLiked(localLiked);
        let currLiked = numLikes;
        
        if (localLiked) {
            API.addLike(props.post.user_name, props.post.content, props.hobby, props.post.title, username);
            setNumLikes(currLiked+1);
        } else {
            API.removeLike(props.post.user_name, props.post.content, props.hobby, props.post.title, username);
            setNumLikes(currLiked-1);
        }
    }

    function deletePost() {
        if (username !== props.post.user_name) {
            alert("You cannot delete another person's post!");
            return;
        }

        API.deletePost(username, props.post.content, props.hobby)
        .then((response) => {
            console.log("Successfully deleted post!");
        })
        .catch(err => {
            if (err.response) {
                console.log("Client received an error response");
            } else if (err.request) {
                console.log("Client never received a response, or request never left");
            } else {
                console.log("Something else went wrong");
            }
        })

        window.location.reload();
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

            <div className="delete-component">
                <button type="button" onClick={deletePost}>Delete Post</button>
            </div>
            </div>
            
            <div className="post-component">
                <p>Posted by {props.post.user_name} in {props.hobby}</p>
                <h2>{props.post.title}</h2>
                <p>{props.post.content}</p>
            </div>
        </div>
    )
}

export default Post;