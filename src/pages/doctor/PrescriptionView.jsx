
import React, { useState } from 'react';
import axios from 'axios';

const FieldSet = ({ fields, onRemove }) => {
    const handleDataChange = (index, e) => {
        const updatedFields = fields.map((field, i) => {
          if (i === index) {
            return { ...field, value: e.target.value };
          }
          return field;
        });
        onRemove(updatedFields);
      };
      
  
    return (
      <>
        {fields.map((field, index) => (
          <input
            key={index}
            type="text"
            value={field.value}
            onChange={(e) => handleDataChange(index, e)}
            className="w-48 p-2 border rounded mr-4"
            placeholder={field.label}
          />
        ))}
        <button
          onClick={() => onRemove(fields)}
          className="ml-2 px-4 py-2 text-red-500 bg-transparent border border-red-500 rounded hover:bg-red-500 hover:text-white"
        >
          -
        </button>
      </>
    );
  };
  
const PrescriptionViews = () => {
  const [rows, setRows] = useState([]);

  const handleAddFieldSet = () => {
    const newRow = [
      { label: 'Medicine', value: '' },
      { label: 'Days', value: '' },
      { label: 'Dosage', value: '' },
    ];
    setRows([...rows, newRow]);
  };

  const handleRemoveFieldSet = (updatedFields) => {
    const updatedRows = rows.map((row) =>
      row.map((field) => {
        const updatedField = updatedFields.find((f) => f.label === field.label);
        return updatedField || field;
      })
    );
    setRows(updatedRows);
  };
  
  const handleSavePrescription = async () => {
    try {
      const prescriptionData = rows.map((fields) => {
        const prescription = {};
        fields.forEach((field) => {
          prescription[field.label.toLowerCase()] = field.value;
        });
        return prescription;
      });
      
      await axios.post(`/api/doctor/prescription`, prescriptionData);
      console.log('Prescription saved successfully!');
    } catch (error) {
      console.error('Error saving prescription:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dynamic Field Sets</h1>
      {rows.map((fields, index) => (
        <div key={index} className="flex items-center mb-4">
          <FieldSet fields={fields} onRemove={handleRemoveFieldSet} />
        </div>
      ))}
      <button
        onClick={handleAddFieldSet}
        className="px-4 py-2 text-green-500 bg-transparent border border-green-500 rounded hover:bg-green-500 hover:text-white"
      >
        +
      </button>
      <button
        onClick={handleSavePrescription}
        className="mt-4 px-4 py-2 text-blue-500 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white"
      >
        Save Prescription
      </button>
    </div>
  );
};

export default PrescriptionViews;
