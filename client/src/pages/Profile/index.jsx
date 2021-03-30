import React, { useState, useEffect } from 'react';
import EdiText from 'react-editext';
import API from '../../API';
import Post from "../../components/Post";

function Profile(props) {

    let [biographyText, setBiographyText] = useState("Enter your biography here!");
    const username = props.username;
    console.log(username);

    API.getUser(username)
    .then((response) => {
      setBiographyText(response.data.user.biography);
    })
    .catch((error) => {
      console.log(error);
    })

    const [posts, setPosts] = useState([])

    useEffect(() => {
        
      API.getPostsUser(username).then((response) => {
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
    
    
    const saveBiography = val => {
        biographyText = val;
        API.editBio(props.username, biographyText)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })
    }
    
    return (
    <div>
          
          <EdiText
          type='text'
          value={biographyText}
          onSave={saveBiography}
        />

        <div className="left-component">
          <h2 className="profile-posts-title">Posts made by {username}</h2>
        </div>  


      <div className="profile-posts">
        {posts.map((post, key) => {
            return (
                <Post post={post} key={`post-${key}`} hobby={post.hobby.name} username={props.username}/>
            )
        })}
      </div>
    </div>

    )

    
    
}


export default Profile