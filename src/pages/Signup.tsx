import { useState } from 'react';
import { Heading } from '../components/Heading';
import { Subheading } from '../components/Subheading';
import { InputBox } from '../components/InputBox';
import axios from 'axios';
import { Button } from '../components/Button';

export const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (email === '' || password === '' || firstName === '' || lastName === '') {
            alert('Please fill all the fields');
            return;
        }

        setLoading(true);
        try {
            await axios.post('http://localhost:3000/api/v1/signup', {
                email,
                password,
                firstname: firstName,
                lastname: lastName
            });
            
            alert('Account created successfully! Please sign in.');
            window.location.href = '/signin';
        } catch (error: any) {
            console.log(error);
            alert(error.response?.data?.message || 'Failed to create account');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        <Heading label={'Create Account'} />
                    </div>
                    <Subheading label={'Enter your information to create an account'} />
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <InputBox 
                            placeholder={'John'} 
                            label={'First Name'} 
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                        />
                        <InputBox 
                            placeholder={'Doe'} 
                            label={'Last Name'} 
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
                        />
                    </div>

                    <InputBox 
                        placeholder={'john@example.com'} 
                        label={'Email'} 
                        type={'email'}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />

                    <InputBox 
                        placeholder={'••••••••'} 
                        label={'Password'} 
                        type={'password'}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />

                    <div className="pt-4">
                        <Button 
                            label={loading ? 'Creating Account...' : 'Create Account'} 
                            onClick={handleSignup} 
                        />
                    </div>

                    <div className="text-center pt-4">
                        <p className="text-gray-600 text-sm">
                            Already have an account?{' '}
                            <a href="/signin" className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};