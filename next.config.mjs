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
        {
            protocol: 'https',
            hostname: 'ui-avatars.com'
        
           
        },
        {
            protocol: 'https',
            hostname: "scontent.fktm10-1.fna.fbcdn.net"
        
           
        },
        
        ],
    },
        
        
        
};

export default nextConfig;