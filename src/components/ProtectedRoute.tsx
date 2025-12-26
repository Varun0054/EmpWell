import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated, loading, openAuthModal } = useAuth();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            openAuthModal();
        }
    }, [loading, isAuthenticated, openAuthModal]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!isAuthenticated) {
        // Return null or a placeholder while the modal opens
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] bg-gray-50">
                <div className="text-center p-8">
                    <h2 className="text-2xl font-bold text-gray-700 mb-2">Access Restricted</h2>
                    <p className="text-gray-500">Please login to access this feature.</p>
                    <button
                        onClick={openAuthModal}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Login / Signup
                    </button>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;
