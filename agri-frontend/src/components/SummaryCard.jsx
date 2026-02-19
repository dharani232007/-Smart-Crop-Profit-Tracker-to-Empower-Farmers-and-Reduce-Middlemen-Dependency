function SummaryCard({ title, amount }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-green-700 mt-2">{amount}</p>
    </div>
  );
}

export default SummaryCard;
