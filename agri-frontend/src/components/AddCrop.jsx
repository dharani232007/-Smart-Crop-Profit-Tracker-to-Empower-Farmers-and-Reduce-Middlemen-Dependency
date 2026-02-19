import { useState } from "react";

function AddCrop() {
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    price: "",
    image: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Crop Added Successfully");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-6">
      <h2 className="text-lg font-semibold mb-4 text-green-700">
        Add New Crop
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Crop Name"
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({...form, name: e.target.value})}
        />

        <input
          type="number"
          placeholder="Quantity"
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({...form, quantity: e.target.value})}
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({...form, price: e.target.value})}
        />

        <input
          type="file"
          className="w-full"
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Add Crop
        </button>
      </form>
    </div>
  );
}

export default AddCrop;
