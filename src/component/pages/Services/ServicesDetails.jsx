import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const ServicesDetails = () => {

  const { id } = useParams();
  const { user } = useAuth();

  const [service, setService] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/household/${id}`)
      .then(res => res.json())
      .then(data => setService(data))
      .catch(err => console.error("Error:", err));
  }, [id]);

  // Handle Booking
  const handleBooking = (e) => {
    e.preventDefault();

    const form = e.target;

    const bookingDate = form.date.value;

    const bookingInfo = {
      userEmail: user?.email,
      serviceId: service._id,
      bookingDate,
      price: service.price
    };

    fetch('http://localhost:3000/bookings', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(bookingInfo)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);

        alert("Booking Successful!");

        // Close modal
        document.getElementById('booking_modal').close();
      });
  };

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

          {service.price && (
            <p className="font-bold text-lg mt-2">
              Price: ${service.price}
            </p>
          )}

          <div className="card-actions justify-end mt-5">

            {/* Open Modal Button */}
            <button
              className="btn btn-primary"
              onClick={() =>
                document.getElementById('booking_modal').showModal()
              }
            >
              Book Now
            </button>

          </div>
        </div>
      </div>

      {/* Modal */}
      <dialog id="booking_modal" className="modal">

        <div className="modal-box">

          <h3 className="font-bold text-2xl mb-4">
            Book Service
          </h3>

          {/* Service Info */}
          <div className="mb-4 space-y-2">

            <p>
              <span className="font-semibold">Service:</span>{" "}
              {service.serviceName}
            </p>

            <p>
              <span className="font-semibold">Price:</span>{" "}
              ${service.price}
            </p>

          </div>

          {/* Booking Form */}
          <form onSubmit={handleBooking} className="space-y-4">

            {/* User Email */}
            <div>
              <label className="label">Email</label>

              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full"
              />
            </div>

            {/* Booking Date */}
            <div>
              <label className="label">Booking Date</label>

              <input
                type="date"
                name="date"
                required
                className="input input-bordered w-full"
              />
            </div>

            {/* Price */}
            <div>
              <label className="label">Price</label>

              <input
                type="text"
                value={`$${service.price}`}
                readOnly
                className="input input-bordered w-full"
              />
            </div>

            <button className="btn btn-primary w-full">
              Confirm Booking
            </button>

          </form>

          {/* Close Button */}
          <div className="modal-action">

            <form method="dialog">
              <button className="btn">
                Close
              </button>
            </form>

          </div>

        </div>

      </dialog>

    </div>
  );
};

export default ServicesDetails;