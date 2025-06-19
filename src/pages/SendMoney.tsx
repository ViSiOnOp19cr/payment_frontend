import { useState } from 'react';
import { InputBox } from '../components/InputBox';
import { Button } from '../components/Button';
import axios from 'axios';

interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
}

export const SendMoney = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [searching, setSearching] = useState(false);

    const searchUsers = async () => {
        if (!searchTerm.trim()) return;
        
        setSearching(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:3000/api/v1/bulk?filter=${searchTerm}`, {
                headers: {
                    Authorization: token
                }
            });
            setUsers(response.data.user);
        } catch (error) {
            console.error('Error searching users:', error);
            alert('Error searching users');
        } finally {
            setSearching(false);
        }
    };

    const handleTransfer = async () => {
        if (!selectedUser || !amount || parseFloat(amount) <= 0) {
            alert('Please select a user and enter a valid amount');
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3000/api/v1/transaction', {
                to: selectedUser.id,
                amount: parseFloat(amount)
            }, {
                headers: {
                    Authorization: token
                }
            });
            
            alert('Transfer successful!');
            setSelectedUser(null);
            setAmount('');
            setSearchTerm('');
            setUsers([]);
        } catch (error: any) {
            console.error('Transfer error:', error);
            alert(error.response?.data?.message || 'Transfer failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-4">
                        <div className="flex items-center">
                            <button
                                onClick={() => window.location.href = '/dashboard'}
                                className="text-gray-400 hover:text-gray-600 mr-4"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <h1 className="text-xl font-semibold text-gray-900">Send Money</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {!selectedUser ? (
                    /* User Search Section */
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="text-center mb-8">
                            <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Recipient</h2>
                            <p className="text-gray-600">Search for users to send money to</p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <InputBox
                                        placeholder="Search by name..."
                                        label="Search Users"
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-end">
                                    <button
                                        onClick={searchUsers}
                                        disabled={searching}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50"
                                    >
                                        {searching ? 'Searching...' : 'Search'}
                                    </button>
                                </div>
                            </div>

                            {users.length > 0 && (
                                <div className="space-y-3">
                                    <h3 className="font-medium text-gray-900">Search Results:</h3>
                                    <div className="max-h-64 overflow-y-auto space-y-2">
                                        {users.map((user) => (
                                            <div
                                                key={user.id}
                                                onClick={() => setSelectedUser(user)}
                                                className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                                            >
                                                <div className="flex items-center">
                                                    <div className="bg-blue-100 p-2 rounded-full">
                                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="font-medium text-gray-900">
                                                            {user.firstname} {user.lastname}
                                                        </p>
                                                        <p className="text-sm text-gray-500">{user.email}</p>
                                                    </div>
                                                </div>
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    /* Transfer Section */
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="text-center mb-8">
                            <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Money</h2>
                            <p className="text-gray-600">Enter the amount to transfer</p>
                        </div>

                        {/* Selected User Info */}
                        <div className="bg-gray-50 rounded-xl p-4 mb-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="bg-blue-100 p-2 rounded-full">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="font-medium text-gray-900">
                                            {selectedUser.firstname} {selectedUser.lastname}
                                        </p>
                                        <p className="text-sm text-gray-500">{selectedUser.email}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedUser(null)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <InputBox
                                placeholder="0.00"
                                label="Amount (₹)"
                                type="number"
                                onChange={(e) => setAmount(e.target.value)}
                            />

                            <div className="flex space-x-4">
                                <button
                                    onClick={() => setSelectedUser(null)}
                                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-xl font-medium transition-colors"
                                >
                                    Back
                                </button>
                                <div className="flex-1">
                                    <Button
                                        label={loading ? 'Processing...' : 'Send Money'}
                                        onClick={handleTransfer}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}; 