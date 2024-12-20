import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ViewComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = useSelector(state => state.auth.role);
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchComplaints = async () => {
      try {
        const userId = localStorage.getItem('id');
        const token = localStorage.getItem('token');
        const headers = {
          id: userId,
          authorization: `Bearer ${token}`,
        };

        const response = await axios.get('http://localhost:3000/api/user/complaints', { headers });
        setComplaints(response.data.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [role, navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-zinc-900 h-screen p-8">
      <h1 className="text-4xl font-semibold text-zinc-100 mb-6">View Complaints</h1>
      <div className="bg-zinc-800 p-8 rounded-lg">
        {complaints.length === 0 ? (
          <p className="text-zinc-100">No complaints found.</p>
        ) : (
          <ul>
            {complaints.map((complaint) => (
              <li key={complaint._id} className="mb-4">
                <p className="text-zinc-100"><strong>User:</strong> {complaint.userId.username} ({complaint.userId.email})</p>
                <p className="text-zinc-100"><strong>Type:</strong> {complaint.complaintType}</p>
                <p className="text-zinc-100"><strong>Description:</strong> {complaint.complaintText}</p>
                <p className="text-zinc-100"><strong>Date:</strong> {new Date(complaint.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ViewComplaints;