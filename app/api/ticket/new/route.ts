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
        const submitterName = userJson.submitterName;
        const submitterPhone = userJson.submitterPhone;
        const submitterEmail = userJson.submitterEmail;
        const lat = userJson.latlong.lat;
        const long = userJson.latlong.long;
        const file = formData.get('image') as File;

        let ticketToSave = {
            submitterName: submitterName,
            submitterPhone: submitterPhone,
            submitterEmail: submitterEmail,
            photo: '',
            latlong: {
                coordinates: [lat, long]
            }
        };

        if (file) {
            const filename = Date.now() + '.' + file.name.split('.').pop();
            const ref = storageRef(`${filename}`);

            const buffer = Buffer.from(await file.arrayBuffer());
            await uploadBytes(ref, buffer);
            downloadUrl = await getDownloadURL(ref);
            ticketToSave['photo'] = downloadUrl;
        }

        // save the ticket
        await TicketModel.create(ticketToSave);

        return NextResponse.json({
            message: "Ticket created",
            ticket: ticketToSave
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Something went wrong"
        });
    }
}

export async function GET() {
    try {
        await connectToDB();

        const tickets = await TicketModel.find({}).populate('assignedInspector');

        return NextResponse.json(tickets);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Failed to get tickets" });
    }
}