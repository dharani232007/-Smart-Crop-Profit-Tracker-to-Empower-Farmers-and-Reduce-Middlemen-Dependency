function Orders() {
  const orders = [
    { id: 1, buyer: "Ravi", crop: "Tomato", quantity: 10 },
    { id: 2, buyer: "Meena", crop: "Potato", quantity: 20 }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-6">
      <h2 className="text-lg font-semibold mb-4 text-green-700">
        Customer Orders
      </h2>

      <table className="w-full">
        <thead>
          <tr className="text-left border-b">
            <th>Buyer</th>
            <th>Crop</th>
            <th>Quantity</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="border-b">
              <td>{order.buyer}</td>
              <td>{order.crop}</td>
              <td>{order.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
