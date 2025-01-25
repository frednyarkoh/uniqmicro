import React, { useEffect, useState } from "react";
import SideModal from "@/components/SideModal";
import moment from "moment";
import axios from "axios";

function UserDetails({ setOpenModal, openModal, userData }) {
  const initialUserInput = {
    first_name: "",
    surname: "",
  };

  const [userInput, setUserInput] = useState(initialUserInput);
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    if (openModal) {
      setUserInput(userData || initialUserInput); // Populate with userData or reset
    }
  }, [openModal, userData]);

  const handleDownloadPDF = async () => {
    setIsPrinting(true)
    const userId = userInput.id;
    try {
      const response = await axios.get(`/api/user-forms/${userId}/download-pdf`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `user_form_${userId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      setIsPrinting(false)
    } catch (error) {
      setIsPrinting(false)
      console.error("Error downloading the PDF:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted User Input: ", userInput);
    setOpenModal(false);
  };

  return (
    <SideModal
      title="User Details"
      setOpenModal={setOpenModal}
      openModal={openModal}
      onClick={handleDownloadPDF}
      isPrinting={isPrinting}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full overflow-auto"
      >
        <div className="flex flex-col">
          <div className="bg-yellow-100 w-full flex justify-between py-2 px-2">
            <p className="font-semibold">Date of filling forms</p>
            <p>
            {userInput?.created_at
              ? new Date(userInput.created_at).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true, // Use `false` for 24-hour format
                })
              : "N/A"}
          </p>

          </div>
          <div className="pl-4 pt-4">

          
            <div className="grid grid-cols-3 gap-y-4 gap-x-2 border-b pb-4">
              <div className="text-gray-500">
                Full Name
              </div>
              <div className="col-span-2">
                {userInput?.first_name} {userInput?.surname}
              </div>
              <div className="text-gray-500">
                Gender
              </div>
              <div className="col-span-2">
                {userInput.gender}
              </div>
              <div className="text-gray-500">
                Date of Birth
              </div>
              <div className="col-span-2">
                {moment(userInput?.date_of_birth).format("Do MMMM, YYYY")}
              </div>
              <div className="text-gray-500">
                Nationality
              </div>
              <div className="col-span-2">
                {userInput?.nationality || "N/A"}
              </div>
              <div className="text-gray-500">
                Street Name
              </div>
              <div className="col-span-2">
                {userInput?.street_name || "N/A"}
              </div>
              <div className="text-gray-500">
                House Number
              </div>
              <div className="col-span-2">
                {userInput?.house_number || "N/A"}
              </div>
              <div className="text-gray-500">
                City
              </div>
              <div className="col-span-2">
                {userInput?.city || "N/A"}
              </div>
              <div className="text-gray-500">
                Province
              </div>
              <div className="col-span-2">
                {userInput?.province || "N/A"}
              </div>
              <div className="text-gray-500">
                Postal Code
              </div>
              <div className="col-span-2">
                {userInput?.postal_code || "N/A"}
              </div>
              <div className="text-gray-500">
                Telephone
              </div>
              <div className="col-span-2">
                {userInput?.telephone || "N/A"}
              </div>
              <div className="text-gray-500">
                Email
              </div>
              <div className="col-span-2">
              {userInput?.email}
              </div>
            </div>
            <div className="pt-4">
              <p className="font-semibold mb-4 text-base">Other Info</p>
              <div className="grid grid-cols-3 gap-y-4 border-b pb-4">
                <div className="text-gray-500">
                  Profession
                </div>
                <div className="col-span-2">
                  {userInput?.profession}
                </div>
                <div className="text-gray-500">
                  Date of Payment
                </div>
                <div className="col-span-2 text-sm">
                  {userInput?.date_of_payment}
                </div>
                <div className="text-gray-500">
                Codice Fiscale
                </div>
                <div className="col-span-2">
                  {userInput?.codice_fiscale}
                </div>
                <div className="text-gray-500">
                IBAN NUMBER
                </div>
                <div className="col-span-2">
                  {userInput?.bank_details}
                </div>
                <div className="text-gray-500">
                ID Type
                </div>
                <div className="col-span-2">
                  {userInput?.id_type}
                </div>
              </div>
            </div>
            <div className="py-4">
              <p className="font-semibold mb-4 text-base">Guarantor Info</p>
              <div className="grid grid-cols-3 gap-y-4 border-b pb-4">
                <div className="text-gray-500">
                  Full Name
                </div>
                <div className="col-span-2">
                  {userInput?.guarantor_first_name} {userInput?.guarantor_surname}
                </div>
                <div className="text-gray-500">
                  Telephone
                </div>
                <div className="col-span-2">
                  {userInput?.guarantor_telephone}
                </div>
                <div className="text-gray-500">
                Street Name
                </div>
                <div className="col-span-2">
                  {userInput?.guarantor_street_name}
                </div>
                <div className="text-gray-500">
                House Number
                </div>
                <div className="col-span-2">
                  {userInput?.guarantor_house_number}
                </div>
                <div className="text-gray-500">
                City
                </div>
                <div className="col-span-2">
                  {userInput?.guarantor_city}
                </div>
                <div className="text-gray-500">
                Province
                </div>
                <div className="col-span-2">
                  {userInput?.guarantor_province}
                </div>
                <div className="text-gray-500">
                Postal Code
                </div>
                <div className="col-span-2">
                  {userInput?.guarantor_postal_code}
                </div>
                <div className="text-gray-500">
                ID Type
                </div>
                <div className="col-span-2">
                  {userInput?.guarantor_id_type}
                </div>
              </div>
            </div>
            <div className="pb-4">
              <p className="font-semibold mb-4 text-base">Office Use</p>
              <div className="grid grid-cols-3 gap-y-4 border-b pb-4">
                <div className="text-gray-500">
                  Principal Amount
                </div>
                <div className="col-span-2">
                  {userInput?.amount}
                </div>
                <div className="text-gray-500">
                  Duration
                </div>
                <div className="col-span-2">
                  {userInput?.number_of_months}
                </div>
                <div className="text-gray-500">
                  Rate per month
                </div>
                <div className="col-span-2">
                  {userInput?.rate}
                </div>
                <div className="text-gray-500">
                  Total Amount
                </div>
                <div className="col-span-2">
                  {userInput?.total_amount}
                </div>
              </div>
            </div>
            <div className="pb-4">
              <p className="font-semibold mb-4 text-base">Uploads</p>
              <div className="grid grid-cols-2 gap-y-4 border-b pb-4">
                
                <div className="text-gray-500">
                ID Card Front
                </div>
                <div className="col-span-2 w-full h-auto bg-gray-200 border rounded-md">
                  <img src={userInput?.idcard_front_url} alt="" />
                </div>
                <div className="text-gray-500">
                ID Card Back
                </div>
                <div className="col-span-2 w-full h-auto bg-gray-200 border rounded-md">
                  <img src={userInput?.idcard_back_url} alt="" />
                </div>
                <div className="text-gray-500">
                Applicant Signature
                </div>
                <div className="col-span-2 w-full h-auto bg-gray-200 border rounded-md">
                  <img src={userInput?.applicant_signature_url} alt="" />
                </div>
                <div className="text-gray-500">
                Guarantor ID Card Front
                </div>
                <div className="col-span-2 w-full h-auto bg-gray-200 border rounded-md">
                  <img src={userInput?.guarantor_idcard_front_url} alt="" />
                </div>
                <div className="text-gray-500">
                Guarantor ID Card Back
                </div>
                <div className="col-span-2 w-full h-auto bg-gray-200 border rounded-md">
                  <img src={userInput?.guarantor_idcard_back_url} alt="" />
                </div>
                <div className="text-gray-500">
                Guarantor Signature
                </div>
                <div className="col-span-2 w-full h-auto bg-gray-200 border rounded-md">
                  <img src={userInput?.guarantor_signature_url} alt="" />
                </div>
              </div>
            </div>
          </div>
          </div>
        
      </form>
    </SideModal>
  );
}

export default UserDetails;
