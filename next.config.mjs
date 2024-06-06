/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'as2.ftcdn.net',
        },
        {
            protocol: 'https',
            hostname: 'img.freepik.com',
        
           
        },
        {
            protocol: 'https',
            hostname: '/images.unsplash.com/',
        
            
        },
        {
            protocol: 'https',
            hostname: 'images.unsplash.com',
        
           
        },
        ],
    },
        
        
        
};

export default nextConfig;