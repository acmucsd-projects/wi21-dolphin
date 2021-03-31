import {useState, useEffect, useReducer} from 'react';
import { Link } from "react-router-dom";
import Post from "../Post";
import API from '../../API';
import './style.css';

function HobbySub(props) {
    // an array of posts
    const [posts, setPosts] = useState([]);
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const handleRerender = () => { // the callback. Use a better name
        console.log("rerendering");
        forceUpdate();
    };

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
    }, [props.hobby]);

    console.log(posts);

    return(
        <div className="hobby-sub">
            <div className="hobby-sub-header">
                <div className="left-component">
                    <h1 className="hobby-sub-title">{props.hobby}</h1>
                </div>
                <div className="right-component">
                    <Link to={`/new_post/${props.hobby}`}>
                        <button className="new-post-button">Create New Post</button>
                    </Link>
                </div>
            </div>
            <div className="description">
                <h2 className="hobby-description">{props.description}</h2>
            </div>
            <div>
                <div className="hobby-sub-posts">
                    {posts.map((post, key) => {
                        return (
                            <Post post={post} key={`post-${key}`} hobby={props.hobby} username={props.username} handleRerender={handleRerender}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default HobbySub