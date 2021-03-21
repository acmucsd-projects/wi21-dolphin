import React from 'react';
import {Link} from "react-router-dom";
import './style.css';

function FrontPage() {
    return (
        <div className="front-component">
            <h1>
                Welcome to Hobby Inc!
            </h1>
            <p>
                To get started, login <Link to="/login">here</Link>
            </p>
        </div>
    )
}

export default FrontPage;