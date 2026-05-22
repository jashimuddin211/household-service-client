import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Services = () => {

  const [data, setData] = useState([]);

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  //  Loading state for button
  const [loadingId, setLoadingId] = useState(null);

  const navigate = useNavigate();

  
  useEffect(() => {

    let url = 'http://localhost:3000/household';

    // Price filter query
    if (minPrice || maxPrice) {
      url += `?min=${minPrice}&max=${maxPrice}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(result => {
        setData(result);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });

  }, [minPrice, maxPrice]);




  const handleViewDetails = (id) => {

    if (!id) {
      console.error("ID is missing!");
      return;
    }

    // Start loading
    setLoadingId(id);

    // Fake delay for spinner effect
    setTimeout(() => {
      navigate(`/serviceDetails/${id}`);
    }, 2000);
  };



  return (

    <div className='max-w-[1280px] mx-auto px-4 py-10'>

     
      <div className='text-center mb-10'>

        <h1 className='text-5xl font-bold text-gray-800'>
          Our Services
        </h1>

        <p className='text-gray-500 mt-3 text-lg'>
          Discover trusted household services at affordable prices
        </p>

      </div>



      
      <div className="mb-12">

        <div
          className="
            bg-white/70
            backdrop-blur-lg
            border
            border-gray-200
            shadow-2xl
            rounded-3xl
            p-6
            flex
            flex-col
            lg:flex-row
            items-center
            justify-between
            gap-6
          "
        >

          {/* Left Side */}
          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              Filter by Price
            </h2>

            <p className="text-gray-500 mt-1">
              Find services within your budget
            </p>

          </div>


          {/* Right Side */}
          <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">

            {/* Min Price */}
            <div className="relative">

              <span className="absolute left-4 top-3 text-gray-400 font-semibold">
                $
              </span>

              <input
                type="number"
                placeholder="Minimum"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="
                  input
                  w-full
                  md:w-52
                  pl-8
                  rounded-2xl
                  border-gray-300
                  focus:outline-none
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/30
                  transition-all
                  duration-300
                "
              />

            </div>


            {/* Max Price */}
            <div className="relative">

              <span className="absolute left-4 top-3 text-gray-400 font-semibold">
                $
              </span>

              <input
                type="number"
                placeholder="Maximum"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="
                  input
                  w-full
                  md:w-52
                  pl-8
                  rounded-2xl
                  border-gray-300
                  focus:outline-none
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/30
                  transition-all
                  duration-300
                "
              />

            </div>


            {/* Clear Button */}
            <button
              onClick={() => {
                setMinPrice('');
                setMaxPrice('');
              }}
              className="
                btn
                rounded-2xl
                px-8
                bg-black
                text-white
                border-none
                hover:scale-105
                hover:shadow-xl
                transition-all
                duration-300
              "
            >
              Clear
            </button>

          </div>

        </div>

      </div>



      
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>

        {
          data.map(d => (

            <div
              key={d._id}
              className="
                card
                bg-white
                shadow-xl
                hover:shadow-2xl
                transition-all
                duration-300
                hover:-translate-y-2
                rounded-3xl
                overflow-hidden
              "
            >

              {/* Image */}
              <figure className='overflow-hidden'>

                <img
                  className='w-full h-64 object-cover hover:scale-110 transition duration-500'
                  src={d.image}
                  alt={d.serviceName}
                />

              </figure>


              {/* Card Body */}
              <div className="card-body">

                <div className='flex justify-between items-center'>

                  <h2 className="card-title text-2xl font-bold">
                    {d.serviceName}
                  </h2>

                  <div className='badge badge-warning text-black font-bold p-4'>
                    ${d.price}
                  </div>

                </div>


                <p className='text-amber-600 font-semibold text-lg'>
                  {d.category}
                </p>

                <p className='text-gray-500 mt-2 line-clamp-2'>
                  {d.description || "No description available"}
                </p>


                {/* Button */}
                <div className="card-actions justify-end mt-5">

                  <button
                    onClick={() => handleViewDetails(d._id)}
                    disabled={loadingId === d._id}
                    className="
                      btn
                      btn-primary
                      rounded-xl
                      px-6
                      hover:scale-105
                      hover:shadow-lg
                      transition-all
                      duration-300
                    "
                  >

                    {
                      loadingId === d._id ? (
                        <>
                          <span className="loading loading-bars loading-xl"></span>
                          
                        </>
                      ) : (
                        'View Details'
                      )
                    }

                  </button>

                </div>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  );
};

export default Services;