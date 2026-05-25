import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateService = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [service, setService] = useState({});



  // load existing data
  useEffect(() => {

    fetch(`https://household-service-database.vercel.app/household/${id}`)
      .then(res => res.json())
      .then(data => {
        setService(data);
      });

  }, [id]);




  // update service
  const handleUpdateService = (e) => {

    e.preventDefault();

    const form = e.target;

    const updatedService = {

      serviceName: form.serviceName.value,
      image: form.image.value,
      category: form.category.value,
      price: form.price.value,
      description: form.description.value

    };



    fetch(`https://household-service-database.vercel.app/household/${id}`, {

      method: 'PUT',

      headers: {
        'content-type': 'application/json'
      },

      body: JSON.stringify(updatedService)

    })
      .then(res => res.json())
      .then(data => {

        console.log(data);

        if (data.modifiedCount > 0) {

          alert('Service updated successfully');

          navigate('/myServices');
        }

      });

  };




  return (

    <div className="max-w-4xl mx-auto py-10">

      <div className="bg-base-200 p-8 rounded-2xl shadow-lg">

        <h1 className="text-4xl font-bold text-center mb-8">
          Update Service
        </h1>



        <form onSubmit={handleUpdateService}>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


            {/* Service Name */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">
                  Service Name
                </span>
              </label>

              <input
                type="text"
                name="serviceName"
                defaultValue={service.serviceName}
                placeholder="Service Name"
                className="input input-bordered w-full"
                required
              />
            </div>



            {/* Image URL */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">
                  Image URL
                </span>
              </label>

              <input
                type="text"
                name="image"
                defaultValue={service.image}
                placeholder="Image URL"
                className="input input-bordered w-full"
                required
              />
            </div>



            {/* Category */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">
                  Category
                </span>
              </label>

              <input
                type="text"
                name="category"
                defaultValue={service.category}
                placeholder="Category"
                className="input input-bordered w-full"
                required
              />
            </div>



            {/* Price */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">
                  Price
                </span>
              </label>

              <input
                type="number"
                name="price"
                defaultValue={service.price}
                placeholder="Price"
                className="input input-bordered w-full"
                required
              />
            </div>

          </div>



          {/* Description */}
          <div className="mt-5">

            <label className="label">
              <span className="label-text font-semibold">
                Description
              </span>
            </label>

            <textarea
              name="description"
              defaultValue={service.description}
              placeholder="Description"
              className="textarea textarea-bordered w-full h-32"
              required
            ></textarea>

          </div>



          {/* Button */}
          <div className="mt-8">

            <button className="btn btn-primary w-full text-lg">
              Update Service
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default UpdateService;