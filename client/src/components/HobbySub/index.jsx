//import {useState, useEffect} from 'react';
import {
    Link
} from "react-router-dom";
import './style.css';

function HobbySub(props) {
    return(
        <div className="hobby-sub">
            <h1>{props.hobby}</h1>
            <Link to={`/new_post/${props.hobby}`}>
                <button className="new-post-button">Create New Post</button>
            </Link>
        </div>
    )
}

export default HobbySub