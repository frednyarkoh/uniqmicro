import React, { useState } from "react";
import InputField from "../components/InputField";
import Select from "../components/Select";

const GuarantorData = ({ initialData, saveData }) => {
  const [guarantorIdCardFront, setGuarantorIdCardFront] = useState(initialData.guarantor_idcard_front || null);
  const [guarantorIdCardBack, setGuarantorIdCardBack] = useState(initialData.guarantor_idcard_back || null);

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
