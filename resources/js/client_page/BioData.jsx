import React, { useState, useEffect } from "react";
import InputField from "../components/InputField";
import Select from "../components/Select";
import axios from "axios";

const BioData = ({ saveData, initialData }) => {
    const [formData, setFormData] = useState(initialData);
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
      setFormData({ ...formData, [name]: value });
      saveData({ [name]: value });
    };

    const menuItems = [
        { value: "male", name: "Male" },
        { value: "female", name: "Female" },
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
        label="Address"
        type={`text`}
        name="address"
        value={formData.address}
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
    </form>
  );
};

export default BioData;
