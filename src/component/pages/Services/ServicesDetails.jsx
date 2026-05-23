import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

// Icons
import {
  Star,
  CalendarDays,
  DollarSign,
  UserCircle2,
} from 'lucide-react';

// Toast
import { toast } from 'react-toastify';

const ServicesDetails = () => {

  const { id } = useParams();
  const { user } = useAuth();

  const [service, setService] = useState(null);

  // Load service
  useEffect(() => {
    fetch(`http://localhost:3000/household/${id}`)
      .then(res => res.json())
      .then(data => setService(data))
      .catch(err => {
        console.error(err);
        toast.error("Failed to load service");
      });
  }, [id]);

  // CHECK OWNER (IMPORTANT)
  const isOwner = user?.email === service?.providerEmail;

  // Booking handler
  const handleBooking = (e) => {
    e.preventDefault();

    // BLOCK OWNER
    if (isOwner) {
      toast.error("You cannot book your own service");
      return;
    }

    const form = e.target;
    const bookingDate = form.date.value;

    const bookingInfo = {
      userEmail: user?.email,
      serviceId: service._id,
      bookingDate,
      price: service.price,
    };

    fetch('https://household-service-database.vercel.app/bookings', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(bookingInfo),
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          toast.success("Booking Successful!");
          document.getElementById('booking_modal').close();
          form.reset();
        } else {
          toast.error("Booking Failed!");
        }
      })
      .catch(() => toast.error("Something went wrong!"));
  };

  // Loading
  if (!service) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Rating
  const reviews = service.reviews || [];
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((t, r) => t + r.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-pink-50 py-10 px-4">

      <div className="max-w-6xl mx-auto">

        {/* CARD */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          <img
            src={service.image}
            alt={service.serviceName}
            className="w-full h-[450px] object-cover"
          />

          <div className="p-8">

            <div className="flex justify-between">

              <div>
                <h2 className="text-4xl font-extrabold">
                  {service.serviceName}
                </h2>
                <p className="text-indigo-600 font-bold text-xl mt-3">
                  {service.category}
                </p>
              </div>

              <div className="flex flex-col gap-4">

                <div className="bg-green-100 text-green-700 px-5 py-3 rounded-2xl font-bold text-2xl flex items-center gap-2">
                  <DollarSign size={24} />
                  {service.price}
                </div>

                <div className="bg-yellow-100 text-yellow-700 px-5 py-3 rounded-2xl font-bold text-xl flex items-center gap-2">
                  <Star fill="currentColor" size={22} />
                  {averageRating} / 5
                </div>

              </div>

            </div>

            {/* BOOK BUTTON */}
            <div className="mt-10">

              <button
                className={`btn btn-primary btn-lg rounded-2xl px-10 ${
                  isOwner ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isOwner}
                onClick={() => {
                  if (isOwner) {
                    toast.error("You cannot book your own service");
                    return;
                  }
                  document.getElementById('booking_modal').showModal();
                }}
              >
                {isOwner ? "You can't book your service" : "Book Now"}
              </button>

            </div>

          </div>
        </div>

        {/* REVIEWS */}
        <div className="mt-12">

          <h2 className="text-3xl font-bold mb-6">
            Customer Reviews
          </h2>

          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            reviews.map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl mb-4">
                <p className="font-bold">{review.userName}</p>
                <p>{review.comment}</p>
                <p className="text-yellow-600">{review.rating}/5</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MODAL */}
      <dialog id="booking_modal" className="modal">

        <div className="modal-box rounded-3xl">

          <h3 className="text-2xl font-bold mb-5">
            Book Service
          </h3>

          <form onSubmit={handleBooking} className="space-y-4">

            <input
              type="email"
              value={user?.email || ''}
              readOnly
              className="input input-bordered w-full"
            />

            <input
              type="date"
              name="date"
              required
              className="input input-bordered w-full"
            />

            <input
              type="text"
              value={`$${service.price}`}
              readOnly
              className="input input-bordered w-full"
            />

            <button className="btn btn-primary w-full">
              Confirm Booking
            </button>

          </form>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>

        </div>

      </dialog>

    </div>
  );
};

export default ServicesDetails;