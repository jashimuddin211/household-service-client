import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Services = () => {

  const [data, setData] = useState([]);
  const [providerData, setProviderData] = useState([]);

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const [loadingId, setLoadingId] = useState(null);

  const { user } = useAuth();
  const navigate = useNavigate();

 
  const sortByPriceAsc = (arr) =>
    [...arr].sort((a, b) => Number(a.price) - Number(b.price));

  
  const applyPriceFilter = (arr) =>
    arr.filter(item => {
      const price = Number(item.price);
      const aboveMin = minPrice !== '' ? price >= Number(minPrice) : true;
      const belowMax = maxPrice !== '' ? price <= Number(maxPrice) : true;
      return aboveMin && belowMax;
    });

  
  const getSortedFiltered = (arr) => sortByPriceAsc(applyPriceFilter(arr));

  
  useEffect(() => {

    const fetchServices = async () => {
      try {
        const res = await fetch('https://household-service-database.vercel.app/household');
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchServices();

  }, []);

 
  useEffect(() => {

    if (!user?.email) return;

    fetch(`https://household-service-database.vercel.app/household/provider/${user.email}`)
      .then(res => res.json())
      .then(result => {
        setProviderData(result);
      })
      .catch(err => {
        console.error("Provider fetch error:", err);
      });

  }, [user?.email]);

  const handleViewDetails = (id) => {
    if (!id) return;
    setLoadingId(id);
    setTimeout(() => {
      navigate(`/serviceDetails/${id}`);
    }, 1500);
  };

  
  const ServiceCard = ({ item }) => (
    <div className="card bg-white shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl overflow-hidden">

      <figure>
        <img
          className='w-full h-64 object-cover'
          src={item.image}
          alt={item.serviceName}
        />
      </figure>

      <div className="card-body">

        <div className='flex justify-between items-center'>
          <h2 className="card-title text-2xl font-bold">
            {item.serviceName}
          </h2>

          <div className='badge badge-warning text-black font-bold p-4'>
            ${item.price}
          </div>
        </div>

        <p className='text-amber-600 font-semibold text-lg'>
          {item.category}
        </p>

        <p className='text-gray-500 mt-2 line-clamp-2'>
          {item.description || "No description available"}
        </p>

        <div className="card-actions justify-end mt-5">
          <button
            onClick={() => handleViewDetails(item._id)}
            disabled={loadingId === item._id}
            className="btn btn-primary rounded-xl px-6"
          >
            {loadingId === item._id ? (
              <span className="loading loading-bars loading-md"></span>
            ) : (
              'View Details'
            )}
          </button>
        </div>

      </div>
    </div>
  );

  const filteredData = getSortedFiltered(data);
  const filteredProviderData = getSortedFiltered(providerData);

  return (

    <div className='max-w-[1280px] mx-auto px-4 py-10'>

      
      <div className='text-center mb-10'>
        <h1 className='text-5xl font-bold text-gray-800'>
          Our Services
        </h1>
      </div>

      
      <div className="mb-12">
        <div className="bg-white/70 p-6 rounded-3xl shadow-xl flex gap-4">

          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="input input-bordered"
          />

          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="input input-bordered"
          />

          <button
            onClick={() => {
              setMinPrice('');
              setMaxPrice('');
            }}
            className="btn bg-black text-white"
          >
            Clear
          </button>

        </div>
      </div>

      
      <h2 className="text-2xl font-bold mb-5">All Services</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
        {filteredData.length > 0
          ? filteredData.map(item => (
              <ServiceCard key={item._id} item={item} />
            ))
          : (
            <div className="col-span-3 text-center py-16 text-gray-400">
              <p className="text-xl font-semibold">No services found in this price range.</p>
            </div>
          )
        }
      </div>

      
      {user?.email && (
        <>
         

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {filteredProviderData.length > 0
              ? filteredProviderData.map(item => (
                  <ServiceCard key={item._id} item={item} />
                ))
              : (
                <div className="col-span-3 text-center py-16 text-gray-400">
                  <p className="text-xl font-semibold">No services found in this price range.</p>
                </div>
              )
            }
          </div>
        </>
      )}

    </div>
  );
};

export default Services;