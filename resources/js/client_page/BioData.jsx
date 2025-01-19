import React, { useState, useEffect } from "react";
import InputField from "../components/InputField";
import Select from "../components/Select";
import axios from "axios";

const BioData = ({ saveData, initialData }) => {
    const [formData, setFormData] = useState(initialData);
    const [countries, setCountries] = useState([]);
    const [selectedCert, setSelectedCert] = useState(initialData.applicant_signature || null);

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
      setFormData({ ...formData, [name]: value });
      saveData({ [name]: value });
    };

    const menuItems = [
        { value: "Male", name: "Male" },
        { value: "Female", name: "Female" },
    ];
  return (
    <form className="grid lg:grid-cols-2 gap-4">
     
      <InputField
        label="First Name"
        type={`text`}
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
      />
      <InputField
        label="Surname"
        type={`text`}
        name="surname"
        value={formData.surname}
        onChange={handleChange}
      />
      <Select
        label="Select Gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        menuItems={menuItems}
      />
      <InputField
        label="Date of Birth"
        type={`date`}
        name="date_of_birth"
        value={formData.date_of_birth}
        onChange={handleChange}
      />
      <Select
        label="Select Nationality"
        name="nationality"
        value={formData.nationality}
        onChange={handleChange}
        menuItems={countries}
      />
      <InputField
        label="Street Name"
        type="text"
        name="street_name"
        value={formData.street_name}
        onChange={handleChange}
      />
      <InputField
        label="House Number"
        type="text"
        name="house_number"
        value={formData.house_number}
        onChange={handleChange}
      />
      <InputField
        label="City"
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
      />
      <InputField
        label="Province"
        type="text"
        name="province"
        value={formData.province}
        onChange={handleChange}
      />
      <InputField
        label="Postal Code"
        type="text"
        name="postal_code"
        value={formData.postal_code}
        onChange={handleChange}
      />
      <InputField
        label="Telephone Number"
        type={`text`}
        name="telephone"
        value={formData.telephone}
        onChange={handleChange}
      />
      <InputField
        label="Email Address"
        type={`email`}
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <div className="w-full">
        <h4 className="text-sm mb-1 font-medium">
          Applicant Signature
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
                saveData({ applicant_signature: file });
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
            {selectedCert ? selectedCert.name : "Browse to upload file"}
          </h4>
        </div>
        <h4 className="text-[0.7rem] text-right">
          <span className="text-[#ff0404]">Accepted Formats</span> jpg, jpeg, png
        </h4>
      </div>
    </form>
  );
};

export default BioData;
