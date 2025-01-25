import React, { useState } from "react";
import InputField from "../components/InputField";

const OfficeUse = ({ saveData, initialData }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };

    if (name === "amount" || name === "number_of_months") {
        const amount = parseFloat(updatedData.amount) || 0;
        const numberOfMonths = parseInt(updatedData.number_of_months, 10) || 0;

        // Calculate the rate based on 10% for each month
        const rate = ((amount * 0.1 * numberOfMonths) + amount) / numberOfMonths;
        const totalAmount = rate * numberOfMonths;

        updatedData = {
            ...updatedData,
            rate: rate.toFixed(2),
            total_amount: totalAmount.toFixed(2),
        };
    }

    setFormData(updatedData);
    saveData(updatedData);
};


  return (
    <form className="grid lg:grid-cols-2 gap-4">
      <InputField
        label="Principal Amount"
        type="number"
        name="amount"
        value={formData.amount || ""}
        onChange={handleChange}
      />
      <InputField
        label="Duration"
        type="number"
        name="number_of_months"
        value={formData.number_of_months || ""}
        onChange={handleChange}
      />
      <InputField
        label="Rate per month"
        readOnly={true}
        type="number"
        name="rate"
        value={formData.rate || ""}
        onChange={handleChange}
      />
      <InputField
        label="Total Amount"
        readOnly={true}
        type="number"
        name="total_amount"
        value={formData.total_amount || ""}
        onChange={handleChange}
      />
    </form>
  );
};

export default OfficeUse;
