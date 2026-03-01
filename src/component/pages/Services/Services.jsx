import React, { useEffect, useState } from 'react';



const Services = () => {

     const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/household')
      .then(res => res.json())
      .then(result => {
        setData(result);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);
   
    return (
        <div className='max-w-[1280px] mx-auto'>
            <div className='grid grid-cols-3 gap-5'>
                {
                    data.map(d => (
                        // <div>{d.serviceName}</div>
                        <div className="card bg-base-100 w-96 shadow-sm">
  <figure >
    <img
    className='max-w-80 max-h-60 p-4'
      src={d.image}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{d.serviceName}</h2>
    <p className='text-amber-600 font-bold '>{d.category}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
                    ))
                }
            </div>
        </div>
    );
};

export default Services;