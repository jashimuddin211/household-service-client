import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import img1 from "../../../../public/swiper1.png"
import img2 from "../../../../public/swiper2.png"
import img3 from "../../../../public/swiper3.png"

const Slider = () => {

  const navigate = useNavigate();

  const slides = [
    {
      image:
        (img1),
      title: "Professional Home Cleaning",
      details:
        "Keep your home sparkling clean with our trusted and experienced cleaners.",
    },

    {
      image:
        (img2),
      title: "Reliable Housekeeping Service",
      details:
        "Affordable and reliable housekeeping services for your daily lifestyle.",
    },

    {
      image:
        (img3),
      title: "Fast & Easy Booking",
      details:
        "Book skilled household workers instantly with just a few clicks.",
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((current + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((current - 1 + slides.length) % slides.length);
  };

  // 🔁 Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full relative overflow-hidden rounded-2xl">

      {/* Background Image */}
      <img
        className="w-full object-cover"
        src={slides[current].image}
        alt="slide"
        style={{ height: 550 }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-start px-10 md:px-20 text-white">

        <h1 className="text-4xl md:text-6xl font-bold mb-5 max-w-2xl leading-tight">
          {slides[current].title}
        </h1>

        <p className="text-lg md:text-xl max-w-xl mb-8 text-gray-200">
          {slides[current].details}
        </p>

        {/* Explore Button */}
        <button
          onClick={() => navigate("/service")}
          className="bg-orange-500 hover:bg-orange-600
          px-8 py-3 rounded-full text-lg font-semibold
          shadow-lg transition duration-300 hover:scale-105"
        >
          Explore Services
        </button>
      </div>

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-5 -translate-y-1/2 
        bg-white/20 backdrop-blur-md hover:bg-white/40
        text-white p-3 rounded-full shadow-lg
        transition duration-300 hover:scale-110"
      >
        <ChevronLeft size={30} />
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-5 -translate-y-1/2 
        bg-white/20 backdrop-blur-md hover:bg-white/40
        text-white p-3 rounded-full shadow-lg
        transition duration-300 hover:scale-110"
      >
        <ChevronRight size={30} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-5 w-full flex justify-center gap-3">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-3 rounded-full transition-all duration-300 ${
              current === index
                ? "w-8 bg-white"
                : "w-3 bg-white/50"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;