// app/api/ticket/bulk/route.ts
import { connectToDB } from "@/lib/db";
import { storageRef } from "@/lib/firebase";
import { TicketModel } from "@/schemas/ticket";
import { Ticket } from "@/types";
import { deleteObject } from "firebase/storage";
import { ObjectId } from "mongodb";
import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
    try {
        await connectToDB();

        const body = await req.json();
        const { tickets, status } = body;

        await TicketModel.updateMany(
            { _id: tickets.map((t: ObjectId) => t) },
            { status: status }
        );

        return NextResponse.json("Tickets updated");

    } catch (error) {
        console.log(error);
        return NextResponse.json("Failed to update tickets", { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const body = await req.json();
        const { tickets } = body;
        const ticketsToDelete = await TicketModel.find<Ticket>({
            _id: tickets.map((t: ObjectId) => t)
        });

        await TicketModel.deleteMany({
            _id: tickets.map((t: ObjectId) => t)
        });

        // TODO: also delete the firebase image
        if (ticketsToDelete.length > 0) {
            for (const ticket of ticketsToDelete) {
                if (ticket.photo) {
                    const ref = storageRef(ticket.photo)
                    await deleteObject(ref)
                }
            }
        }
        
        return NextResponse.json("Tickets deleted");
    } catch (error) {
        console.log(error);
        return NextResponse.json("Failed to delete tickets", { status: 500 });
    }
}