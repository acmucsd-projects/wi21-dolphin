import "./style.css";

// This should be an object stored in the database that has:
// 
function Post(props) {
    return (
        <div className="post-border">
            <h2>{props.post.user_name}</h2>
            <p>{props.post.content}</p>
        </div>
    )
}

export default Post;