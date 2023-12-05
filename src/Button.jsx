import loadBtn from "./Images/btnLoad.gif"
function Button({btnText,style,btnFunc,btnclick, enableSpiner}) {

  return (
    <button disabled={btnclick} className={style} onClick={btnFunc}>
      {enableSpiner ? (
        <em>loading...</em>
      ) : (
        <p>{btnText}</p>
      )}
    </button>
  );
  
}

export default Button;