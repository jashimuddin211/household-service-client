import React from "react";
import { FaCalendarAlt, FaUserCheck, FaUmbrellaBeach, FaFileInvoiceDollar } from "react-icons/fa";

const steps = [
  {
    id: 1,
    title: "Book Your Service in Minutes",
    desc: "Choose a convenient date and time, specify your needs, and browse our services or describe your project.",
    icon: <FaCalendarAlt />,
  },
  {
    id: 2,
    title: "Get the Right Expert for Every Job",
    desc: "We’ll send you a qualified, background-checked technician based on skill, experience, and availability.",
    icon: <FaUserCheck />,
  },
  {
    id: 3,
    title: "Relax While We Handle the Job",
    desc: "Expert arrives on time, ready to work efficiently. Enjoy peace of mind while we manage the task.",
    icon: <FaUmbrellaBeach />,
  },
  {
    id: 4,
    title: "Seamless from Start to Finish",
    desc: "Once complete, easily chat, pay, and review—all in our streamlined app with synced updates.",
    icon: <FaFileInvoiceDollar />,
  },
];

const ProcessSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Heading */}
        <h2 className="text-center text-2xl md:text-3xl font-bold text-orange-600 mb-14">
          Getting Things Done Just Got Easier with Local Home Services
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-8 text-center"
            >
              <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center rounded-md border border-orange-400 text-orange-500 text-2xl">
                {step.icon}
              </div>

              <h3 className="text-lg font-semibold mb-4">
                {step.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProcessSection;
