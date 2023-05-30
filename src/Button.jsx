import React from 'react'

function Button({btnText,style,btnFunc}) {
  return (
    <button className={style} onClick={btnFunc}>{btnText}</button>
  )
}

export default Button;