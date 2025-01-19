import React, { useState } from "react";
import Stepper from "../components/Stepper";
import BioData from "./BioData";
import ProfessionalData from "./ProfessionalData";
import GuarantorData from "./GuarantorData";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import OfficeUse from "./OfficeUse";

const UserForm = () => {
  const steps = ["Biodata", "Professional Data", "Guarantor Data", "Office Use"];
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    biodata: { first_name: "", surname: "", gender: "", date_of_birth: "", nationality: "", telephone: "", email: "", house_number: "", applicant_signature: "",
        street_name: "",
        city: "",
        province: "",
        postal_code: "", },
    professionalData: { profession: "", date_of_payment: "",  codice_fiscale: "", id_type: "",  idcard_front: "", idcard_back: "", bank_details: "", loan_purpose: "" },
    guarantorData: { guarantor_first_name: "", 
                    guarantor_surname: "", guarantor_telephone: "", 
                    guarantor_street_name: "", guarantor_house_number: "", 
                    guarantor_city: "", guarantor_province: "",
                    guarantor_postal_code: "", guarantor_id_type: "", 
                    guarantor_idcard_front: "", guarantor_idcard_back: "", guarantor_nationality: "", guarantor_signature: "" },
    officeData: {amount: "", rate: "", total_amount: ""}
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

        // Append office use fields
        Object.entries(formData.officeData).forEach(([key, value]) => {
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
                house_number: "",
                street_name: "",
                city: "",
                province: "",
                postal_code: "",
                telephone: "",
                email: "",
                applicant_signature: "",
            },
            professionalData: {
                profession: "",
                date_of_payment: "",
                codice_fiscale: "",
                id_type: "",
                idcard_front: "",
                idcard_back: "",
                bank_details: "",
                loan_purpose: "",
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
                guarantor_nationality: "",
                guarantor_signature: "",
            },
            officeData: {amount: "", rate: "", total_amount: ""}
        });

        // Navigate to congrats page
        navigate("/congrats");
        } catch (error) {
            toast.error(error?.response?.data?.message);
            setIsLoading(false)
        }
    };


  return (
    <div className="w-full relative flex flex-col justify-center bg-white min-h-screen">
        <div className="fixed w-full top-0 flex bg-white py-1.5 px-4 shadow-md z-50 shadow-gray-400">
            <div className="flex items-center space-x-2">
                <img src="/images/uniqLogo.png" alt="" className="w-12"/>
                <div className="font-bold text-[#08446A]">
                    <p className="-mb-1 text-xl">UNIQ MICRO</p>
                    <p className="text-sm font-semibold">CREDIT SRL, <span>Brescia - Italy</span></p>
                </div>
            </div>
        </div>
        <img src="/images/125.jpg" alt="" className="w-full fixed top-12"/>
        
        <div className="w-full flex justify-center z-20 mt-24 px-2">
            <div className="w-full lg:w-4/5 xl:w-2/3 bg-white border mb-5">
                <div className="w-full flex flex-col items-center border-b mb-4">
                    
                    <div className="w-full text-white bg-[#08446A] text-center py-1">
                        <p className="text-xl lg:text-2xl font-bold">Loan Application Forms</p>
                        <p className="text-sm">Submission form for Customers</p>
                    </div>
                </div>
                <Stepper steps={steps} currentStep={currentStep} className="w-full"/>

                <div className="mb-6 px-8">
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
                    {currentStep === 3 &&
                        <OfficeUse
                        saveData={(data) => saveData("officeData", data)}
                        initialData={formData.officeData}
                    />}
                </div>

                <div className="flex justify-between px-8 pb-8">
                    <button
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className={`py-2 px-4 text-sm font-semibold text-white rounded-full ${
                        currentStep === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-[#08446A]"
                    }`}
                    >
                    Previous
                    </button>

                    {currentStep < steps.length - 1 ? (
                    <button
                        onClick={handleNext}
                        className="py-2 px-6 text-sm font-semibold bg-[#08446A] text-white rounded-full"
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
        
        
    </div>
  );
};

export default UserForm;
