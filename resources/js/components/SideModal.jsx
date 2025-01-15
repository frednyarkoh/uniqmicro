import React, { useEffect } from "react";

const SideModal = ({ title, children, setOpenModal, openModal }) => {
  const onClose = () => {
    setOpenModal(false); // Close the modal
  };

  useEffect(() => {
    document.body.style.overflowY = openModal ? "hidden" : "auto";
  }, [openModal]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-[1000] transition-opacity ${
          openModal ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        className={`fixed right-0 top-0 bottom-0 md:w-[45vw] lg:w-[38vw] w-full bg-white overflow-y-auto pb-[2vw] z-[1001] transition-transform duration-700 ${
          openModal ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="tab-container">
          <div className="flex flex-col sticky top-0 z-[44]">
            <div className="flex border-b-2 border-[#DADADA] items-center justify-between md:px-[1vw] px-[5vw] py-[4%] bg-[#08446A] text-white">
              <h4 className="font-[600] ">{title}</h4>
              <button
                onClick={onClose}
                className="new-btn md:w-[2vw] md:h-[2vw] h-[10vw] w-[10vw] rounded-[50%] flex justify-center items-center border-2 border-[#fff] sticky top-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-x-lg w-3 h-3" viewBox="0 0 16 16">
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
              </button>
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default SideModal;
