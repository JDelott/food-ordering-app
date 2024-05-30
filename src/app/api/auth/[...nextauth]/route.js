import clientPromise from "@/libs/mongoConnect";
import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import { User } from "@/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        await mongoose.connect(process.env.MONGO_URL);
        const user = await User.findOne({ email });
        const passwordOk = user && bcrypt.compareSync(password, user.password);

        if (passwordOk) {
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        const { email } = user;

        if (!email) {
          throw new Error("Google user email is missing");
        }

        // Ensure the email is saved
        await mongoose.connect(process.env.MONGO_URL);
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
          const newUser = new User({
            name: user.name,
            email: user.email,
            image: user.image,
          });
          await newUser.save();
        }
      }

      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// // src/app/api/auth/[...nextauth]/route.js
// import clientPromise from "@/libs/mongoConnect";
// import bcrypt from "bcrypt";
// import * as mongoose from "mongoose";
// import { User } from "@/models/User";
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";

// const authOptions = {
//   secret: process.env.SECRET,
//   adapter: MongoDBAdapter(clientPromise),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       id: "credentials",
//       credentials: {
//         username: {
//           label: "Email",
//           type: "email",
//           placeholder: "test@example.com",
//         },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         const email = credentials?.email;
//         const password = credentials?.password;

//         await mongoose.connect(process.env.MONGO_URL);
//         const user = await User.findOne({ email });
//         const passwordOk = user && bcrypt.compareSync(password, user.password);

//         if (passwordOk) {
//           return user;
//         }

//         return null;
//       },
//     }),
//   ],
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

// / import * as mongoose from "mongoose";
// import { User } from "@/models/User";
// import bcrypt from "bcrypt";
// import NextAuth from "next-auth";
// import { getServerSession } from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import clientPromise from "@/libs/mongoConnect";

// export const authOptions = {
//   secret: process.env.SECRET,
//   adapter: MongoDBAdapter(clientPromise),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       id: "credentials",
//       credentials: {
//         username: {
//           label: "Email",
//           type: "email",
//           placeholder: "test@example.com",
//         },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         const email = credentials?.email;
//         const password = credentials?.password;

//         mongoose.connect(process.env.MONGO_URL);
//         const user = await User.findOne({ email });
//         const passwordOk = user && bcrypt.compareSync(password, user.password);

//         console.log({ password });

//         if (passwordOk) {
//           return user;
//         }

//         return null;
//       },
//     }),
//   ],
// };

// export async function isAdmin() {
//   const session = await getServerSession(authOptions);
//   const userEmail = session?.user?.email;
//   if (!userEmail) {
//     return false;
//   }
//   const userInfo = await UserInfo.findOne({ email: userEmail });
//   if (!userInfo) {
//     return false;
//   }
//   return userInfo.admin;
// }

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

// import clientPromise from "@/libs/mongoConnect";
// import { UserInfo } from "@/models/UserInfo";
// import bcrypt from "bcrypt";
// import * as mongoose from "mongoose";
// import { User } from "@/models/User";
// import NextAuth, { getServerSession } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";

// export const authOptions = {
//   secret: process.env.SECRET,
//   adapter: MongoDBAdapter(clientPromise),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       id: "credentials",
//       credentials: {
//         username: {
//           label: "Email",
//           type: "email",
//           placeholder: "test@example.com",
//         },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         const email = credentials?.email;
//         const password = credentials?.password;

//         mongoose.connect(process.env.MONGO_URL);
//         const user = await User.findOne({ email });
//         const passwordOk = user && bcrypt.compareSync(password, user.password);

//         if (passwordOk) {
//           return user;
//         }

//         return null;
//       },
//     }),
//   ],
// };

// export async function isAdmin() {
//   const session = await getServerSession(authOptions);
//   const userEmail = session?.user?.email;
//   if (!userEmail) {
//     return false;
//   }
//   const userInfo = await UserInfo.findOne({ email: userEmail });
//   if (!userInfo) {
//     return false;
//   }
//   return userInfo.admin;
// }

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
