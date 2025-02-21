import { useEffect } from 'react';
import { useRouter } from 'next/router';


import "@/app/globals.css";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    console.log('tocken', token);

    if (!token) {
      router.push('/login');
    } else {
      router.push('/products');
    }
  }, [router]);

  return <div></div>
}


export default Home;