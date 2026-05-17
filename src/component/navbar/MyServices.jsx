import React, { useEffect, useState } from 'react';


import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const MyServices = () => {

  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  // logged in user
  const { user } = useAuth();

  useEffect(() => {

    if (!user?.email) return;

    // fetch only logged-in provider services
    fetch(`http://localhost:3000/household/provider/${user.email}`)
      .then(res => res.json())
      .then(data => {
        setServices(data);
      })
      .catch(error => {
        console.error("Error fetching services:", error);
      });

  }, [user]);



  // view details
  const handleView = (id) => {
    navigate(`/serviceDetails/${id}`);
  };


  // update service
  const handleEdit = (id) => {
    navigate(`/updateService/${id}`);
  };


  // delete service
  const handleDelete = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmDelete) return;

    fetch(`http://localhost:3000/household/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {

        if (data.deletedCount > 0) {

          const remaining = services.filter(service => service._id !== id);
          setServices(remaining);

          alert("Service deleted successfully");
        }

      })
      .catch(error => {
        console.error(error);
      });
  };



  return (
    <div className="max-w-[1280px] mx-auto py-10">

      <h1 className="text-4xl font-bold text-center mb-8">
        My Services
      </h1>


      <div className="overflow-x-auto">

        <table className="table table-zebra">

          {/* table head */}
          <thead className="bg-primary text-white">
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Service Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Provider</th>
              <th>Actions</th>
            </tr>
          </thead>


          <tbody>

            {
              services.map((service, index) => (

                <tr key={service._id}>

                  <th>{index + 1}</th>

                  <td>
                    <img
                      src={service.image}
                      alt={service.serviceName}
                      className="w-20 h-16 object-cover rounded-lg"
                    />
                  </td>

                  <td className="font-semibold">
                    {service.serviceName}
                  </td>

                  <td>{service.category}</td>

                  <td className="text-green-600 font-bold">
                    ${service.price}
                  </td>

                  <td>{service.providerEmail}</td>

                  <td>

                    <div className="flex gap-2">

                      <button
                        onClick={() => handleView(service._id)}
                        className="btn btn-info btn-sm"
                      >
                        View
                      </button>

                      <button
                        onClick={() => handleEdit(service._id)}
                        className="btn btn-warning btn-sm"
                      >
                        Update
                      </button>

                      <button
                        onClick={() => handleDelete(service._id)}
                        className="btn btn-error btn-sm"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>
              ))
            }

          </tbody>

        </table>

      </div>


      {
        services.length === 0 && (
          <div className="text-center mt-10">
            <p className="text-2xl font-semibold text-gray-500">
              No services added yet
            </p>
          </div>
        )
      }

    </div>
  );
};

export default MyServices;