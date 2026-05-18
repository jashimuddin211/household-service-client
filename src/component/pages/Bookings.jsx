import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

const Bookings = () => {

  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);

  // ===================================================
  // ✅ Load User Bookings
  // ===================================================
  useEffect(() => {

    if (!user?.email) return;

    fetch(`http://localhost:3000/bookings/${user.email}`)
      .then(res => res.json())
      .then(data => {
        setBookings(data);
      });

  }, [user]);



  // ===================================================
  // ✅ Cancel Booking
  // ===================================================
  const handleDelete = (id) => {

    const confirmDelete = confirm(
      'Are you sure you want to cancel this booking?'
    );

    if (!confirmDelete) {
      return;
    }

    fetch(`http://localhost:3000/bookings/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {

        console.log(data);

        if (data.deletedCount > 0) {

          alert('Booking Cancelled Successfully');

          // remove deleted booking from UI
          const remainingBookings = bookings.filter(
            booking => booking._id !== id
          );

          setBookings(remainingBookings);
        }
      });
  };



  return (
    <div className="max-w-6xl mx-auto p-6">

      <h2 className="text-3xl font-bold mb-6 text-center">
        My Bookings
      </h2>

      {
        bookings.length === 0 ? (

          <div className="text-center text-xl font-semibold mt-10">
            No bookings found.
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="table table-zebra">

              {/* Table Head */}
              <thead className="bg-base-200 text-lg">

                <tr>
                  <th>#</th>
                  <th>Email</th>
                  <th>Service ID</th>
                  <th>Booking Date</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>

              </thead>

              {/* Table Body */}
              <tbody>

                {
                  bookings.map((booking, index) => (

                    <tr key={booking._id}>

                      <td>{index + 1}</td>

                      <td>{booking.userEmail}</td>

                      <td>{booking.serviceId}</td>

                      <td>{booking.bookingDate}</td>

                      <td>${booking.price}</td>

                      <td>

                        <button
                          onClick={() => handleDelete(booking._id)}
                          className="btn btn-error btn-sm"
                        >
                          Cancel
                        </button>

                      </td>

                    </tr>
                  ))
                }

              </tbody>

            </table>

          </div>
        )
      }

    </div>
  );
};

export default Bookings;