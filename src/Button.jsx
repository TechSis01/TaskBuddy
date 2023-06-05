import React from 'react'

function Button({btnText,style,btnFunc,btnclick}) {

  return (
    <button disabled={btnclick} className={style} onClick={btnFunc}>{btnText}</button>
  )
}

export default Button;