import React from 'react'

function ProfilePic({image,altText,style,clickImage,tooltip}) {
  return (
    <div className='relative group cursor-pointer'  >
    <img src={image} alt={altText} className={style} onClick={clickImage}></img>
    <p className={`absolute top-64 left-32 md:group-hover:block hidden font-bold`}>Click to add profile picture</p>
    {/* <div className="absolute group-hover:font-bold"  >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white fill-current" viewBox="0 0 24 24">
        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-5.56 0-10-4.504-10-10s4.44-10 10-10 10 4.504 10 10-4.44 10-10 10zm7-11h-5v-5c0-.553-.447-1-1-1s-1 .447-1 1v5h-5c-.553 0-1 .447-1 1s.447 1 1 1h5v5c0 .553.447 1 1 1s1-.447 1-1v-5h5c.553 0 1-.447 1-1s-.447-1-1-1z"/>
      </svg>
    </div> */}
  </div>
  
  
  )
}

export default ProfilePic