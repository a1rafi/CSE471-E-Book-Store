import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const AdminDashboard = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const headers = {
                id: localStorage.getItem('id'),
                authorization: `Bearer ${localStorage.getItem('token')}`,
            };
            const response = await axios.get('http://localhost:3000/api/dashboard/admin-dashboard', { headers });
            setData(response.data);
        };
        fetchData();
    }, []);

    if (!data) {
        return <div className="flex justify-center items-center h-screen text-white bg-zinc-900">Loading...</div>;
    }

    const { userCount, orderCount, bookCount, complaintCount, recentOrders, recentComments, recentRatings } = data;

    const uniqueOrders = Array.from(
        recentOrders.reduce((map, order) => {
            map.set(order.book.title, (map.get(order.book.title) || 0) + order.book.price);
            return map;
        }, new Map())
    );

    return (
        <div className="admin-dashboard p-4 bg-zinc-900 min-h-screen text-gray-200">
            <h1 className="text-4xl font-bold text-center mb-6 text-white">Admin Dashboard</h1>

            {/* Stats Section */}
            <div className="stats grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="stat bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4 rounded-lg shadow-lg text-center hover:scale-105 transition-transform duration-300">
                    <h3 className="text-lg font-semibold">Users</h3>
                    <p className="text-2xl font-bold mt-2">{userCount}</p>
                </div>
                <div className="stat bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-lg shadow-lg text-center hover:scale-105 transition-transform duration-300">
                    <h3 className="text-lg font-semibold">Orders</h3>
                    <p className="text-2xl font-bold mt-2">{orderCount}</p>
                </div>
                <div className="stat bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-lg shadow-lg text-center hover:scale-105 transition-transform duration-300">
                    <h3 className="text-lg font-semibold">Books</h3>
                    <p className="text-2xl font-bold mt-2">{bookCount}</p>
                </div>
                <div className="stat bg-gradient-to-r from-red-500 to-purple-500 p-4 rounded-lg shadow-lg text-center hover:scale-105 transition-transform duration-300">
                    <h3 className="text-lg font-semibold">Complaints</h3>
                    <p className="text-2xl font-bold mt-2">{complaintCount}</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="charts grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="chart bg-zinc-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300" style={{ height: '400px' }}>
                    <h3 className="text-xl font-semibold text-white mb-4">Recent Orders</h3>
                    <Bar 
                        data={{
                            labels: uniqueOrders.map(([title]) => title),
                            datasets: [{
                                label: 'Price',
                                data: uniqueOrders.map(([, price]) => price),
                                backgroundColor: 'rgba(34, 197, 94, 0.8)',
                                borderColor: 'rgba(16, 185, 129, 1)',
                                borderWidth: 2
                            }],
                        }}
                        options={{ 
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    labels: {
                                        color: 'white',
                                    },
                                },
                            },
                            scales: {
                                x: {
                                    ticks: {
                                        color: 'white',
                                    },
                                },
                                y: {
                                    ticks: {
                                        color: 'white',
                                        callback: (value) => `$${value}`, // Display values as dollars
                                    },
                                },
                            },
                        }}
                    />
                </div>
                <div className="chart bg-zinc-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300" style={{ height: '400px' }}>
                    <h3 className="text-xl font-semibold text-white mb-4">Recent Comments</h3>
                    <Line 
                        data={{
                            labels: recentComments.map(comment => comment.title),
                            datasets: [{
                                label: 'Comments',
                                data: recentComments.map(comment => comment.comments.length),
                                borderColor: 'rgba(59, 130, 246, 1)',
                                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                                borderWidth: 2
                            }],
                        }}
                        options={{ 
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    labels: {
                                        color: 'white',
                                    },
                                },
                            },
                            scales: {
                                x: {
                                    ticks: {
                                        color: 'white',
                                    },
                                },
                                y: {
                                    ticks: {
                                        color: 'white',
                                    },
                                },
                            },
                        }}
                    />
                </div>
                <div className="chart bg-zinc-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 lg:col-span-2" style={{ height: '400px' }}>
                    <h3 className="text-xl font-semibold text-white mb-4">Recent Ratings</h3>
                    <Pie 
                        data={{
                            labels: recentRatings.map(rating => rating.title),
                            datasets: [{
                                label: 'Ratings',
                                data: recentRatings.map(rating => rating.ratings.length),
                                backgroundColor: [
                                    'rgba(239, 68, 68, 0.8)',
                                    'rgba(59, 130, 246, 0.8)',
                                    'rgba(250, 204, 21, 0.8)',
                                    'rgba(16, 185, 129, 0.8)',
                                    'rgba(167, 139, 250, 0.8)',
                                ],
                                borderColor: [
                                    'rgba(220, 38, 38, 1)',
                                    'rgba(37, 99, 235, 1)',
                                    'rgba(202, 138, 4, 1)',
                                    'rgba(5, 150, 105, 1)',
                                    'rgba(139, 92, 246, 1)',
                                ],
                                borderWidth: 2
                            }],
                        }}
                        options={{ 
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    labels: {
                                        color: 'white',
                                    },
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
