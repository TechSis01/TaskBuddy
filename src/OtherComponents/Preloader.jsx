import preloader from "../Images/load.gif"

function Preloader() {
  return (
    <div className="w-screen h-screen absolute z-10 pt-60 mr-60 bg-twhite">
      <img src={preloader} alt="preloader" className="mx-auto"></img>
    </div>
  );
}

export default Preloader;
