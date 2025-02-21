import React from 'react';

import ContainerAuth from '@/components/containers/ContainerAuth';
import LoginForm from '@/components/login/LoginForm';

const Login = () => {
    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600'>
            <ContainerAuth>
                <LoginForm />
            </ContainerAuth>
        </div>
    )
}

export default Login;