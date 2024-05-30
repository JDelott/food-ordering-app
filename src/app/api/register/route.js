// import { User } from "@/models/User";
// import mongoose from "mongoose";
// import bcrypt from "bcrypt";

// export async function POST(req) {
//   const body = await req.json();
//   mongoose.connect(process.env.MONGO_URL);
//   const pass = body.password;
//   if (!pass?.length || pass.length < 5) {
//     new Error("password must be at least 5 characters");
//   }

//   const notHashedPassword = pass;
//   const salt = bcrypt.genSaltSync(10);
//   body.password = bcrypt.hashSync(notHashedPassword, salt);

//   const createdUser = await User.create(body);
//   return Response.json(createdUser);
// }
import { User } from "@/models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    // Ensure database connection is awaited
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Validate password
    const pass = body.password;
    if (!pass?.length || pass.length < 5) {
      return NextResponse.json(
        { error: "Password must be at least 5 characters" },
        { status: 400 }
      );
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(pass, salt);

    // Create user
    const createdUser = await User.create(body);

    // Return created user
    return NextResponse.json(createdUser, { status: 201 });
  } catch (error) {
    // Handle errors
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
