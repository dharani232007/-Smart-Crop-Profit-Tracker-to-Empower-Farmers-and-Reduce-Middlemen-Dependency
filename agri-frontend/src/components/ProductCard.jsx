function ProductCard({ crop }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <img 
        src={crop.image} 
        alt={crop.name}
        className="h-40 w-full object-cover rounded"
      />
      <h3 className="font-bold mt-3">{crop.name}</h3>
      <p>Quantity: {crop.quantity}</p>
      <p>Price: ₹{crop.price}</p>
    </div>
  );
}

export default ProductCard;
