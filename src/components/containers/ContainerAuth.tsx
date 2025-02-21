import React, {ReactNode} from 'react';


interface ContainerAuthProps {
    children: ReactNode; // ReactNode — это тип для children (любое React-содержимое)
  }

  const ContainerAuth: React.FC<ContainerAuthProps> = ({ children }) => {
    return (
        <div className='px-4 py-8 min-w-[450px]'>
            { children }
        </div>
    )
}

export default ContainerAuth;