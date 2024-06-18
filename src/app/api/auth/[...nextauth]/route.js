import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";

export const authOptions = {
    adapter: FirestoreAdapter({
        credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
    }),
    providers: [
        CredentialsProvider({
            name: 'Custom Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Enter Email" },
                password: { label: "Password", type: "password" },
                fullName: { label: "Full Name", type: "text" },
                citizenship: { label: "Citizenship Number", type: "text" },
                mobileNumber: { label: "Mobile Number", type: "text" },
                latitude: { label: "Latitude", type: "text" },
                longitude: { label: "Longitude", type: "text" },
                role: { label: "Role", type: "text" },
            },
            async authorize(credentials, req) {
                if (!credentials || !credentials.email || !credentials.password) {
                    throw new Error('Email or password is invalid');
                }

                const formData = {
                    email: credentials.email,
                    password: credentials.password,
                    fullName: credentials.fullName,
                    citizenship: credentials.citizenship,
                    mobileNumber: credentials.mobileNumber,
                    latitude: credentials.latitude,
                    longitude: credentials.longitude,
                    role: credentials.role,
                };
                const payload = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                };

                const res = await fetch('http://localhost:3000/api/auth/login', payload);
                const resJson = await res.json();
                const user = resJson.data;

                if (user?.email === credentials?.email) {
                    return user;
                } else {
                    throw new Error('Invalid Credentials');
                }
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 24 * 365, // 1 year
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            console.log("signIn", { user, account, profile, email, credentials });
            return true;
        },
        async redirect({ url, baseUrl }) {
            console.log("redirect", { url, baseUrl });
            return baseUrl;
        },
        async session({ session, token }) {
            console.log("Session callback triggered");
            if (token?.user) {
                session.user = token.user;
                session.email = token.user.email;
                session.accessToken = token.accessToken; // Ensure access token is set
                session.role = token.user.role; // Ensure role is set if available
            }
            console.log("Session data:", session);
            return session;
        },
        async jwt({ token, user, account }) {
            if (user) {
                token.user = user;
                token.accessToken = account?.access_token;
                if (user.role) {
                    token.role = user.role;
                }
            }
            console.log("JWT token data:", token);
            return token;
        }
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
