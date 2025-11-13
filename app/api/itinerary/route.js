//import { connect } from "mongoose";
import { connectDB } from "@/lib/db";
export async function GET() {
  try {
    await connectDB();
    return Response.json({ message: "✅ Database connected successfully!" });
  } catch (error) {
    return Response.json(
      { message: "❌ Database connection failed", error: error.message },
      { status: 500 }
    );
  }
}
