import React from 'react'

function ProfilePic({image,altText,style,clickImage,tooltip}) {
  return (
    <div className='relative group cursor-pointer'  >
    <img src={image} alt={altText} className={style} onClick={clickImage}></img> 
  </div>
  
  
  )
}

export default ProfilePic