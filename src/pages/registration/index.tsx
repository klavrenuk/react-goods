import ContainerAuth from '@/components/containers/ContainerAuth';
import RegistrationForm from '@/components/registration/RegistrationForm';

import "@/app/globals.css";


const Registration = () => {
    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600'>
            <ContainerAuth>
                <RegistrationForm />
            </ContainerAuth>
        </div>
    )
}

export default Registration;