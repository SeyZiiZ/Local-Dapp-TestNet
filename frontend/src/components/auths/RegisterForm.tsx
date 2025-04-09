import React, { useState, FormEvent } from 'react';
import { RegisterFormData } from '../../types/auth';
import FormInput from './FormInput';
import PasswordInput from './PasswordInput';
import LoadingButton from '../ui/LoadingButton';

interface RegisterFormProps {
    onSubmit: (formData: RegisterFormData) => void;
    isLoading: boolean;
}

export default function RegisterForm({ onSubmit, isLoading }: RegisterFormProps) {
    const [formData, setFormData] = useState<RegisterFormData>({
        email: '',
        password: '',
        passwordVerification: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        } else if (formData.password !== formData.passwordVerification) {
            newErrors.password = 'Passwords must be the same';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormInput
                id="email"
                name="email"
                type="email"
                label="Email Address"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="you@example.com"
                icon={
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                }
            />

            <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
            </div>
            <p className='text-gray-700'><small>Minimum 6 characters, 1 uppercase, 1 lowercase 1 special character</small></p>
            <PasswordInput
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="••••••••"
                icon={
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                }
            />

            <div className="mb-2 flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Verify Password
                </label>
            </div>
            <PasswordInput
                id="passwordVerification"
                name="passwordVerification"
                value={formData.passwordVerification}
                onChange={handleChange}
                error={errors.password}
                placeholder="••••••••"
                icon={
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                }
            />
            {formData.passwordVerification.length >= 1 && formData.password !== formData.passwordVerification && (
                <span className="block text-sm font-medium text-red-600">
                    Different passwords
                </span>
            )}

            <LoadingButton
                type="submit"
                isLoading={isLoading}
                className="w-full py-3 px-4 text-lg font-medium text-teal-900 bg-lime-500 hover:bg-lime-600 border border-lime-500 rounded-full transition duration-200"
            >
                Sign In
            </LoadingButton>
        </form>
    );
};