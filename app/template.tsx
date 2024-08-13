"use client"

import { useEffect } from 'react';
import { useUserDataStore } from '@/stores/userData';
import { useLaunchParamsStore } from '@/stores/launchParams';
import { SDKProvider } from '@telegram-apps/sdk-react';

export default function Template({ children }: { children: React.ReactNode }) {
    const { userData } = useUserDataStore();
    const { setLoaded } = useLaunchParamsStore();

    useEffect(() => {
        if (userData) {
            setTimeout(() => {
                const loader = document.getElementById("clicker-loader");
                if (loader) {
                    loader.remove();
                    setLoaded(true);
                }
            }, 1000);
        }
    }, [userData]);

    return <SDKProvider acceptCustomStyles debug>
        <div>{children}</div>
    </SDKProvider>
}