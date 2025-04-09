import { ReactNode } from 'react';

interface LoginLayoutProps {
  children: ReactNode;
}

export default function LoginLayout ({ children }: LoginLayoutProps) {
  return (
    <section className="relative bg-teal-900 min-h-screen flex flex-col items-center justify-center py-12 px-4">
      <img 
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20" 
        src="src/assets/fauna-assets/headers/bg-waves.png" 
        alt=""
      />
      {children}
    </section>
  );
};