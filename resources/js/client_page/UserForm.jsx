import React, { useState } from "react";
import Stepper from "../components/Stepper";
import BioData from "./BioData";
import ProfessionalData from "./ProfessionalData";
import GuarantorData from "./GuarantorData";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const UserForm = () => {
  const steps = ["Biodata", "Professional Data", "Guarantor Data"];
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    biodata: { first_name: "", surname: "", gender: "", date_of_birth: "", nationality: "", address: "", telephone: "", email: "" },
    professionalData: { profession: "", date_of_payment: "",  codice_fiscale: "", id_type: "",  idcard_front: "", idcard_back: "", bank_details: "" },
    guarantorData: { guarantor_first_name: "", 
                    guarantor_surname: "", guarantor_telephone: "", 
                    guarantor_street_name: "", guarantor_house_number: "", 
                    guarantor_city: "", guarantor_province: "",
                    guarantor_postal_code: "", guarantor_id_type: "", 
                    guarantor_idcard_front: "", guarantor_idcard_back: "" },
  });
  const navigate = useNavigate();

  const saveData = (step, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [step]: { ...prevData[step], ...data },
    }));
  };

    const handleNext = () => {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePrevious = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const formDataToSend = new FormData();

        // Append biodata fields
        Object.entries(formData.biodata).forEach(([key, value]) => {
            formDataToSend.append(key, value);
        });

        // Append professional data fields
        Object.entries(formData.professionalData).forEach(([key, value]) => {
            if (key === "idcard_front" || key === "idcard_back") {
                if (value) formDataToSend.append(key, value);
            } else {
                formDataToSend.append(key, value);
            }
        });

        // Append guarantor data fields
        Object.entries(formData.guarantorData).forEach(([key, value]) => {
            formDataToSend.append(key, value);
        });

        try {
            
            const response = await axios.post("/api/upload/user-forms", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        toast.success(response.data.message)
        setIsLoading(false)
            // Reset form fields
        setFormData({
            biodata: {
                first_name: "",
                surname: "",
                gender: "",
                date_of_birth: "",
                nationality: "",
                address: "",
                telephone: "",
                email: "",
            },
            professionalData: {
                profession: "",
                date_of_payment: "",
                codice_fiscale: "",
                id_type: "",
                idcard_front: "",
                idcard_back: "",
                bank_details: "",
            },
            guarantorData: {
                guarantor_first_name: "",
                guarantor_surname: "",
                guarantor_telephone: "",
                guarantor_street_name: "",
                guarantor_house_number: "",
                guarantor_city: "",
                guarantor_province: "",
                guarantor_postal_code: "",
                guarantor_id_type: "",
                guarantor_idcard_front: "",
                guarantor_idcard_back: "",
            },
        });

        // Navigate to congrats page
        navigate("/congrats");
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };


  return (
    <div className="w-full flex justify-center bg-gray-100 min-h-screen lg:py-6">
        <div className="w-full lg:w-2/3 bg-white shadow-md shadow-gray-400 p-6 lg:p-10">
            <div className="flex flex-col lg:flex-row items-center lg:space-x-8 lg:p-8 border-b mb-4">
                <img src="/images/uniqLogo.png" alt="" className="w-32 h-32"/>
                <div className="text-gray-700 text-center lg:text-left">
                    <p className="text-xl lg:text-2xl font-bold">Customer Credit Application Forms</p>
                    <p>Brescia, Italy</p>
                </div>
            </div>
            <Stepper steps={steps} currentStep={currentStep} />

            <div className="mb-6">
                {currentStep === 0 && 
                <BioData
                    saveData={(data) => saveData("biodata", data)}
                    initialData={formData.biodata}
                />}
                {currentStep === 1 &&
                <ProfessionalData
                    saveData={(data) => saveData("professionalData", data)}
                    initialData={formData.professionalData}
                />}
                {currentStep === 2 &&
                    <GuarantorData
                    saveData={(data) => saveData("guarantorData", data)}
                    initialData={formData.guarantorData}
                />}
            </div>

            <div className="flex justify-between">
                <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`py-2 px-4 text-sm font-semibold text-white rounded-full ${
                    currentStep === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
                }`}
                >
                Previous
                </button>

                {currentStep < steps.length - 1 ? (
                <button
                    onClick={handleNext}
                    className="py-2 px-6 text-sm font-semibold bg-blue-500 text-white rounded-full"
                >
                    Next
                </button>
                ) : (
                <button
                    type="button"
                    onClick={handleSubmit}
                    className={`py-2 px-6 text-sm font-semibold rounded-full flex items-center justify-center text-white ${
                        isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500"
                    }`}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></div>
                            <span>Submitting...</span>
                        </div>
                    ) : (
                        "Submit"
                    )}
                </button>
                
                )}
            </div>
        </div>
        
    </div>
  );
};

export default UserForm;