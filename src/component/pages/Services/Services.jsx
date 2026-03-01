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
        <div>
            <div>
                {
                    data.map(d => (
                        <div>{d.serviceName}</div>
                    ))
                }
            </div>
        </div>
    );
};

export default Services;