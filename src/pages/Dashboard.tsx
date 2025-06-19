import { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import axios from 'axios';

export const Dashboard = () => {
    const [balance, setBalance] = useState<number>(0);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBalance();
        fetchUserDetails();
    }, []);

    const fetchBalance = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/api/v1/balance', {
                headers: {
                    Authorization: token
                }
            });
            setBalance(response.data.balance.balance);
        } catch (error) {
            console.error('Error fetching balance:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserDetails = () => {
        // Get user details from localStorage or decode token
        const userDetails = localStorage.getItem('userDetails');
        if (userDetails) {
            setUser(JSON.parse(userDetails));
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userDetails');
        window.location.href = '/signin';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h1 className="text-xl font-semibold text-gray-900">PayApp</h1>
                                <p className="text-sm text-gray-500">Digital Wallet</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Welcome back,</p>
                                <p className="font-medium text-gray-900">
                                    {user ? `${user.firstName} ${user.lastName}` : 'User'}
                                </p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Balance Card */}
                    <div className="md:col-span-2">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-100 text-sm font-medium">Total Balance</p>
                                    <div className="flex items-center mt-2">
                                        {loading ? (
                                            <div className="animate-pulse">
                                                <div className="h-8 bg-blue-300 rounded w-32"></div>
                                            </div>
                                        ) : (
                                            <h2 className="text-4xl font-bold">₹{balance.toLocaleString()}</h2>
                                        )}
                                    </div>
                                    <p className="text-blue-100 text-sm mt-2">Available for transactions</p>
                                </div>
                                <div className="bg-white bg-opacity-20 p-4 rounded-full">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-4">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <Button 
                                    label="Send Money"
                                    onClick={() => window.location.href = '/send'}
                                />
                                <Button 
                                    label="View Profile"
                                    onClick={() => window.location.href = '/profile'}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                         onClick={() => window.location.href = '/send'}>
                        <div className="flex items-center">
                            <div className="bg-green-100 p-3 rounded-full">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h4 className="text-lg font-semibold text-gray-900">Send Money</h4>
                                <p className="text-gray-500 text-sm">Transfer to friends instantly</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                         onClick={() => window.location.href = '/users'}>
                        <div className="flex items-center">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h4 className="text-lg font-semibold text-gray-900">Find Users</h4>
                                <p className="text-gray-500 text-sm">Search for people to pay</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                         onClick={() => window.location.href = '/profile'}>
                        <div className="flex items-center">
                            <div className="bg-purple-100 p-3 rounded-full">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h4 className="text-lg font-semibold text-gray-900">Profile</h4>
                                <p className="text-gray-500 text-sm">Manage your account</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="text-center py-8">
                        <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <p className="text-gray-500">No recent transactions</p>
                        <p className="text-gray-400 text-sm">Your recent activity will appear here when you start making transactions</p>
                    </div>
                </div>
            </div>
        </div>
    );
};