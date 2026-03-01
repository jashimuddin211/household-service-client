import { useState, useEffect } from "react";

const Slider = () => {
  const images = [
    "https://www.goodwork.ph/static/media/gw-home-cleaning-banner.6d43656b.png",
    "https://media.angi.com/s3fs-public/common-housekeeper-services.png?impolicy=infographic",
    "https://cache.arramton.com/ninjacare/16970233017450.3641272208263058.webp"
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((current + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((current - 1 + images.length) % images.length);
  };

  // 🔁 Auto slide every 3 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="">
       
            <div className="w-full" style={{ textAlign: "center" }}>
      <img className="w-full"
        src={images[current]}
        alt="slide"
        style={{ height:500 }}
      />

      <br /><br />

      <button onClick={prevSlide}>⬅ Prev</button>
      <button onClick={nextSlide}>Next ➡</button>
    </div>
        </div>
    
  );
};

export default Slider;
