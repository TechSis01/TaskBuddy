import React from 'react'

function ProfilePic({image,altText,style}) {
  return (
    
          <img src={image} alt={altText} className={style}></img>
    
  
  )
}

export default ProfilePic