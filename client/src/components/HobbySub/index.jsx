import {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Post from "../Post";
import './style.css';

function HobbySub(props) {
    // an array of posts
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // pull post data from database

        setPosts([])
    }, [])

    return(
        <div className="hobby-sub">
            <h1>{props.hobby}</h1>
            <Link to={`/new_post/${props.hobby}`}>
                <button className="new-post-button">Create New Post</button>
            </Link>
            <div>
                {posts.map(post => {
                    <Post post={post}/>
                })}
            </div>
        </div>
    )
}

export default HobbySub