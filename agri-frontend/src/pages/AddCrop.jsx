import { useState } from "react";

function AddCrop() {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
    date: "",
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("quantity", formData.quantity);
    data.append("price", formData.price);
    data.append("date", formData.date);
    data.append("image", formData.image);

    await fetch("http://127.0.0.1:8000/add-crop", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    alert("Crop Posted Successfully!");
  };

  return (
    <div className="form-section">
      <h2>Add New Crop</h2>

      <form onSubmit={handleSubmit} className="crop-form">
        <input type="text" name="name" placeholder="Crop Name" onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Quantity (kg)" onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price per kg" onChange={handleChange} required />
        <input type="date" name="date" onChange={handleChange} required />
        <input type="file" name="image" accept="image/*" onChange={handleChange} required />

        <button type="submit">Post Crop</button>
      </form>
    </div>
  );
}

export default AddCrop;
