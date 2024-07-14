// app/api/user/route.ts
import { connectToDB } from "@/lib/db";
import { UserModel } from "@/schemas/user";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDB();

        const users = await UserModel.find({});

        return NextResponse.json(users);
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Failed to get users"
        });
    }
}