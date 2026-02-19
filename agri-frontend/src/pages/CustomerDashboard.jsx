import { useEffect, useState } from "react";


import API from "../api/api";


export default function CustomerDashboard() {
  const [crops, setCrops] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const res = await API.get("/crops");
        setCrops(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCrops();
  }, []);

  const filtered = crops.filter((crop) =>
    crop.name.toLowerCase().includes(search.toLowerCase())
  );

 return (
  <div className="page-container min-h-screen bg-gray-50 px-10 py-10">


    {/* Header */}
    <Header />

    <div className="pt-24 px-8">

      <h1 className="text-4xl font-bold text-green-900 mb-8">
        🌾 Customer Dashboard
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search crops..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md p-3 rounded-lg border mb-8"
      />

      {/* Crop Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filtered.map((crop) => (
          <div
            key={crop._id}
            className="glass-card hover:scale-105 transition duration-300"
          >
            <h2 className="text-xl font-bold mb-2">{crop.name}</h2>
            <p>Quantity: {crop.quantity}</p>
            <p>Price: ₹{crop.selling_price}</p>

            <button className="mt-4">
              Contact Farmer
            </button>

            <button className="mt-3">
              Pay Now
            </button>
          </div>
        ))}
      </div>

    </div>
  </div>
);
}