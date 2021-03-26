import React, { useState } from 'react';
import EdiText from 'react-editext'
import API from '../../API'

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
    <>
        <div>{username}</div>
        <EdiText
        type='text'
        value={biographyText}
        onSave={saveBiography}
      />
    </>
    )

    
    
}


export default Profile