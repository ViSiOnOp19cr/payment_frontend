import { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
}

export const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:3000/api/v1/bulk?filter=${searchTerm}`, {
                headers: {
                    Authorization: token
                }
            });
            setUsers(response.data.user);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        setLoading(true);
        fetchUsers();
    };

    const handleSendMoney = (user: User) => {
        // Store selected user and redirect to send money page
        localStorage.setItem('selectedUser', JSON.stringify(user));
        window.location.href = '/send';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
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
                            <h1 className="text-xl font-semibold text-gray-900">Find Users</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <div className="bg-indigo-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                            <svg className="w-8 h-8 text-indigo-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Users</h2>
                        <p className="text-gray-600">Search for people to send money to</p>
                    </div>

                    {/* Search Bar */}
                    <div className="flex space-x-4 mb-8">
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 px-4 py-2 border rounded-lg border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        <button
                            onClick={handleSearch}
                            disabled={loading}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Searching...' : 'Search'}
                        </button>
                    </div>

                    {/* Users List */}
                    {loading ? (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                            <p className="text-gray-600 mt-4">Loading users...</p>
                        </div>
                    ) : users.length > 0 ? (
                        <div className="space-y-4">
                            <h3 className="font-medium text-gray-900 mb-4">
                                {searchTerm ? `Search results for "${searchTerm}"` : 'All Users'}
                            </h3>
                            <div className="grid gap-4">
                                {users.map((user) => (
                                    <div
                                        key={user.id}
                                        className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center">
                                            <div className="bg-indigo-100 p-3 rounded-full">
                                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <div className="ml-4">
                                                <p className="font-medium text-gray-900">
                                                    {user.firstname} {user.lastname}
                                                </p>
                                                <p className="text-sm text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleSendMoney(user)}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                        >
                                            Send Money
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <p className="text-gray-500">No users found</p>
                            <p className="text-gray-400 text-sm">Try searching with different terms</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}; 