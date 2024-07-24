"use client"
import { SDKProvider } from '@telegram-apps/sdk-react';

export default function Template({ children }: { children: React.ReactNode }) {
    console.log("Template")
    return <SDKProvider acceptCustomStyles debug>
        <div>{children}</div>
    </SDKProvider>
}