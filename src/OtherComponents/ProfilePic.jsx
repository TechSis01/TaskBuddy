import React from 'react'

function ProfilePic({image,altText,style,clickImage}) {
  return (
    <div>
          <img src={image} alt={altText} className={style} onClick={clickImage}></img>
    </div>
  
  )
}

export default ProfilePic