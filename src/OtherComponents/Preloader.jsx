import preloader from "../Images/preloaderr.gif"

function Preloader() {
  return (
    <div className="w-screen h-screen absolute z-10 pt-40 bg-white">
      <img src={preloader} alt="preloader" className="mx-auto"></img>
    </div>
  );
}

export default Preloader;
