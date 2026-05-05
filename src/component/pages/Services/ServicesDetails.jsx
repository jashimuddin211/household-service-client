import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ServicesDetails = () => {

  const { id } = useParams(); // ✅ get id from URL
  const [service, setService] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/household/${id}`)
      .then(res => res.json())
      .then(data => setService(data))
      .catch(err => console.error("Error:", err));
  }, [id]);

  // ✅ loading state
  if (!service) {
    return (
      <div className="text-center mt-10 text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto p-6">
      
      <div className="card bg-base-100 shadow-xl">
        
        <figure>
          <img
            src={service.image}
            alt={service.serviceName}
            className="w-full max-h-[400px] object-cover"
          />
        </figure>

        <div className="card-body">
          <h2 className="card-title text-3xl font-bold">
            {service.serviceName}
          </h2>

          <p className="text-amber-600 font-semibold text-lg">
            {service.category}
          </p>

          <p className="text-gray-600 mt-3">
            {service.description || "No description available."}
          </p>

          {/* Optional extra fields */}
          {service.price && (
            <p className="font-bold text-lg mt-2">
              Price: ${service.price}
            </p>
          )}

          <div className="card-actions justify-end mt-5">
            <button className="btn btn-primary">
              Book Now
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default ServicesDetails;