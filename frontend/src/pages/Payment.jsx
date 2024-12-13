// PaymentPage.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { Cart, Total } = location.state || { Cart: [], Total: 0 };

  const [paymentMethod, setPaymentMethod] = useState('');
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    address: '',
    phone: '',
  });

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  const handlePlaceOrder = async () => {
    if (!paymentMethod || !customerDetails.name || !customerDetails.address || !customerDetails.phone) {
      alert('Please fill in all fields and select a payment method!');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/api/user/place-order',
        { order: Cart, paymentMethod, customerDetails },
        { headers }
      );
      alert(response.data.message);
      navigate('/profile/orderHistory');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="bg-zinc-900 px-12 py-8 h-screen">
      <h1 className="text-5xl text-zinc-500 font-semibold mb-8">Payment Page</h1>
      <div className="bg-zinc-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-zinc-200 mb-4">Payment Method</h2>
        <div className="mb-4">
          <input
            type="radio"
            id="bkash"
            name="payment"
            value="Bkash"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="bkash" className="ml-2 text-zinc-200">Bkash</label>
        </div>
        <div className="mb-4">
          <input
            type="radio"
            id="cashOnDelivery"
            name="payment"
            value="Cash on Delivery"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="cashOnDelivery" className="ml-2 text-zinc-200">Cash on Delivery</label>
        </div>

        <h2 className="text-2xl font-semibold text-zinc-200 mb-4">Customer Details</h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full mb-4 p-2 rounded bg-zinc-700 text-zinc-200"
          value={customerDetails.name}
          onChange={(e) =>
            setCustomerDetails({ ...customerDetails, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Address"
          className="w-full mb-4 p-2 rounded bg-zinc-700 text-zinc-200"
          value={customerDetails.address}
          onChange={(e) =>
            setCustomerDetails({ ...customerDetails, address: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Phone Number"
          className="w-full mb-4 p-2 rounded bg-zinc-700 text-zinc-200"
          value={customerDetails.phone}
          onChange={(e) =>
            setCustomerDetails({ ...customerDetails, phone: e.target.value })
          }
        />

        <h2 className="text-2xl font-semibold text-zinc-200 mb-4">Order Summary</h2>
        <p className="text-zinc-300">Total Books: {Cart.length}</p>
        <p className="text-zinc-300">Total Amount: ${Total}</p>

        <button
          className="bg-green-500 text-white p-2 rounded mt-4 w-full"
          onClick={handlePlaceOrder}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
