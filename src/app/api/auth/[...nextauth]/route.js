
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
// import { FirestoreAdapter } from "@auth/firebase-adapter"
// import { cert } from "firebase-admin/app";

export const authOptions = {
    // adapter: FirestoreAdapter({
    //     credential: cert({
    //         projectId: process.env.FIREBASE_PROJECT_ID,
    //         clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    //         privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    //     }),
    // }), 
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: 'Acer Account',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Enter Email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials || !credentials?.email || !credentials?.password)
                    throw new Error('Email or password is invalid');
                //const user = users.find((u) => u.email === credentials?.email);
                const formData = {
                    email: credentials.email,
                    password: credentials.password
                }
                const payload = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)

                }
                const res = await fetch('http://localhost:3000/api/auth/login', payload);
                const resJson = await res.json();
                const user = resJson.data;
                if (user?.email === credentials?.email) {
                    return user
                }
                else {
                    throw new Error('Invalis Credientials')
                }
            }
        })
    ],
    pages: {
        signIn: '/login',

    },
    Secret: process.env.NextAuth_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 24 * 365,//1 year
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            console.log("signIn", { user, account, profile, email, credentials })

            return true
        },
        async redirect({ url, baseUrl }) {
            console.log("redirect", { url, baseUrl })

            return baseUrl
        },
        async session({ session, user, token }) {
            const newSession = session;
            if (token?.user) {
                session.user = token?.user;
                newSession.user = token.user;
                newSession.accessToken = token.accessToken;

            }

            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            const newToken = token;

            if (user) {
                token.user = user;
                newToken.accessToken = account?.access_token;
            }
            return token
        }
    }
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
