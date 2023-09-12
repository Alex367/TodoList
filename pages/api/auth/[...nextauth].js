import { connectToDatabase } from "@/lib/db";
import { compare } from "bcryptjs";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials, req) {
        if (
          !credentials.email ||
          !credentials.email.includes("@") ||
          !credentials.password ||
          credentials.password.trim().length < 3
        ) {
          res.status(422).json({ message: "Invalid inputs" });
          return;
        }

        const user = {
          email: credentials.email,
          password: credentials.password,
        };

        if (user) {
          const client = await connectToDatabase();
          const collection = await client
            .db(process.env.DB_TITLE)
            .collection(process.env.DB_DATA_USER);

          const existedUser = await collection.findOne({
            email: credentials.email,
          });

          if (!existedUser) {
            client.close();
            throw new Error("No user found");
          }

          const isValid = await compare(
            credentials.password,
            existedUser.password
          );

          if (!isValid) {
            client.close();
            throw new Error("Could not log in");
          }
          client.close();
          return { email: user.email };
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60*60*3
  },
  secret: process.env.NEXTAUTH_SECRET,
});
