
function Logo({style,image,altText}) {
  return (
    <img src={image} alt={altText} className={style}></img>
  )
}

export default Logo