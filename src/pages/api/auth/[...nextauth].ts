import { uniqueId } from "lodash";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authAPI } from "src/apis/auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const res = await authAPI.login(
            credentials?.username as string,
            credentials?.password as string
          );

          return {
            id: uniqueId("user-"),
            // ...res.data,
            username: res.data.username,
            token: res.data.access_token,
          };
        } catch (e) {
          console.log(e);
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt(data) {
      console.log("CALLBACK: ", data);

      return data;
    },
    async session(data) {
      console.log("SESSION: ", data);
      data.session.user = data.token as any;

      return data.session;
    },
  },
};

export default NextAuth(authOptions);
