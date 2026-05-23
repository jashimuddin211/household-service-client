import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

import {
  CalendarDays,
  DollarSign,
  Trash2,
  ClipboardList,
  Star,
} from 'lucide-react';

import { toast } from 'react-toastify';

const Bookings = () => {

  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);

  // review modal service id
  const [selectedService, setSelectedService] = useState(null);



 
  useEffect(() => {

    if (!user?.email) return;

    fetch(`https://household-service-database.vercel.app/bookings/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to load bookings');
      });

  }, [user]);



  
  const handleDelete = (id) => {

    const confirmDelete = confirm(
      'Are you sure you want to cancel this booking?'
    );

    if (!confirmDelete) {
      return;
    }

    fetch(`http://localhost:3000/bookings/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {

        if (data.deletedCount > 0) {

          toast.success('Booking Cancelled Successfully');

          // remove deleted booking from UI
          const remainingBookings = bookings.filter(
            (booking) => booking._id !== id
          );

          setBookings(remainingBookings);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to cancel booking');
      });
  };



  
  const handleReview = (serviceId) => {

    setSelectedService(serviceId);

    document.getElementById('review_modal').showModal();
  };



  
  const handleSubmitReview = (e) => {

    e.preventDefault();

    const form = e.target;

    const rating = form.rating.value;
    const comment = form.comment.value;

    const reviewInfo = {

      userName: user?.displayName || 'Anonymous',
      userEmail: user?.email,

      rating: parseInt(rating),

      comment,

      date: new Date().toLocaleDateString(),
    };



    fetch(`http://localhost:3000/services/review/${selectedService}`, {

      method: 'PATCH',

      headers: {
        'content-type': 'application/json',
      },

      body: JSON.stringify(reviewInfo),
    })
      .then((res) => res.json())
      .then((data) => {

        console.log(data);

        if (data.modifiedCount > 0) {

          toast.success('Review Added Successfully');

          document.getElementById('review_modal').close();

          form.reset();

        } else {

          toast.error('Failed to Add Review');
        }
      })
      .catch((error) => {

        console.error(error);

        toast.error('Something went wrong');
      });
  };



  return (
    <div className="min-h-screen .bg-gradient-to-br from-slate-100 via-indigo-50 to-pink-50 py-10 px-4">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">

          <div className="flex justify-center mb-4">

            <div className=".bg-gradient-to-r from-indigo-600 to-pink-600 p-4 rounded-2xl shadow-lg">

              <ClipboardList className="text-white" size={35} />

            </div>

          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold .bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">

            My Bookings

          </h2>

          <p className="text-gray-600 mt-3 text-lg">

            Manage and track all your booked services

          </p>

        </div>



        {/* Empty State */}
        {bookings.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-xl p-10 text-center">

            <img
              src="https://cdn-icons-png.flaticon.com/512/7486/7486808.png"
              alt="No Bookings"
              className="w-40 mx-auto mb-6"
            />

            <h3 className="text-3xl font-bold text-gray-700 mb-3">

              No Bookings Found

            </h3>

            <p className="text-gray-500 text-lg">

              You haven't booked any services yet.

            </p>

          </div>

        ) : (
          <>
           
            <div className="hidden lg:block overflow-x-auto bg-white rounded-3xl shadow-2xl border border-gray-100">

              <table className="table">

                {/* Table Head */}
                <thead className=".bg-gradient-to-r from-indigo-600 to-pink-600 text-white text-base">

                  <tr>
                    <th>#</th>
                    <th>User Email</th>
                    <th>Service ID</th>
                    <th>Booking Date</th>
                    <th>Price</th>
                    <th className="text-center">Actions</th>
                  </tr>

                </thead>

                {/* Table Body */}
                <tbody>

                  {bookings.map((booking, index) => (

                    <tr
                      key={booking._id}
                      className="hover:bg-indigo-50 transition duration-300"
                    >

                      <td className="font-bold">
                        {index + 1}
                      </td>

                      <td className="font-medium text-gray-700">
                        {booking.userEmail}
                      </td>

                      <td className="text-gray-600">
                        {booking.serviceId}
                      </td>

                      <td>

                        <div className="flex items-center gap-2 text-gray-700">

                          <CalendarDays size={18} />

                          {booking.bookingDate}

                        </div>

                      </td>

                      <td className="text-green-600 font-bold text-lg">

                        <div className="flex items-center gap-1">

                          <DollarSign size={18} />

                          {booking.price}

                        </div>

                      </td>

                      <td>

                        <div className="flex justify-center gap-3">

                          {/* Review Button */}
                          <button
                            onClick={() =>
                              handleReview(booking.serviceId)
                            }
                            className="btn btn-warning btn-sm rounded-xl text-white"
                          >

                            <Star size={18} />

                            Review

                          </button>


                          {/* Cancel Button */}
                          <button
                            onClick={() =>
                              handleDelete(booking._id)
                            }
                            className="btn btn-error btn-sm rounded-xl text-white"
                          >

                            <Trash2 size={18} />

                            Cancel

                          </button>

                        </div>

                      </td>
                    </tr>
                  ))}

                </tbody>

              </table>

            </div>



            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">

              {bookings.map((booking, index) => (

                <div
                  key={booking._id}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition duration-300"
                >

                  {/* Top Gradient */}
                  <div className=".bg-gradient-to-r from-indigo-600 to-pink-600 p-5 text-white">

                    <div className="flex justify-between items-center">

                      <h3 className="text-2xl font-bold">

                        Booking #{index + 1}

                      </h3>

                      <ClipboardList size={28} />

                    </div>

                  </div>



                  {/* Content */}
                  <div className="p-5 space-y-4">

                    <div>

                      <p className="text-sm text-gray-500">
                        User Email
                      </p>

                      <p className="font-semibold text-gray-700 break-all">

                        {booking.userEmail}

                      </p>

                    </div>

                    <div>

                      <p className="text-sm text-gray-500">
                        Service ID
                      </p>

                      <p className="font-semibold text-gray-700 break-all">

                        {booking.serviceId}

                      </p>

                    </div>

                    <div className="flex items-center gap-2 text-gray-700">

                      <CalendarDays size={20} />

                      <span className="font-medium">

                        {booking.bookingDate}

                      </span>

                    </div>

                    <div className="flex items-center gap-2 text-green-600 text-2xl font-extrabold">

                      <DollarSign size={24} />

                      {booking.price}

                    </div>



                    {/* Buttons */}
                    <div className="grid grid-cols-2 gap-3 mt-5">

                      {/* Review */}
                      <button
                        onClick={() =>
                          handleReview(booking.serviceId)
                        }
                        className="btn btn-warning rounded-2xl text-white"
                      >

                        <Star size={18} />

                        Review

                      </button>


                      {/* Cancel */}
                      <button
                        onClick={() =>
                          handleDelete(booking._id)
                        }
                        className="btn btn-error rounded-2xl text-white"
                      >

                        <Trash2 size={18} />

                        Cancel

                      </button>

                    </div>

                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>



      
      <dialog id="review_modal" className="modal">

        <div className="modal-box rounded-3xl">

          <h3 className="font-bold text-3xl mb-6 text-center">

            Submit Review

          </h3>



          <form
            onSubmit={handleSubmitReview}
            className="space-y-5"
          >

            {/* Rating */}
            <div>

              <label className="label font-semibold">
                Rating (1 - 5)
              </label>

              <input
                type="number"
                name="rating"
                min="1"
                max="5"
                required
                className="input input-bordered w-full rounded-2xl"
                placeholder="Give Rating"
              />

            </div>



            {/* Comment */}
            <div>

              <label className="label font-semibold">
                Comment
              </label>

              <textarea
                name="comment"
                required
                className="textarea textarea-bordered w-full rounded-2xl h-32"
                placeholder="Write your review..."
              ></textarea>

            </div>



            {/* Submit */}
            <button className="btn btn-primary w-full rounded-2xl">

              Submit Review

            </button>

          </form>



          {/* Close Button */}
          <div className="modal-action">

            <form method="dialog">

              <button className="btn rounded-2xl">
                Close
              </button>

            </form>

          </div>

        </div>

      </dialog>

    </div>
  );
};

export default Bookings;