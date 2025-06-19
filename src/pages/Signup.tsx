import {useState} from 'react';
import { Heading } from '../components/Heading';
import { Subheading } from '../components/Subheading';
import { InputBox } from '../components/InputBox';
import axios from 'axios';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [firstname, SetFirstName] = useState('');
    const [lastname, SetLastName] = useState('');
    const [isLoading, SetIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async () => {
        if (email === '' || password === '' || firstname === '' || lastname === '') {
            alert('please fill all the fields');
            return;
        }
        console.log(email,password,firstname,lastname)
        try {
            SetIsLoading(true);
            await axios.post('http://localhost:3000/api/v1/signup', {
                email,
                password,
                firstname,
                lastname
            });
            navigate('/signin')
        } catch (error) {
            console.log(error);
        } finally {
            SetIsLoading(false);
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
                            placeholder={'chandan'} 
                            label={'First Name'} 
                            onChange={(e) => {
                                SetFirstName(e.target.value);
                            }}
                        />
                        <InputBox 
                            placeholder={'C R'} 
                            label={'Last Name'} 
                            onChange={(e) => {
                                SetLastName(e.target.value);
                            }}
                        />
                    </div>

                    <InputBox 
                        placeholder={'cr@example.com'} 
                        label={'Email'} 
                        onChange={(e) => {
                            SetEmail(e.target.value);
                        }}
                    />

                    <InputBox 
                        placeholder={'••••••••'} 
                        label={'Password'} 
                        onChange={(e) => {
                            SetPassword(e.target.value);
                        }}
                    />

                    <div className="pt-4">
                        <Button label={isLoading ? 'Creating Account...' : 'Create Account'} onClick={handleSignup} />
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