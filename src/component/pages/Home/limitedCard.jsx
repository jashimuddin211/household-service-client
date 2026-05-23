import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LimitedCard = () => {

  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://household-service-database.vercel.app/household')
      .then(res => res.json())
      .then(result => {
        setData(result);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleViewDetails = (id) => {
    if (!id) {
      console.error("ID is missing!");
      return;
    }

    navigate(`/serviceDetails/${id}`);
  };

  return (
    <div className='max-w-[1280px] mx-auto py-10'>

      {/* Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

        {
          data.slice(0, 6).map(d => (

            <div
              key={d._id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300"
            >

              <figure>
                <img
                  className='w-full h-60 object-cover p-4 rounded-3xl'
                  src={d.image}
                  alt={d.serviceName}
                />
              </figure>

              <div className="card-body">

                <h2 className="card-title text-2xl">
                  {d.serviceName}
                </h2>

                <p className='text-amber-600 font-bold'>
                  {d.category}
                </p>

                <div className="card-actions justify-end mt-4">

                  <button
                    onClick={() => handleViewDetails(d._id)}
                    className="btn bg-orange-500 hover:bg-orange-600 text-white border-none"
                  >
                    View Details
                  </button>

                </div>
              </div>
            </div>

          ))
        }

      </div>

      {/* Show More Button */}
      {
        data.length > 6 && (
          <div className='flex justify-center mt-10'>

            <button
              onClick={() => navigate('/service')}
              className='btn bg-black text-white hover:bg-orange-500 border-none px-8'
            >
              Show More
            </button>

          </div>
        )
      }

    </div>
  );
};

export default LimitedCard;
