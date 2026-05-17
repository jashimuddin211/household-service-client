import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";


const AddService = () => {
  const { user } = useContext(AuthContext);

  const handleAddService = (e) => {
    e.preventDefault();
    const form = e.target;

    const serviceData = {
      serviceName: form.serviceName.value,
      category: form.category.value,
      price: form.price.value,
      description: form.description.value,
      image: form.image.value,
      providerName: user?.displayName,
      providerEmail: user?.email,
      providerImage: user?.photoURL,
    };

    
    console.log("New Service Data:", serviceData);

    
    fetch('http://localhost:3000/household', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(serviceData)
    })
    .then(res => res.json())
    .then(data => {
       if(data.insertedId) {
          toast.success("Success!", "Service added successfully", "success");
          form.reset();
       }
    })
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">
          Add New Service
        </h2>

        <form onSubmit={handleAddService} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Service Name */}
          <div className="form-control">
            <label className="label font-semibold">Service Name</label>
            <input
              name="serviceName"
              type="text"
              placeholder="e.g. Professional House Cleaning"
              className="input input-bordered focus:input-primary"
              required
            />
          </div>

          {/* Category */}
          <div className="form-control">
            <label className="label font-semibold">Category</label>
            <select name="category" className="select select-bordered focus:select-primary" required>
              <option value="">Select a category</option>
              <option value="cleaning">Cleaning</option>
              <option value="repair">Repair</option>
              <option value="moving">Moving</option>
              <option value="painting">Painting</option>
            </select>
          </div>

          {/* Price */}
          <div className="form-control">
            <label className="label font-semibold">Price ($)</label>
            <input
              name="price"
              type="number"
              placeholder="0.00"
              className="input input-bordered focus:input-primary"
              required
            />
          </div>

          {/* Image URL */}
          <div className="form-control">
            <label className="label font-semibold">Service Image URL</label>
            <input
              name="image"
              type="url"
              placeholder="https://example.com/image.jpg"
              className="input input-bordered focus:input-primary"
              required
            />
          </div>

          {/* Description - Full Width */}
          <div className="form-control md:col-span-2">
            <label className="label font-semibold">Description</label>
            <textarea
              name="description"
              className="textarea textarea-bordered h-24 focus:textarea-primary"
              placeholder="Tell customers about your service..."
              required
            ></textarea>
          </div>

          {/* Read-only Provider Info */}
          <div className="form-control">
            <label className="label font-semibold">Provider Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold">Provider Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 mt-4">
            <button type="submit" className="btn btn-primary w-full text-lg">
              Add Service
            </button>
            <ToastContainer></ToastContainer>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddService;