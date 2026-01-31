import React from "react";
import { FaStar, FaTools, FaHome, FaUsers } from "react-icons/fa";

const Number = () => {
  const stats = [
    {
      icon: <FaStar className="text-yellow-500 text-3xl" />,
      value: "98%",
      label: "Customer Satisfaction Rate",
    },
    {
      icon: <FaTools className="text-yellow-500 text-3xl" />,
      value: "725,000+",
      label: "Appliance Repairs Completed",
    },
    {
      icon: <FaHome className="text-yellow-500 text-3xl" />,
      value: "170,000+",
      label: "Homes Unlocked",
    },
    {
      icon: <FaUsers className="text-yellow-500 text-3xl" />,
      value: "91%",
      label: "Repeat Customer Rate",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-orange-50 via-white to-yellow-50 py-16">

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-8 text-center"
          >
            <div className="flex justify-center mb-4">
              {item.icon}
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              {item.value}
            </h2>
            <p className="text-gray-600 mt-2 text-sm">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Number;
