import { useEffect, useState } from 'react';
import LoginForm from '../components/auths/LoginForm';
import LoginHeader from '../components/auths/Header';
import LoginLayout from '../components/auths/Layout';
import MiniFooter from '../components/MiniFooter';
import { LoginFormData } from '../types/auth';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../api/auth';
import { useUserStore } from '../stores/userStore';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [generalSucces, setGeneralSucces] = useState<string | null>(null);
  const navigate = useNavigate();
  const { fetchUser } = useUserStore();

  const handleLogin = async (formData: LoginFormData) => {
    setIsLoading(true);
    setGeneralError(null);

    try {
      const result = await AuthService.login(
        formData.email,
        formData.password,
      );

      console.log(result);

      if (!result?.success) {
        setGeneralError("Login failed. Please check your details.");
        return;
      }
      await fetchUser();

      setGeneralSucces("Login successfully completed, you will be redirected ...");

      const { isAdmin, isWhitelisted } = result.user;

      setTimeout(() => {
        if (isAdmin) {
          navigate('/adminDashboard');
        } else if (isWhitelisted) {
          navigate('/home');
        } else {
          navigate('/whitelist');
        }
      }, 2000);

    } catch (error) {
      setGeneralError('Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  /*
  useEffect(() => {
    if (userStore.isConnected && userStore.user?.isAdmin) {
      navigate('/adminDashboard')
    } else if (userStore.isConnected && userStore.user?.isWhitelisted && !userStore.user?.isAdmin) {
      navigate('/home')
    } else if (userStore.isConnected && !userStore.user?.isWhitelisted) {
      navigate('whitelist')
    } else {
      return
    }
  }, [userStore.isConnected, userStore.user]);
  */

  return (
    <LoginLayout>
      <LoginHeader />

      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl text-teal-900 font-semibold mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your account to continue</p>
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

          <LoginForm
            onSubmit={handleLogin}
            isLoading={isLoading}
          />

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account ?{' '}
              <Link className="font-medium text-teal-600 hover:text-teal-800" to={"/register"}>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <MiniFooter />
    </LoginLayout>
  );
}