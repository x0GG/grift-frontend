import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./config/i18n.ts")

/** @type {import('next').NextConfig} */
const nextConfig = process.env.NODE_ENV === 'development' ? {
    output: 'export',
    basePath: '',
    reactStrictMode: false
} : {
    output: 'export',
    basePath: '/grift-frontend',
    reactStrictMode: false
}

export default withNextIntl(nextConfig)