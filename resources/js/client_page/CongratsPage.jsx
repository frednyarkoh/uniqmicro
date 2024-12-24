import React from "react";
import UserData from "../admin_page/UserData";

const CongratsPage = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="text-center">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <h1 className="text-4xl font-bold text-green-500">🎉 Congratulations! 🎉</h1>
                    <div className="bg-green-500 text-white p-6 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-check2-circle w-12 h-12" viewBox="0 0 16 16">
                        <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                        <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                    </svg>
                    </div>
                </div>
                
                <p className="mt-4 text-lg font-medium">Your form has been successfully submitted.</p>
                <div className="flex space-x-4">
                    <a href="/" className="mt-6 inline-block px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg">
                        Go Back to Home
                    </a>
                    <a href="/user-data" className="mt-6 inline-block px-6 py-2 bg-green-600 text-white font-semibold rounded-lg">
                        View User Data
                    </a>
                </div>
                
            </div>
        </div>
    );
};

export default CongratsPage;
