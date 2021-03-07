//import {useState, useEffect} from 'react';
import {
    Link
} from "react-router-dom";

function HobbySub(props) {
    return(
        <div>
            <h1>{props.hobby}</h1>
            <Link to={`/new_post/${props.hobby}`}>
                <button>Create New Post</button>
            </Link>
        </div>
    )
}

export default HobbySub