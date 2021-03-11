import {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Post from "../Post";
import API from '../../API';
import './style.css';

function HobbySub(props) {
    // an array of posts
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        
        API.getPostsHobby(props.hobby).then((response) => {
            console.log(response);
            setPosts(response.data.posts);
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
    }, []);

    console.log(posts);

    return(
        <div className="hobby-sub">
            <h1>{props.hobby}</h1>
            <Link to={`/new_post/${props.hobby}`}>
                <button className="new-post-button">Create New Post</button>
            </Link>
            <div>
                {posts.map((post, key) => {
                    return (
                        <Post post={post} key={`post-${key}`}/>
                    )
                })}
            </div>
        </div>
    )
}

export default HobbySub