import React, { useState } from 'react';
import axios from 'axios';

const ComplainPage = () => {
  const [complaintType, setComplaintType] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setError('');
    setSuccessMessage('');

    // Validate inputs
    if (!complaintType || !description) {
      setError('Please fill in all the fields.');
      return;
    }

    if (description.length > 500) {
      setError('Description must be within 500 characters.');
      return;
    }

    try {
      const userId = localStorage.getItem('id');
      const token = localStorage.getItem('token');

      const headers = {
        authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        'http://localhost:3000/api/user/complain',
        {
          userId,
          type: complaintType,
          description,
        },
        { headers }
      );

      setSuccessMessage(response.data.message);
      setComplaintType('');
      setDescription('');
    } catch (error) {
      console.error('Error submitting complaint:', error);
      setError('Failed to submit the complaint. Please try again later.');
    }
  };

  return (
    <div className="bg-zinc-900 h-screen flex items-center justify-center">
      <div className="bg-zinc-800 p-8 rounded-lg w-[90%] md:w-[50%]">
        <h1 className="text-4xl font-semibold text-zinc-100 mb-6">Submit a Complaint</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

        <form onSubmit={handleSubmit}>
          <label className="block text-zinc-100 font-semibold mb-2">
            Complaint Type:
          </label>
          <select
            className="w-full p-3 rounded bg-zinc-700 text-zinc-100 mb-4"
            value={complaintType}
            onChange={(e) => setComplaintType(e.target.value)}
          >
            <option value="">-- Select --</option>
            <option value="Recommendation of Book">Recommendation of Book</option>
            <option value="Book Quality Issue">Book Quality Issue</option>
            <option value="Service Issue">Service Issue</option>
            <option value="Others">Others</option>
          </select>

          <label className="block text-zinc-100 font-semibold mb-2">
            Description (max 500 characters):
          </label>
          <textarea
            className="w-full p-3 rounded bg-zinc-700 text-zinc-100 mb-4 h-40"
            placeholder="Briefly explain your issue..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
          ></textarea>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-semibold w-full"
          >
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComplainPage;