import React, { useState } from "react";
import Select from "../components/Select";
import InputField from "../components/InputField";

const ProfessionalData = ({ initialData, saveData }) => {
    const [idCardFront, setIdCardFront] = useState(initialData.idcard_front || null);
    const [idCardBack, setIdCardBack] = useState(initialData.idcard_back || null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        saveData({ [name]: value });
    };

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (type === "idcard_front") {
            setIdCardFront(file);
            saveData({ idcard_front: file });
        } else if (type === "idcard_back") {
            setIdCardBack(file);
            saveData({ idcard_back: file });
        }
    };

    const professions = [
        { value: "Factory Worker", name: "Factory Worker" },
        { value: "Metal Worker", name: "Metal Worker" },
        { value: "Student", name: "Student" },
        { value: "Businessman", name: "Businessman" },
    ];

    const idTypes = [
        { value: "Passport", name: "Passport" },
        { value: "Resident Permit", name: "Resident Permit" },
        { value: "Staying Permit", name: "Staying Permit" },
        { value: "Driving License", name: "Driving License" },
    ];

    const purposeData = [
        { value: "House advance", name: "House advance" },
        { value: "House decor", name: "House decor" },
        { value: "Personal and Family", name: "Personal and Family" },
        { value: "Business", name: "Business" },
        { value: "Buy used car", name: "Buy used car" },
        { value: "Others", name: "Others" },
    ];

    return (
        <form className="grid lg:grid-cols-2 gap-4 mb-6">
            <Select
                label="Select Profession"
                name="profession"
                value={initialData.profession}
                onChange={handleChange}
                menuItems={professions}
            />
            <InputField
                label="Date of Payment"
                type="date"
                name="date_of_payment"
                value={initialData.date_of_payment}
                onChange={handleChange}
            />
            <InputField
                label="Codice Fiscale"
                type="text"
                name="codice_fiscale"
                value={initialData.codice_fiscale}
                onChange={handleChange}
            />
            <InputField
                label="IBAN Number"
                type="text"
                name="bank_details"
                value={initialData.bank_details}
                onChange={handleChange}
            />
            <Select
                label="Select ID Type"
                name="id_type"
                value={initialData.id_type}
                onChange={handleChange}
                menuItems={idTypes}
            />
            <Select
                label="Purpose for Loan"
                name="loan_purpose"
                value={initialData.loan_purpose}
                onChange={handleChange}
                menuItems={purposeData}
            />
            <div className="w-[100%] h-[8rem] mb-4">
                <h4 className="text-[0.9rem] mb-[0.4rem] font-semibold">ID Card Front</h4>
                <div className="w-full h-full flex justify-center items-center rounded-[0.6rem] border">
                    <label
                        htmlFor="idCardFront"
                        className="md:text-[0.9vw] text-[3vw] flex-col flex justify-center items-center cursor-pointer text-center"
                    >
                        {idCardFront ? (
                            <div className="md:w-[4vw] w-[15vw] md:h-[4vw] h-[15vw]">
                                <img
                                    src={URL.createObjectURL(idCardFront)}
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
                            id="idCardFront"
                            className="hidden"
                            accept=".jpg, .jpeg, .png"
                            onChange={(e) => handleFileChange(e, "idcard_front")}
                        />
                        Browse to Upload file or image
                    </label>
                </div>
            </div>
            <div className="w-[100%] h-[8rem] mb-4">
                <h4 className="text-[0.9rem] mb-[0.4rem] font-semibold">ID Card Back</h4>
                <div className="w-full h-full flex justify-center items-center rounded-[0.6rem] border">
                    <label
                        htmlFor="idCardBack"
                        className="md:text-[0.9vw] text-[3vw] flex-col flex justify-center items-center cursor-pointer text-center"
                    >
                        {idCardBack ? (
                            <div className="md:w-[4vw] w-[15vw] md:h-[4vw] h-[15vw]">
                                <img
                                    src={URL.createObjectURL(idCardBack)}
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
                            id="idCardBack"
                            className="hidden"
                            accept=".jpg, .jpeg, .png"
                            onChange={(e) => handleFileChange(e, "idcard_back")}
                        />
                        Browse to Upload file or image
                    </label>
                </div>
            </div>
        </form>
    );
};

export default ProfessionalData;
