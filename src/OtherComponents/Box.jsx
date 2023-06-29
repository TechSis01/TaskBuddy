import React from 'react'

function Box({icon,text,number,style,iconStyle,numberStyle}) {
  return (
    <div className={style}>
        <p className={iconStyle}>{icon}</p>
        <p>{text}</p>
        <p className={numberStyle}>{number}</p>
    </div>
  )
}

export default Box