import React from "react";

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between mb-8 w-full">
        {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center relative w-full">
            {/* Circle */}
            <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 border-white shadow-md shadow-gray-400 text-white ${
                index < currentStep ? "bg-green-500" : index === currentStep ? "bg-blue-500" : "bg-gray-300"
                }`}
            >
                {index < currentStep ? (
                <span className="text-white text-base font-bold">✓</span>
                ) : (
                <span className="text-sm">{index + 1}</span>
                )}
            </div>
            {/* Label */}
            <span
                className={`mt-2 text-sm ${
                index <= currentStep ? "text-blue-500 font-medium" : "text-gray-500"
                }`}
            >
                {step}
            </span>
            {/* Line */}
            {index < steps.length - 1 && (
                <div
                className="absolute top-5 left-full h-0.5 bg-gray-300 w-full"
                style={{
                    zIndex: 1,
                    transform: "translateX(-50%)",
                    width: "calc(100% - 2.5rem)",
                    backgroundColor: index < currentStep ? "green" : "gray",
                }}
                ></div>
            )}
            </div>
        ))}
    </div>



  );
};

export default Stepper;
