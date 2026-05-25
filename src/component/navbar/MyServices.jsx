import React, { useEffect, useState } from 'react';
import {
  Eye,
  Pencil,
  Trash2,
  Briefcase,
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

//  Toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyServices = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  // logged in user
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.email) return;

    // fetch only logged-in provider services
    fetch(`https://household-service-database.vercel.app/household/provider/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
      })
      .catch((error) => {
        console.error('Error fetching services:', error);

        toast.error('Failed to load services');
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
    fetch(`https://household-service-database.vercel.app/household/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          const remaining = services.filter(
            (service) => service._id !== id
          );

          setServices(remaining);

          //  Success Toast
          toast.success('Service deleted successfully');
        } else {
          toast.error('Failed to delete service');
        }
      })
      .catch((error) => {
        console.error(error);

        toast.error('Something went wrong');
      });
  };

  return (
    <div className="min-h-screen .bg-gradient-to-br from-slate-100 via-purple-50 to-indigo-100 py-10 px-4">

      <div className=".max-w-[1280px] mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">

          <div className="flex justify-center mb-4">
            <div className=".bg-gradient-to-r from-indigo-600 to-pink-600 p-4 rounded-2xl shadow-lg">
              <Briefcase className="text-white" size={35} />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold .bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
            My Services
          </h1>

          <p className="text-gray-600 mt-3 text-lg">
            Manage all your added household services
          </p>
        </div>

        {/* Empty State */}
        {services.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-10 text-center">

            <img
              className="w-40 mx-auto mb-6"
              src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
              alt="empty"
            />

            <h2 className="text-3xl font-bold text-gray-700 mb-3">
              No Services Added Yet
            </h2>

            <p className="text-gray-500">
              Add your first household service to get started.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto bg-white rounded-3xl shadow-2xl border border-gray-100">

              <table className="table">

                {/* table head */}
                <thead className=".bg-gradient-to-r from-indigo-600 to-pink-600 text-white text-base">
                  <tr>
                    <th>No</th>
                    <th>Image</th>
                    <th>Service Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Provider</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {services.map((service, index) => (
                    <tr
                      key={service._id}
                      className="hover:bg-indigo-50 transition duration-300"
                    >

                      <th>{index + 1}</th>

                      <td>
                        <img
                          src={service.image}
                          alt={service.serviceName}
                          className="w-24 h-20 object-cover rounded-2xl shadow-md"
                        />
                      </td>

                      <td className="font-bold text-gray-700">
                        {service.serviceName}
                      </td>

                      <td>
                        <span className="badge badge-secondary px-4 py-3">
                          {service.category}
                        </span>
                      </td>

                      <td className="text-green-600 font-extrabold text-lg">
                        ${service.price}
                      </td>

                      <td className="text-gray-600">
                        {service.providerEmail}
                      </td>

                      <td>
                        <div className="flex justify-center gap-3">

                          <button
                            onClick={() => handleView(service._id)}
                            className="btn btn-info btn-sm text-white rounded-xl"
                          >
                            <Eye size={18} />
                          </button>

                          <button
                            onClick={() => handleEdit(service._id)}
                            className="btn btn-warning btn-sm text-white rounded-xl"
                          >
                            <Pencil size={18} />
                          </button>

                          <button
                            onClick={() => handleDelete(service._id)}
                            className="btn btn-error btn-sm text-white rounded-xl"
                          >
                            <Trash2 size={18} />
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>

            {/* Mobile & Tablet Card View */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">

              {services.map((service, index) => (
                <div
                  key={service._id}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition duration-300"
                >

                  
                  <img
                    src={service.image}
                    alt={service.serviceName}
                    className="w-full h-56 object-cover"
                  />

                  
                  <div className="p-5">

                    <div className="flex justify-between items-start mb-3">

                      <h2 className="text-2xl font-bold text-gray-800">
                        {service.serviceName}
                      </h2>

                      <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                        #{index + 1}
                      </span>
                    </div>

                    <div className="space-y-2 text-gray-600">

                      <p>
                        <span className="font-bold">Category:</span>{' '}
                        {service.category}
                      </p>

                      <p>
                        <span className="font-bold">Provider:</span>{' '}
                        {service.providerEmail}
                      </p>

                      <p className="text-green-600 text-xl font-extrabold">
                        ${service.price}
                      </p>
                    </div>

                    
                    <div className="grid grid-cols-3 gap-3 mt-6">

                      <button
                        onClick={() => handleView(service._id)}
                        className="btn btn-info rounded-xl text-white"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => handleEdit(service._id)}
                        className="btn btn-warning rounded-xl text-white"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(service._id)}
                        className="btn btn-error rounded-xl text-white"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyServices;