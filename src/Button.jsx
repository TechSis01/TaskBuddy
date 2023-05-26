import React from 'react'

function Button({btnText,style, signupFunc}) {
  return (
    <button className={style} onClick={signupFunc}>{btnText}</button>
  )
}

export default Button