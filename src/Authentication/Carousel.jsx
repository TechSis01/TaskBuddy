import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function Carousel({carouselImages}) {
        const settings = {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          arrows:false,
        };
  return (
    <div className="bg-purple-4 w-3/6">
         <Slider {...settings}>
         {carouselImages.map((images)=>(
          <img src={images.img} alt="to-do-list illustration" key={images.id}></img>
         ))}
       
        </Slider>
    </div>
  )
}

export default Carousel