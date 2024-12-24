import React, { Component } from "react";

class Modal extends Component {
    render() {
        const { 
            closeModal, 
            title, 
            onSubmit, 
            width, 
            children, 
            command, 
            backColor, 
            isSaving = false // Add isSaving prop with a default value
        } = this.props;

        return (
            <div className="fixed z-50 inset-0 overflow-y-auto px-2">
                <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-60"></div>
                <form onSubmit={onSubmit} className="flex items-center justify-center min-h-screen">
                    <div className={`${width} relative bg-white shadow-lg rounded-md`}>
                        {/* Header */}
                        <div className={`flex justify-between ${backColor} text-white`}>
                            <h2 className="text-xl font-medium py-2 px-4 uppercase">{title}</h2>
                            <button 
                                onClick={closeModal} 
                                className="px-4 hover:text-gray-200"
                                disabled={isSaving} // Disable close button while saving
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-x-lg w-6 h-6" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                                </svg>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col space-y-4 p-6">
                            {children}
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end mt-4 gap-x-2 mb-3 mr-3">
                            <button 
                                onClick={closeModal} 
                                type="button" 
                                className="text-sm text-gray-400 border px-4 py-2 uppercase"
                                disabled={isSaving} // Disable cancel button while saving
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className={`text-sm text-white ${backColor} hover:bg-blue px-6 py-2 uppercase flex items-center justify-center`}
                                disabled={isSaving} // Disable submit button while saving
                            >
                                {isSaving ? (
                                    <>
                                        <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></div>
                                        <span className="ml-2">Processing...</span>
                                    </>
                                ) : (
                                    command
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Modal;
