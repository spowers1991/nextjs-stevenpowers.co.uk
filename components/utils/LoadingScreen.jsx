import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';

const LoadingScreen = ({ children }) => { 

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Function to handle route change start and complete
        const handleRouteChangeStart = () => setLoading(true);
        const handleRouteChangeComplete = () => setLoading(false);

        // Attach the handlers to the router events
        router?.events?.on('routeChangeStart', handleRouteChangeStart);
        router?.events?.on('routeChangeComplete', handleRouteChangeComplete);

        // Cleanup function to remove the event listeners when the component unmounts
        return () => {
            router?.events?.off('routeChangeStart', handleRouteChangeStart);
            router?.events?.off('routeChangeComplete', handleRouteChangeComplete);
        };
    }, [router?.events]); // Add router.events as a dependency

    return (
        <div className={`duration-[.1s] ease ${loading ? 'opacity-0' : 'opacity-100'}`}>
            {children}     
        </div>
    );
};

export default LoadingScreen;
