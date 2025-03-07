import React, { useState, useEffect } from "react";
import axios from "axios";
import SideModal from "../components/SideModal";
import InputField from "../components/InputField";
import Select from "../components/Select";
import toast from "react-hot-toast";

const UserEdit = ({ userData, openModal, setOpenModal, fetchUserData }) => {
    const [countries, setCountries] = useState([]);
    const [formData, setFormData] = useState({
        // Biodata
        first_name: "",
        surname: "",
        gender: "",
        date_of_birth: "",
        nationality: "",
        telephone: "",
        street_name: "",
        house_number: "",
        city: "",
        province: "",
        postal_code: "",
        email: "",

        // Professional Data
        profession: "",
        date_of_payment: "",
        codice_fiscale: "",
        bank_details: "",
        id_type: "",
        loan_purpose: "",

        // Guarantor Data
        guarantor_first_name: "",
        guarantor_surname: "",
        guarantor_telephone: "",
        guarantor_street_name: "",
        guarantor_house_number: "",
        guarantor_city: "",
        guarantor_province: "",
        guarantor_postal_code: "",
        guarantor_id_type: "",
        guarantor_nationality: "",

        // Office Use
        amount: "",
        rate: "",
        total_amount: "",
        number_of_months: "",
    });

  const [isSaving, setIsSaving] = useState(false);

  // Gender Options
    const genderOptions = [
        { value: "Male", name: "Male" },
        { value: "Female", name: "Female" },
    ];
    const idTypes = [
        { value: "Passport", name: "Passport" },
        { value: "Resident Permit", name: "Resident Permit" },
        { value: "Staying Permit", name: "Staying Permit" },
        { value: "Driving License", name: "Driving License" },
    ];
    const professions = [
        { value: "Factory Worker", name: "Factory Worker" },
        { value: "Metal Worker", name: "Metal Worker" },
        { value: "Student", name: "Student" },
        { value: "Businessman", name: "Businessman" },
    ];
    const purposeData = [
        { value: "House advance", name: "House advance" },
        { value: "House decor", name: "House decor" },
        { value: "Personal and Family", name: "Personal and Family" },
        { value: "Business", name: "Business" },
        { value: "Buy used car", name: "Buy used car" },
        { value: "Others", name: "Others" },
    ];

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
  useEffect(() => {
    if (userData) {
      setFormData({
        ...userData
        
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };

    // If amount or number_of_months is updated, recalculate rate and total amount
    if (name === "amount" || name === "number_of_months") {
        const amount = parseFloat(updatedData.amount) || 0;
        const numberOfMonths = parseInt(updatedData.number_of_months, 10) || 0;

        // Calculate the rate based on 10% for each month
        const rate = numberOfMonths > 0 ? ((amount * 0.1 * numberOfMonths) + amount) / numberOfMonths : 0;
        const totalAmount = rate * numberOfMonths;

        updatedData = {
        ...updatedData,
        rate: rate.toFixed(2),
        total_amount: totalAmount.toFixed(2),
        };
    }

    setFormData(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
        const response = await axios.post(`/api/user-data/update/${userData.id}`, formDataToSend, {
            headers: { "Content-Type": "multipart/form-data" },
        });

      toast.success(response.data.message);
      fetchUserData();
      setOpenModal(false);

    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating user data.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SideModal
        title="Edit User"
        setOpenModal={setOpenModal}
        openModal={openModal}
        isSaving={isSaving}
    >
        <form onSubmit={handleSubmit} className="space-y-4 px-4 py-2">
            {/* Biodata Section */}
            <h3 className="text-lg font-semibold">Biodata</h3>
            <InputField label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} />
            <InputField label="Surname" name="surname" value={formData.surname} onChange={handleChange} />
            <InputField type={`email`} label="Email Address" name="email" value={formData.email} onChange={handleChange} />
            <InputField type={`date`} label="Date of birth" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} />
            <Select label="Gender" name="gender" value={formData.gender} onChange={handleChange} menuItems={genderOptions} />
            <Select label="Nationality" name="nationality" value={formData.nationality} onChange={handleChange} menuItems={countries} />
            <Select label="Loan Purpose" name="loan_purpose" value={formData.loan_purpose} onChange={handleChange} menuItems={purposeData} />
            <InputField label="Telephone" name="telephone" value={formData.telephone} onChange={handleChange} />
            <InputField label="Street Name" name="street_name" value={formData.street_name} onChange={handleChange} />
            <InputField label="House Number" name="house_number" value={formData.house_number} onChange={handleChange} />
            <InputField label="City" name="city" value={formData.city} onChange={handleChange} />
            <InputField label="Province" name="province" value={formData.province} onChange={handleChange} />
            <InputField label="Postal Code" name="postal_code" value={formData.postal_code} onChange={handleChange} />
            <InputField label="Province" name="province" value={formData.province} onChange={handleChange} />
            
            {/* Guarantor Data */}
            <h3 className="text-lg font-semibold">Guarantor Data</h3>
            <Select label="Profession" name="profession" value={formData.profession} onChange={handleChange} menuItems={professions} />
            <InputField label="Date of Payment" name="date_of_payment" value={formData.date_of_payment} onChange={handleChange} />
            <InputField label="Codice Fiscale" name="codice_fiscale" value={formData.codice_fiscale} onChange={handleChange} />
            <InputField label="Bank Details" name="bank_details" value={formData.bank_details} onChange={handleChange} />
            <Select label="Guarantor Nationality" name="guarantor_nationality" value={formData.guarantor_nationality} onChange={handleChange} menuItems={countries} />
            <Select label="Guarantor ID Type" name="guarantor_id_type" value={formData.guarantor_id_type} onChange={handleChange} menuItems={idTypes} />
            
            {/* Office Use */}
            <h3 className="text-lg font-semibold">Office Use</h3>
            <InputField label="Amount" name="amount" value={formData.amount} onChange={handleChange} />
            <InputField label="Number of Month" name="number_of_month" value={formData.number_of_month} onChange={handleChange} />
            <InputField label="Rate" name="rate" value={formData.rate} disabled />
            <InputField label="Total Amount" name="total_amount" value={formData.total_amount} disabled />

            {/* Submit Button */}
            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-sm hover:bg-blue-700 transition">
            {isSaving ? (
                <div className="flex items-center gap-2">
                    <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></div>
                    <span>Saving...</span>
                </div>
            ) : (
                "Save Changes"
            )}
            </button>
        </form>
    </SideModal>
  );
};

export default UserEdit;
