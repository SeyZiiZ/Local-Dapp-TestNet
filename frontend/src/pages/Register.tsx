import { useState } from 'react';
import RegisterForm from '../components/auths/RegisterForm';
import LoginHeader from '../components/auths/Header';
import LoginLayout from '../components/auths/Layout';
import MiniFooter from '../components/MiniFooter';
import { RegisterFormData } from '../types/auth';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../api/auth';

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [generalError, setGeneralError] = useState<string | null>(null);
    const [generalSucces, setGeneralSucces] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleRegister = async (formData: RegisterFormData) => {
        setIsLoading(true);
        setGeneralError(null);

        try {
            const result = await AuthService.register(
                formData.email,
                formData.password,
                formData.passwordVerification
            );

            console.log(result);

            if (!result?.success) {
                setGeneralError("Registration failed. Please check your details.");
                return;
            }

            setGeneralSucces("Registration successfully completed, you will be redirected ...");
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            
        } catch (error) {
            setGeneralError('Register failed. Please check your credentials and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <LoginLayout>
            <LoginHeader />

            <div className="relative w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <h2 className="font-heading text-3xl text-teal-900 font-semibold mb-2">Welcome Booooy !</h2>
                        <p className="text-gray-600">Register now to use our premium wallet !</p>
                    </div>

                    {generalError && (
                        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                            <p>{generalError}</p>
                        </div>
                    )}

                    {generalSucces && (
                        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
                            <p>{generalSucces}</p>
                        </div>
                    )}

                    <RegisterForm
                        onSubmit={handleRegister}
                        isLoading={isLoading}
                    />

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account ?{' '}
                            <Link className="font-medium text-teal-600 hover:text-teal-800" to={"/login"}>
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <MiniFooter />
        </LoginLayout>
    );
}