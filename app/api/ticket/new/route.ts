// app/api/ticket/new/route.ts
import { connectToDB } from "@/lib/db";
import { storageRef } from "@/lib/firebase";
import { TicketModel } from "@/schemas/ticket";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectToDB();

        const formData: FormData = await request.formData();

        const userInfo = formData.get('userinfo') as string;
        const userJson = JSON.parse(userInfo);
        let downloadUrl = '';
        const { submitterName, submitterPhone, submitterEmail, latlong } = userJson;
        const file = formData.get('image') as File;

        let ticketToSave = {
            submitterName,
            submitterPhone,
            submitterEmail,
            photo: '',
            latlong: {
                coordinates: [latlong.lat, latlong.long]
            }
        };

        if (file) {
            const filename = `${Date.now()}.${file.name.split('.').pop()}`;
            const ref = storageRef(`${filename}`);

            const buffer = Buffer.from(await file.arrayBuffer());
            await uploadBytes(ref, buffer);
            downloadUrl = await getDownloadURL(ref);
            ticketToSave.photo = downloadUrl;
        }

        // save the ticket
        const savedTicket = await TicketModel.create(ticketToSave);

        return NextResponse.json({
            message: "Ticket created",
            ticket: savedTicket
        }, { status: 201 });
    } catch (error) {
        console.error("Error creating ticket:", error);
        return NextResponse.json({
            message: "Something went wrong"
        }, { status: 500 });
    }
}