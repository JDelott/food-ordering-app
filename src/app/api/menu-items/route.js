// // import { isAdmin } from "@/app/api/auth/[...nextauth]/route";
// import { isAdmin } from "@/utils/auth";
// import { MenuItem } from "@/models/MenuItem";
// import mongoose from "mongoose";

// export async function POST(req) {
//   mongoose.connect(process.env.MONGO_URL);
//   const data = await req.json();
//   if (await isAdmin()) {
//     const menuItemDoc = await MenuItem.create(data);
//     return Response.json(menuItemDoc);
//   } else {
//     return Response.json({});
//   }
// }

// export async function PUT(req) {
//   mongoose.connect(process.env.MONGO_URL);
//   if (await isAdmin()) {
//     const { _id, ...data } = await req.json();
//     await MenuItem.findByIdAndUpdate(_id, data);
//   }
//   return Response.json(true);
// }

// export async function GET() {
//   mongoose.connect(process.env.MONGO_URL);
//   return Response.json(await MenuItem.find());
// }

// export async function DELETE(req) {
//   mongoose.connect(process.env.MONGO_URL);
//   const url = new URL(req.url);
//   const _id = url.searchParams.get("_id");
//   if (await isAdmin()) {
//     await MenuItem.deleteOne({ _id });
//   }
//   return Response.json(true);
// }

import { isAdmin } from "@/utils/auth";
import { MenuItem } from "@/models/MenuItem";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URL);
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    if (await isAdmin()) {
      const menuItemDoc = await MenuItem.create(data);
      return NextResponse.json(menuItemDoc);
    } else {
      return NextResponse.json({}, { status: 403 });
    }
  } catch (error) {
    console.error("Error in POST /api/menu-items:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    await connectToDatabase();
    if (await isAdmin()) {
      const { _id, ...data } = await req.json();
      await MenuItem.findByIdAndUpdate(_id, data);
      return NextResponse.json(true);
    } else {
      return NextResponse.json({}, { status: 403 });
    }
  } catch (error) {
    console.error("Error in PUT /api/menu-items:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const menuItems = await MenuItem.find();
    return NextResponse.json(menuItems);
  } catch (error) {
    console.error("Error in GET /api/menu-items:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    await connectToDatabase();
    const url = new URL(req.url);
    const _id = url.searchParams.get("_id");
    if (await isAdmin()) {
      await MenuItem.deleteOne({ _id });
      return NextResponse.json(true);
    } else {
      return NextResponse.json({}, { status: 403 });
    }
  } catch (error) {
    console.error("Error in DELETE /api/menu-items:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
