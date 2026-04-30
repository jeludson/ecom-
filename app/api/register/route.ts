import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 1. Check if prisma is connected
    try {
      console.log("MONGODB_URL at runtime:", process.env.MONGODB_URL?.substring(0, 20) + "...");
      await prisma.$connect();
    } catch (connErr: any) {
      console.error("Database connection failed during registration:", connErr.message);
      return NextResponse.json(
        { error: "Database connection failed. Please check your MongoDB Atlas IP whitelist and credentials.", details: connErr.message },
        { status: 500 }
      );
    }

    const { email, password, name, role } = await req.json();

    console.log("Registering user:", email, "Role:", role);

    if (!email || !password || !name || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
      },
    });

    return NextResponse.json(
      { message: "User created successfully", userId: user.id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error details:", {
      message: error.message,
      code: error.code,
      meta: error.meta,
    });
    
    // Provide more specific error message if possible
    let errorMessage = "Failed to register user";
    if (error.code === "P2002") {
      errorMessage = "Email already exists (database constraint)";
    } else if (error.message.includes("Can't reach database")) {
      errorMessage = "Cannot connect to MongoDB. Please check your DATABASE_URL and ensure MongoDB is running.";
    }

    return NextResponse.json(
      { error: errorMessage, details: error.message },
      { status: 500 }
    );
  }
}
