import React, { useState } from "react";
import InputField from "../components/InputField";

const OfficeUse = ({ saveData, initialData }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };

    if (name === "amount") {
      const amount = parseFloat(value) || 0;
      const rate = amount * 0.1; // 10% of the amount
      const totalAmount = amount + rate; // Sum of amount and rate
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
        label="Amount"
        type="number"
        name="amount"
        value={formData.amount || ""}
        onChange={handleChange}
      />
      <InputField
        label="Rate"
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
      <InputField
        label="Number of Days"
        type="number"
        name="number_of_days"
        value={formData.number_of_days || ""}
        onChange={handleChange}
      />
    </form>
  );
};

export default OfficeUse;
