"use client"

import { useEffect } from 'react';
import { useUserDataStore } from '@/stores/userData';
import { SDKProvider } from '@telegram-apps/sdk-react';

export default function Template({ children }: { children: React.ReactNode }) {
    const { userData } = useUserDataStore();

    useEffect(() => {
        if (userData) {
            document.getElementById("grift-loader")?.remove();
        }
    }, [userData]);

    return <SDKProvider acceptCustomStyles debug>
        <div>{children}</div>
    </SDKProvider>
}