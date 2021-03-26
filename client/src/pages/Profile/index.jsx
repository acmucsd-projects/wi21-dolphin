import React, { useState } from 'react';
import EdiText from 'react-editext'

function Profile(){
    var biographyText = "Enter Biography Here"
    
    const saveBiography = val => {
        biographyText = val;
      }
    
    return (
        <EdiText
        type='text'
        value={biographyText}
        onSave={saveBiography}
      />
    )

    
    
}


export default Profile