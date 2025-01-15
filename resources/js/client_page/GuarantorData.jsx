import React, { useState, useEffect } from "react";
import InputField from "../components/InputField";
import Select from "../components/Select";
import axios from "axios";

const GuarantorData = ({ initialData, saveData }) => {
  const [guarantorIdCardFront, setGuarantorIdCardFront] = useState(initialData.guarantor_idcard_front || null);
  const [guarantorIdCardBack, setGuarantorIdCardBack] = useState(initialData.guarantor_idcard_back || null);
  const [selectedCert, setSelectedCert] = useState(initialData.guarantor_signature || null);
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const fetchCountries = async () => {
        try {
            const response = await axios.get("https://countriesnow.space/api/v0.1/countries/capital");
            const countriesData = response.data.data
            setCountries(countriesData);
        } catch (error) {
            console.error(error);
        }
    };
    fetchCountries();
}, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    saveData({ [name]: value });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === "guarantor_idcard_front") {
      setGuarantorIdCardFront(file);
      saveData({ guarantor_idcard_front: file });
    } else if (type === "guarantor_idcard_back") {
      setGuarantorIdCardBack(file);
      saveData({ guarantor_idcard_back: file });
    }
  };

  const idTypes = [
    { value: "Passport", name: "Passport" },
    { value: "Resident Permit", name: "Resident Permit" },
    { value: "Staying Permit", name: "Staying Permit" },
    { value: "Driving License", name: "Driving License" },
  ];

  return (
    <form className="grid lg:grid-cols-2 gap-4">
      <InputField
        label="First Name"
        type="text"
        name="guarantor_first_name"
        value={initialData.guarantor_first_name}
        onChange={handleChange}
      />
      <InputField
        label="Surname"
        type="text"
        name="guarantor_surname"
        value={initialData.guarantor_surname}
        onChange={handleChange}
      />
      <InputField
        label="Telephone Number"
        type="text"
        name="guarantor_telephone"
        value={initialData.guarantor_telephone}
        onChange={handleChange}
      />
      <InputField
        label="Street Name"
        type="text"
        name="guarantor_street_name"
        value={initialData.guarantor_street_name}
        onChange={handleChange}
      />
      <InputField
        label="House Number"
        type="text"
        name="guarantor_house_number"
        value={initialData.guarantor_house_number}
        onChange={handleChange}
      />
      <InputField
        label="City"
        type="text"
        name="guarantor_city"
        value={initialData.guarantor_city}
        onChange={handleChange}
      />
      <InputField
        label="Province"
        type="text"
        name="guarantor_province"
        value={initialData.guarantor_province}
        onChange={handleChange}
      />
      <InputField
        label="Postal Code"
        type="text"
        name="guarantor_postal_code"
        value={initialData.guarantor_postal_code}
        onChange={handleChange}
      />
      <Select
        label="Select ID Type"
        name="guarantor_id_type"
        value={initialData.guarantor_id_type}
        onChange={handleChange}
        menuItems={idTypes}
      />
      <Select
        label="Select Nationality"
        name="guarantor_nationality"
        value={initialData.guarantor_nationality}
        onChange={handleChange}
        menuItems={countries}
      />
      <div className="w-full">
        <h4 className="text-sm mb-1 font-medium">
          Guarantor Signature
        </h4>
        <div className="relative w-full flex items-center overflow-hidden border border-blue-200 text-gray-900 text-sm rounded-sm bg-gray-50 py-2.5">
          <input
            type="file"
            id="certFile"
            accept=".png, .jpg, .jpeg"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setSelectedCert(file);
                saveData({ guarantor_signature: file });
              }
            }}
            className="w-full h-full px-4 text-sm focus:outline-none py-2 absolute left-0 right-0 bottom-0 top-0 hidden"
          />
          <label
            htmlFor="certFile"
            className="absolute right-2 absolute-pos-items-center cursor-pointer"
          >
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="text-black w-6 h-6" viewBox="0 0 32 32"><path d="M16 13l-5 5l1.41 1.41L15 16.83V28H6v2h9a2 2 0 0 0 2-2V16.83l2.59 2.58L21 18z" fill="currentColor"></path><path d="M23.5 22H23v-2h.5a4.497 4.497 0 0 0 .356-8.981l-.815-.064l-.099-.812a6.994 6.994 0 0 0-13.883 0l-.1.812l-.815.064A4.497 4.497 0 0 0 8.5 20H9v2h-.5A6.497 6.497 0 0 1 7.2 9.136a8.994 8.994 0 0 1 17.6 0A6.497 6.497 0 0 1 23.5 22z" fill="currentColor"></path></svg>
          </label>
          <h4 className="pl-2 text-sm overflow-hidden">
            {/* Render the file name if selected, otherwise show the placeholder */}
            {selectedCert ? selectedCert.name : "Browse to upload file"}
          </h4>
        </div>
        <h4 className="text-[0.7rem] text-right">
          <span className="text-[#ff0404]">Accepted Formats</span> jpg, jpeg, png
        </h4>
      </div>
      <div className=""></div>
      <div className="w-[100%] h-[8rem] mb-4">
        <h4 className="text-[0.9rem] mb-[0.4rem] font-semibold">ID Card Front</h4>
        <div className="w-full h-full flex justify-center items-center rounded-[0.6rem] border">
          <label
            htmlFor="guarantorIdCardFront"
            className="md:text-[0.9vw] text-[3vw] flex-col flex justify-center items-center cursor-pointer text-center"
          >
            {guarantorIdCardFront ? (
              <div className="md:w-[4vw] w-[15vw] md:h-[4vw] h-[15vw]">
                <img
                  src={URL.createObjectURL(guarantorIdCardFront)}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="md:w-[4vw] w-[15vw] md:h-[4vw] h-[15vw]">
                <img
                  src="/images/upload-t.svg"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <input
              type="file"
              id="guarantorIdCardFront"
              className="hidden"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => handleFileChange(e, "guarantor_idcard_front")}
            />
            Browse to Upload file or image
          </label>
        </div>
      </div>
      <div className="w-[100%] h-[8rem] mb-4">
        <h4 className="text-[0.9rem] mb-[0.4rem] font-semibold">ID Card Back</h4>
        <div className="w-full h-full flex justify-center items-center rounded-[0.6rem] border">
          <label
            htmlFor="guarantorIdCardBack"
            className="md:text-[0.9vw] text-[3vw] flex-col flex justify-center items-center cursor-pointer text-center"
          >
            {guarantorIdCardBack ? (
              <div className="md:w-[4vw] w-[15vw] md:h-[4vw] h-[15vw]">
                <img
                  src={URL.createObjectURL(guarantorIdCardBack)}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="md:w-[4vw] w-[15vw] md:h-[4vw] h-[15vw]">
                <img
                  src="/images/upload-t.svg"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <input
              type="file"
              id="guarantorIdCardBack"
              className="hidden"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => handleFileChange(e, "guarantor_idcard_back")}
            />
            Browse to Upload file or image
          </label>
        </div>
      </div>
    </form>
  );
};

export default GuarantorData;
