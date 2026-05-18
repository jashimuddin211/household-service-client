import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {

  return (

    <div className="min-h-screen w-full relative bg-white">

      {/* Full Screen Image */}
      <img
        className="w-full h-screen object-cover"
        src="Error.png"
        alt="Error"
      />

      {/* Center Button */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">

        <Link to="/">
          <button
            className="
              btn 
              bg-[#FF9900] 
              text-black 
              border-[#e17d00] 
              px-8
              shadow-xl
              transition-all
              duration-300
              hover:bg-[#ffb52e]
              hover:shadow-2xl
              hover:scale-105
            "
          >
            Back to Home
          </button>
        </Link>

      </div>

    </div>
  );
};

export default Error;