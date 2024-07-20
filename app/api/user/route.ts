// app/api/user/route.ts
import { connectToDB } from "@/lib/db";
import { UserModel } from "@/schemas/user";


export async function GET() {
    try {
        await connectToDB();
        
        const users = await UserModel.find({});
        
        return Response.json(users);
    } catch (error: any) {
        console.error("Failed to get users:", error);
        return Response.json({
            message: "Failed to get users",
            error: error.message,
        });
    }
}
