
import { useState } from 'react';
import { AuthForm } from '@/components/AuthForm';

const Auth = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <AuthForm 
        mode={mode} 
        onToggleMode={() => setMode(mode === 'signin' ? 'signup' : 'signin')} 
      />
    </div>
  );
};

export default Auth;
