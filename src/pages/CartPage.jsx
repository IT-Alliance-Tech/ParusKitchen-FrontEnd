import React from "react";

const CartPage = () => {
  // TODO: Connect API to fetch user cart items
  const cartItems = [
    { id: 1, name: "Paneer Butter Masala", price: 250, quantity: 1 },
    { id: 2, name: "Dal Makhani", price: 200, quantity: 2 },
  ];

  return (
    <div className="min-h-screen bg-primary-50 p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-poppins font-bold text-primary-800 mb-6">
          Your Cart
        </h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-600 font-lato">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-4 border rounded-xl"
              >
                <div>
                  <h3 className="font-poppins font-semibold text-primary-800">
                    {item.name}
                  </h3>
                  <p className="font-lato text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-poppins font-semibold text-primary-800">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
            <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl font-poppins font-semibold transition-all duration-200">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
