import { useState } from 'react';
import { Heading } from '../components/Heading';
import { Subheading } from '../components/Subheading';
import { InputBox } from '../components/InputBox';
import axios from 'axios';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

export const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignin = async () => {
        if (email === '' || password === '') {
            alert('Please fill all the fields');
            return;
        }
        
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/api/v1/login', {
                email,
                password
            });
            const token = response.data.token;
            localStorage.setItem('token',token);
            navigate('/')
        } catch (error) {
            console.log('Signin error:', error);
            alert('Invalid credentials. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-purple-50 to-blue-100 min-h-screen flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        <Heading label={'Welcome Back'} />
                    </div>
                    <Subheading label={'Sign in to your account to continue'} />
                </div>

                <div className="space-y-6">
                    <InputBox 
                        placeholder={'john@example.com'} 
                        label={'Email'} 
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />

                    <InputBox 
                        placeholder={'••••••••'} 
                        label={'Password'} 
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center">
                            <input 
                                type="checkbox" 
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <span className="ml-2 text-gray-600">Remember me</span>
                        </label>
                        <a href="#" className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
                            Forgot password?
                        </a>
                    </div>

                    <div className="pt-4">
                        <Button 
                            label={isLoading ? 'Signing in...' : 'Sign In'} 
                            onClick={handleSignin} 
                        />
                    </div>

                    <div className="text-center pt-4">
                        <p className="text-gray-600 text-sm">
                            Don't have an account?{' '}
                            <a href="/signup" className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
                                Create one
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
