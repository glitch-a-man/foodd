import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    pages: {
        signIn: '/login',
    },
    // Required for production
    secret: process.env.NEXTAUTH_SECRET,
    // Use JWT strategy which works better across different origins
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === 'google') {
                try {
                    await fetch(`${process.env.BACKEND_URL || 'http://localhost:5000'}/api/users/sync`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: user.name,
                            email: user.email,
                            image: user.image,
                            googleId: user.id,
                        }),
                    });
                } catch (error) {
                    console.error('Error syncing user to backend:', error);
                }
            }
            return true;
        },
        async session({ session, token }) {
            if (session.user && token.sub) {
                // @ts-ignore
                session.user.id = token.sub;
            }
            return session;
        },
    },
    // Helpful for debugging deployment issues
    debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
