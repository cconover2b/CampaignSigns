// app/api/ticket/route.ts
import { connectToDB } from "@/lib/db";
import { TicketModel } from "@/schemas/ticket";
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectToDB();

        const tickets = await TicketModel.find({}).populate('assignedInspector');

        return NextResponse.json(tickets);
    } catch(error) {
        console.error("Error fetching tickets:", error);
        return NextResponse.json({ message: "Failed to get tickets" }, { status: 500 });
    }
}